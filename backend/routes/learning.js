/**
 * Learning Routes - Sara Learning Platform
 * Single-topic architecture with enhanced features
 */

import express from 'express'
import { authenticateToken } from './auth.js'
import {
  getProgress,
  upsertProgress,
  getAllProgress,
  getUnlockedCourseIds,
  isCourseUnlockedForUser,
  unlockCourseForUser,
  getUserById,
  clearChatSessionForCourse
} from '../services/database.js'
import { generateCertificatePDF, CERTIFICATE_TOPICS } from '../services/certificate.js'
import { saveInitialMessage, getChatHistoryString } from '../services/chatService.js'
import { invalidateChatHistoryCache } from '../services/chatCache.js'
import { courses } from '../data/curriculum.js'
import { DEFAULT_COURSE_ID } from '../config/defaultCourse.js'
import { formatLearningObjectives, findTopicById, getAllTopics, getNextTopicId, getTopicIdsForCourse } from '../utils/curriculum.js'
import { expandLinearProgressToTopicRows, resolveCanonicalCurrentTopicId } from '../utils/linearProgress.js'
import { getTopicOrRespond } from '../utils/topicHelper.js'
import { slimCoursesForList, slimTopicNavRef } from '../utils/courseListSerializer.js'
import { getFirstOutcomeMessage } from '../utils/outcomeMessages.js'
import { handleErrorResponse, createSuccessResponse, createErrorResponse } from '../utils/responses.js'
import { rateLimitMiddleware } from '../middleware/rateLimiting.js'

const router = express.Router()

function lastAccessedPayload(rawRow) {
  if (!rawRow) return null
  const course = courses.find((c) => String(c.id) === String(rawRow.course_id))
  const topicId = resolveCanonicalCurrentTopicId(rawRow, course) ?? rawRow.topic_id
  return {
    topicId,
    phase: rawRow.phase || 'session',
    status: rawRow.status || 'not_started'
  }
}

// ============ VALIDATION SCHEMAS ============
const schemas = {
  sessionStart: {
    required: ['topicId'],
    optional: ['assignments']
  },
  playtimeStart: {
    required: ['topicId'],
    optional: []
  },
  assignmentStart: {
    required: ['topicId'],
    optional: []
  },
  playtimeComplete: {
    required: ['topicId'],
    optional: []
  },
  assignmentComplete: {
    required: ['topicId', 'assignmentIndex'],
    optional: []
  }
}

function validateBody(schema) {
  return (req, res, next) => {
    const { required = [], optional = [] } = schema
    const allowedFields = [...required, ...optional]

    // Check required fields
    for (const field of required) {
      if (!req.body[field]) {
        return res.status(400).json(createErrorResponse(`${field} is required`))
      }
    }

    // Remove unexpected fields
    const cleanBody = {}
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        cleanBody[field] = req.body[field]
      }
    }
    req.body = cleanBody

    next()
  }
}

// ============ UTILITY FUNCTIONS ============

// Lazy-load executor so app startup (and auth/login) never depends on it; avoids CJS bundle export issues
let codeExecutorPromise = null
async function getCodeExecutor() {
  if (!codeExecutorPromise) {
    codeExecutorPromise = (async () => {
      const m = await import('../services/SecureCodeExecutor.js')
      const Clazz = m.default ?? m
      return new (typeof Clazz === 'function' ? Clazz : Clazz.default)()
    })()
  }
  return codeExecutorPromise
}

// Industry-level secure code execution function
async function executeCodeSecurely(code, testCases = [], functionName = null, solutionType = 'script') {
  try {
    // Validate inputs
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid code provided');
    }

    if (!Array.isArray(testCases)) {
      throw new Error('Test cases must be an array');
    }

    const codeExecutor = await getCodeExecutor()
    const result = await codeExecutor.execute(code, testCases, functionName, solutionType);

    return {
      success: result.success,
      output: result.results?.map(r => r.output || r.result).join('\n') || '',
      testResults: result.results || [],
      allTestsPassed: result.allPassed || false,
      executionTime: result.executionTime,
      error: result.error
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      output: '',
      testResults: [],
      allTestsPassed: false,
      executionTime: 0
    };
  }
}

// Require course to be unlocked for user (used for topic access)
async function requireCourseUnlocked(req, res, next) {
  const topicId = req.params.topicId || req.body?.topicId
  if (!topicId) { return next() }
  const topic = findTopicById(courses, topicId)
  if (!topic) { return next() }
  const courseId = topic.courseId
  const userId = req.user?.userId
  if (!userId) { return next() }
  const unlocked = await isCourseUnlockedForUser(userId, courseId)
  if (!unlocked) {
    return res.status(403).json(createErrorResponse('This course is locked. Unlock it to continue.', 'COURSE_LOCKED', { courseId }))
  }
  next()
}

// ============ COURSE UNLOCK (payment flow) ============

router.get('/unlocked-courses', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const courseIds = await getUnlockedCourseIds(userId)
    res.json(createSuccessResponse({ courseIds }))
  } catch (error) {
    handleErrorResponse(res, error, 'get unlocked courses')
  }
})

router.post('/unlock-course', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const { courseId } = req.body || {}
    if (!courseId || typeof courseId !== 'string') {
      return res.status(400).json(createErrorResponse('courseId is required'))
    }
    // In production: verify payment (Stripe/Razorpay webhook or server-side confirmation) before unlocking
    await unlockCourseForUser(userId, courseId.trim())
    res.json(createSuccessResponse({ message: 'Course unlocked', courseId: courseId.trim() }))
  } catch (error) {
    handleErrorResponse(res, error, 'unlock course')
  }
})

// ============ LEARNING STATE MANAGEMENT ============

router.get('/state/:topicId', authenticateToken, requireCourseUnlocked, async (req, res) => {
  try {
    const { topicId } = req.params
    const userId = req.user.userId

    // Validate topic exists
    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    const courseId = topic.courseId
    // Get progress and chat history in parallel
    const [progress, chatHistory] = await Promise.all([
      getProgress(userId, topicId, courseId),
      getChatHistoryString(userId, topicId, courseId)
    ])

    if (!progress) {
      return res.json({
        success: true,
        exists: false,
        topic: {
          id: topicId,
          title: topic.title,
          description: topic.description,
          category: topic.category,
          difficulty: topic.difficulty,
          estimatedTime: topic.estimatedTime
        }
      })
    }

    // Normalize phase
    const normalizedPhase = progress.phase || 'session'

    const responseData = {
      success: true,
      exists: true,
      phase: normalizedPhase,
      currentAssignment: Math.max(0, (progress.current_task || 1) - 1),
      totalAssignments: progress.total_tasks || 0,
      status: progress.status,
      conversationHistory: chatHistory || '',
      assignments: [],
      topic: {
        id: topicId,
        title: topic.title,
        description: topic.description,
        category: topic.category,
        difficulty: topic.difficulty,
        estimatedTime: topic.estimatedTime
      }
    }

    res.json(responseData)
  } catch (error) {
    handleErrorResponse(res, error, 'get session state')
  }
})

// ============ SESSION PHASE ============

router.post('/session/start', authenticateToken, rateLimitMiddleware, validateBody(schemas.sessionStart), requireCourseUnlocked, async (req, res) => {
  try {
    const { topicId, assignments } = req.body
    const userId = req.user.userId

    // Validate topic exists
    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    // Handle empty assignments (reserved for future use)
    const _taskList = assignments && assignments.length > 0
      ? assignments
      : ['Practice the concept with a simple example']

    const courseId = topic.courseId
    // Initialize topic progress - direct database call for compatibility
    await upsertProgress(userId, topicId, {
      phase: 'session',
      status: 'in_progress',
      current_outcome_index: 0,
      updated_at: new Date().toISOString()
    }, courseId)

    const outcomes = topic ? formatLearningObjectives(topic.outcomes) : 'Learn programming concepts'
    const firstMessage = getFirstOutcomeMessage(topic)

    if (!firstMessage) {
      return res.status(400).json(
        createErrorResponse(
          'This topic has no first outcome message. Add outcome_messages[0] in the curriculum (same length as outcomes).',
          'MISSING_OUTCOME_MESSAGES'
        )
      )
    }

    const result = await saveInitialMessage(userId, topicId, firstMessage, 'session', courseId)

    const directResponse = result.wasCreated ? firstMessage :
      result.conversationHistory?.match(/AGENT: (.+?)(?=\nUSER:|$)/s)?.[1]?.trim() || 'Session ready'

    // Get updated progress after saving
    const progress = await getProgress(userId, topicId, courseId)

    res.json({
      success: true,
      message: directResponse,
      phase: 'session',
      conceptRevealed: false,
      outcomes: outcomes || [],
      progress,
      topic: {
        id: topicId,
        title: topic.title,
        description: topic.description,
        category: topic.category
      }
    })
  } catch (error) {
    handleErrorResponse(res, error, 'start session')
  }
})

// ============ PLAYTIME PHASE ============

// Play phase: user tries out code from session — no AI, just progress update
router.post('/playtime/start', authenticateToken, rateLimitMiddleware, validateBody(schemas.playtimeStart), requireCourseUnlocked, async (req, res) => {
  try {
    const { topicId } = req.body
    const userId = req.user.userId


    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    const courseId = topic.courseId
    await upsertProgress(userId, topicId, {
      phase: 'playtime',
      status: 'in_progress',
      updated_at: new Date().toISOString()
    }, courseId)

    res.json(createSuccessResponse({
      message: 'Practice what you learned in the session. Try out the concepts in the editor and run your code.',
      phase: 'playtime',
      topic: {
        id: topicId,
        title: topic.title,
        category: topic.category
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'start playtime')
  }
})

// ============ PLAYTIME COMPLETION ============

// Test endpoint to verify routing
router.get('/playtime/test', (req, res) => {
  res.json({ success: true, message: 'Playtime routes are working', timestamp: new Date().toISOString() })
})

router.post('/playtime/complete', authenticateToken, rateLimitMiddleware, validateBody(schemas.playtimeComplete), requireCourseUnlocked, async (req, res) => {
  try {
    const { topicId } = req.body
    const userId = req.user.userId


    // Validate topic exists
    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    const courseId = topic.courseId

    // Complete playtime phase - direct database update for compatibility
    try {

      await upsertProgress(userId, topicId, {
        phase: 'assignment',
        status: 'in_progress',
        updated_at: new Date().toISOString()
      }, courseId)

    } catch (dbError) {
      throw new Error(`Failed to complete playtime: ${dbError.message}`)
    }

    res.json(createSuccessResponse({
      message: 'Playtime completed successfully',
      phase: 'playtime',
      nextPhase: 'assignment',
      topic: {
        id: topicId,
        title: topic.title,
        category: topic.category
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'complete playtime')
  }
})

// ============ ASSIGNMENT PHASE ============

router.post('/assignment/start', authenticateToken, rateLimitMiddleware, validateBody(schemas.assignmentStart), requireCourseUnlocked, async (req, res) => {
  try {
    const { topicId } = req.body
    const userId = req.user.userId


    // Validate topic exists
    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    // Get topic tasks
    const tasks = topic.tasks || []
    if (tasks.length === 0) {
      return res.status(400).json(createErrorResponse('No assignments available for this topic'))
    }

    const courseId = topic.courseId
    // Start assignment phase - direct database call for compatibility
    await upsertProgress(userId, topicId, {
      phase: 'assignment',
      status: 'in_progress',
      current_task: 1,
      total_tasks: tasks.length,
      updated_at: new Date().toISOString()
    }, courseId)

    // Get first assignment
    const firstTask = tasks[0]

    res.json(createSuccessResponse({
      assignment: {
        description: firstTask.description,
        testCases: firstTask.testCases,
        currentTask: 0,
        totalTasks: tasks.length
      },
      phase: 'assignment',
      topic: {
        id: topicId,
        title: topic.title,
        category: topic.category
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'start assignment')
  }
})

router.post('/assignment/complete', authenticateToken, rateLimitMiddleware, requireCourseUnlocked, async (req, res) => {
  try {
    const { topicId, assignmentIndex: rawIndex, code } = req.body
    const userId = req.user.userId
    const assignmentIndex = Number(rawIndex)
    if (rawIndex !== undefined && (Number.isNaN(assignmentIndex) || assignmentIndex < 0)) {
      return res.status(400).json(createErrorResponse('assignmentIndex must be a non-negative number'))
    }

    if (!topicId || rawIndex === undefined) {
      return res.status(400).json(createErrorResponse('topicId and assignmentIndex are required'))
    }

    if (!code || !code.trim()) {
      return res.status(400).json(createErrorResponse('Code is required to complete assignment'))
    }


    // Validate topic exists
    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    const courseId = topic.courseId
    const tasks = topic.tasks || []
    if (assignmentIndex >= tasks.length) {
      return res.status(400).json(createErrorResponse('Invalid assignment index'))
    }

    const currentTask = tasks[assignmentIndex]
    if (!currentTask) {
      return res.status(400).json(createErrorResponse('Assignment not found for this topic'))
    }
    const testCases = currentTask.testCases || []
    const solutionType = currentTask.solution_type || 'script'
    const functionName = currentTask.function_name ?? null

    // Execute code and validate against test cases with proper parameters
    const executionResult = await executeCodeSecurely(code, testCases, functionName, solutionType)

    // Check if all tests passed (only if there are test cases)
    if (testCases.length > 0 && !executionResult.allTestsPassed) {
      return res.status(400).json(createErrorResponse('Assignment not completed: Some tests are failing', {
        execution: executionResult,
        requiresAllTestsPassed: true,
        failedTests: executionResult.testResults?.filter(t => !t.passed) || []
      }))
    }

    // Complete assignment - tests passed or no tests required. Only advance when user completes the next task in sequence (no reward for skipping).
    const currentProgress = await getProgress(userId, topicId, courseId)
    const currentCount = currentProgress?.assignments_completed ?? currentProgress?.completed_assignments ?? 0
    const isNextInSequence = assignmentIndex === currentCount
    const completedAssignments = isNextInSequence ? currentCount + 1 : currentCount
    const isTopicComplete = completedAssignments >= tasks.length
    const now = new Date().toISOString()

    // current_task = 1-based "next task to do" = assignments_completed + 1 (so Continue opens the right assignment)
    const nextTaskOneBased = Math.min(completedAssignments + 1, tasks.length)
    const progressPayload = {
      phase: 'assignment',
      status: isTopicComplete ? 'completed' : 'in_progress',
      current_task: nextTaskOneBased,
      total_tasks: tasks.length,
      assignments_completed: completedAssignments,
      updated_at: now
    }

    if (!isTopicComplete) {
      try {
        await upsertProgress(userId, topicId, progressPayload, courseId)
      } catch (progressErr) {
        const msg = progressErr?.message || ''
        if (msg.includes('column') && msg.includes('does not exist')) {
          const minimalPayload = {
            phase: 'assignment',
            status: isTopicComplete ? 'completed' : 'in_progress',
            current_task: nextTaskOneBased,
            total_tasks: tasks.length,
            assignments_completed: completedAssignments,
            updated_at: now
          }
          try {
            await upsertProgress(userId, topicId, minimalPayload, courseId)
          } catch (minimalErr) {
            const m2 = minimalErr?.message || ''
            if (m2.includes('assignments_completed')) {
              const alt = { ...minimalPayload }
              delete alt.assignments_completed
              alt.completed_assignments = completedAssignments
              await upsertProgress(userId, topicId, alt, courseId)
            } else {
              throw minimalErr
            }
          }
        } else {
          throw progressErr
        }
      }
    } else {
      const doneCount = (Number(currentProgress?.completed_topics_count) || 0) + 1
      const nextTopicId = getNextTopicId(courses, courseId, topicId)

      try {
        if (nextTopicId) {
          const nextTopic = findTopicById(courses, nextTopicId)
          const tt = (nextTopic?.tasks || []).length
          await upsertProgress(userId, nextTopicId, {
            topic_id: nextTopicId,
            phase: 'session',
            status: 'in_progress',
            current_task: tt > 0 ? 1 : 0,
            total_tasks: tt,
            assignments_completed: 0,
            completed_topics_count: doneCount,
            current_outcome_index: 0,
            updated_at: now
          }, courseId)
        } else {
          await upsertProgress(userId, topicId, {
            phase: 'assignment',
            status: 'completed',
            current_task: tasks.length,
            total_tasks: tasks.length,
            assignments_completed: completedAssignments,
            completed_topics_count: doneCount,
            updated_at: now
          }, courseId)
        }
      } catch (advanceErr) {
        console.warn('Advance after topic complete failed:', advanceErr?.message)
        throw advanceErr
      }

      try {
        await clearChatSessionForCourse(userId, courseId)
        await invalidateChatHistoryCache(userId, topicId, courseId)
      } catch (clearErr) {
        console.warn('Could not clear chat session for completed topic:', clearErr?.message)
      }
    }

    const totalAssignments = tasks.length

    res.json(createSuccessResponse({
      message: isTopicComplete ? 'All assignments completed! Topic mastered!' : 'Assignment completed successfully',
      assignmentCompleted: true,
      topicCompleted: isTopicComplete,
      completedAssignments,
      totalAssignments,
      nextAssignment: isTopicComplete ? null : assignmentIndex + 1,
      phase: 'assignment',
      execution: executionResult,
      topic: {
        id: topicId,
        title: topic.title,
        category: topic.category
      }
    }))
  } catch (error) {
    if (!res.headersSent) {
      const message = error?.message || 'Complete assignment failed'
      res.status(500).json(createErrorResponse(message, 'SERVER_ERROR', process.env.NODE_ENV === 'development' ? error?.stack : null))
    }
  }
})

// ============ CODE EXECUTION ============

// Playground execution (no topic required) - for dashboard and standalone editor
router.post('/execute-playground', authenticateToken, async (req, res) => {
  try {
    const { code } = req.body
    if (!code || typeof code !== 'string') {
      return res.status(400).json(createErrorResponse('Code is required'))
    }
    const result = await executeCodeSecurely(code, [], null, 'script')
    return res.json(createSuccessResponse({ execution: result }))
  } catch (error) {
    return res.status(500).json(createErrorResponse('Code execution failed'))
  }
})

router.post('/execute', authenticateToken, async (req, res) => {
  try {
    const { code, topicId, assignmentIndex } = req.body

    if (!code || !topicId) {
      return res.status(400).json(createErrorResponse('Code and topicId are required'))
    }

    // Get topic and assignment details
    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    let testCases = []
    if (assignmentIndex !== undefined && topic.tasks && topic.tasks[assignmentIndex]) {
      testCases = topic.tasks[assignmentIndex].testCases || []
    }

    // Get task details for proper execution
    const task = assignmentIndex !== undefined && topic.tasks ? topic.tasks[assignmentIndex] : null;
    const solutionType = task?.solution_type || 'script';
    const functionName = task?.function_name || null;

    // Execute code securely with proper parameters
    const result = await executeCodeSecurely(code, testCases, functionName, solutionType)

    res.json(createSuccessResponse({
      execution: result,
      topic: {
        id: topicId,
        title: topic.title
      },
      assignment: assignmentIndex !== undefined ? {
        index: assignmentIndex,
        total: topic.tasks?.length || 0,
        solutionType,
        functionName
      } : null
    }))

  } catch (error) {
    res.status(500).json(createErrorResponse('Code execution failed'))
  }
})

// New secure execution endpoint with enhanced validation
router.post('/execute-secure', authenticateToken, async (req, res) => {
  try {
    const { code, testCases, functionName, solutionType } = req.body;

    // Validate required parameters
    if (!code) {
      return res.status(400).json(createErrorResponse('Code is required'));
    }

    if (!testCases || !Array.isArray(testCases)) {
      return res.status(400).json(createErrorResponse('Valid test cases are required'));
    }

    if (solutionType === 'function' && !functionName) {
      return res.status(400).json(createErrorResponse('Function name is required for function-type tasks'));
    }

    // Execute with enhanced security
    const result = await executeCodeSecurely(code, testCases, functionName, solutionType);

    // Additional validation for function tasks
    if (solutionType === 'function' && result.success) {
      const hasValidResults = result.testResults.every(test =>
        Object.prototype.hasOwnProperty.call(test, 'result') || Object.prototype.hasOwnProperty.call(test, 'error')
      );

      if (!hasValidResults) {
        return res.status(400).json(createErrorResponse('Function execution did not return valid results'));
      }
    }

    res.json(createSuccessResponse({
      execution: result,
      validation: {
        secure: true,
        executionTime: result.executionTime,
        solutionType,
        functionName
      }
    }));

  } catch (error) {
    res.status(500).json(createErrorResponse('Secure code execution failed'));
  }
})

// ============ PROGRESS MANAGEMENT ============

router.get('/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    // Get progress data directly for compatibility
    let allProgress = await getAllProgress(userId)

    // New user: ensure first-topic progress row exists (fallback if /continue wasn't called first)
    if (allProgress.length === 0) {
      const firstTopic = getAllTopics(courses)[0]
      if (firstTopic) {
        const totalTasks = (firstTopic.tasks || []).length
        await upsertProgress(userId, firstTopic.id, {
          phase: 'session',
          status: 'in_progress',
          current_task: totalTasks > 0 ? 1 : 0,
          total_tasks: totalTasks,
          assignments_completed: 0,
          completed_topics_count: 0,
          current_outcome_index: 0,
          updated_at: new Date().toISOString()
        }, firstTopic.courseId)
        allProgress = await getAllProgress(userId)
      }
    }

    const progressForClient = expandLinearProgressToTopicRows(courses, allProgress)
    const allTopicsFromCurriculum = getAllTopics(courses)
    const totalTopics = allTopicsFromCurriculum.length
    const completedTopics = progressForClient.filter((p) => p.status === 'completed').length
    const inProgressTopics = progressForClient.filter((p) => p.status === 'in_progress').length

    const summary = {
      total_topics: totalTopics,
      completed_topics: completedTopics,
      in_progress_topics: inProgressTopics,
      completion_percentage: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
      certificate_eligible: completedTopics >= CERTIFICATE_TOPICS
    }

    const lastAccessed = allProgress.length > 0 ? lastAccessedPayload(allProgress[0]) : null

    res.json(createSuccessResponse({
      progress: progressForClient,
      summary,
      lastAccessed,
      topics: allTopicsFromCurriculum.map(topic => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        category: topic.category,
        difficulty: topic.difficulty,
        estimatedTime: topic.estimatedTime
      }))
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'get progress')
  }
})

// Summary only (frontend progress.getSummary())
router.get('/progress/summary', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const allProgress = await getAllProgress(userId)
    const expanded = expandLinearProgressToTopicRows(courses, allProgress)
    const allTopicsFromCurriculum = getAllTopics(courses)
    const totalTopics = allTopicsFromCurriculum.length
    const completedTopics = expanded.filter((p) => p.status === 'completed').length
    const inProgressTopics = expanded.filter((p) => p.status === 'in_progress').length
    const summary = {
      total_topics: totalTopics,
      completed_topics: completedTopics,
      in_progress_topics: inProgressTopics,
      completion_percentage: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
      certificate_eligible: completedTopics >= CERTIFICATE_TOPICS
    }
    const lastAccessed = allProgress.length > 0 ? lastAccessedPayload(allProgress[0]) : null
    res.json(createSuccessResponse({ summary, lastAccessed }))
  } catch (error) {
    handleErrorResponse(res, error, 'get progress summary')
  }
})

// Certificate download — requires completed topics count >= CERTIFICATE_TOPICS (matches curriculum size)
router.get('/certificate/download', authenticateToken, rateLimitMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId
    const allProgress = await getAllProgress(userId)
    const certCourseId = courses[0]?.id ?? DEFAULT_COURSE_ID
    const jsRow = allProgress.find((p) => p.course_id === certCourseId)
    const completedTopics = Math.min(
      Number(jsRow?.completed_topics_count) || 0,
      getTopicIdsForCourse(courses, certCourseId).length
    )

    if (completedTopics < CERTIFICATE_TOPICS) {
      return res.status(403).json(createErrorResponse(
        `Certificate requires completion of ${CERTIFICATE_TOPICS} topics. You have completed ${completedTopics}.`
      ))
    }

    const user = await getUserById(userId)
    const fullName = (user?.name && user.name.trim()) ? user.name.trim() : (user?.username || 'Student')
    const completionDate = new Date().toISOString()

    const pdfBuffer = await generateCertificatePDF({ fullName, completionDate })

    const filename = `Sara-Certificate-${(fullName || 'Completion').replace(/[^a-zA-Z0-9-_]/g, '_')}.pdf`
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.setHeader('Content-Length', pdfBuffer.length)
    res.send(pdfBuffer)
  } catch (error) {
    handleErrorResponse(res, error, 'certificate download')
  }
})

// Debug endpoint to check progress table
router.get('/debug/progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    // Get progress using the database service
    const data = await getAllProgress(userId)
    const error = null


    res.json({
      success: true,
      debug: {
        userId,
        error,
        data,
        dataLength: data?.length || 0
      }
    })
  } catch (error) {
    res.json({
      success: false,
      error: error.message
    })
  }
})

// Reset all progress for current user (for testing)
router.delete('/debug/reset-progress', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    const { deleteProgressByUserId, deleteChatSessionsByUserId } = await import('../services/database.js')

    await deleteProgressByUserId(userId)
    await deleteChatSessionsByUserId(userId)

    const result = { success: true, message: 'All progress reset successfully' }

    res.json({
      success: true,
      message: 'All progress data and cache have been reset using centralized progress manager.',
      userId,
      details: result
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Clear all caches (for debugging)
router.post('/debug/clear-cache', authenticateToken, async (req, res) => {
  try {
    const { progressCache } = await import('../middleware/performance.js')

    progressCache.clear()

    res.json({
      success: true,
      message: 'All backend caches cleared',
      cacheSize: progressCache.size()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Debug current progress state for a specific topic
router.get('/debug/progress/:topicId', authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params
    const userId = req.user.userId
    const topicMeta = findTopicById(courses, topicId)
    const courseId = topicMeta?.courseId ?? DEFAULT_COURSE_ID

    const progress = await getProgress(userId, topicId, courseId)


    res.json({
      success: true,
      debug: {
        userId,
        topicId,
        progress,
        nextPhase: null // Simplified for compatibility
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

// Comprehensive debug - check ALL data sources
router.get('/debug/all-data-sources', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    const { getProgressRowsByUserId, getChatSessionRowsByUserId } = await import('../services/database.js')

    const progressData = await getProgressRowsByUserId(userId)
    const chatSessionsData = await getChatSessionRowsByUserId(userId)
    const progressError = null
    const chatSessionsError = null

    // Check cache
    const { progressCache } = await import('../middleware/performance.js')


    res.json({
      success: true,
      debug: {
        userId,
        dataSources: {
          progress: {
            count: progressData?.length || 0,
            data: progressData,
            error: progressError?.message
          },
          chatSessions: {
            count: chatSessionsData?.length || 0,
            data: chatSessionsData,
            error: chatSessionsError?.message
          },
          cache: {
            size: progressCache.size()
          }
        }
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

router.get('/continue', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId

    // Get ONLY from progress table - no fallbacks
    const allProgress = await getAllProgress(userId)
    const lastAccessed = allProgress.length > 0 ? allProgress[0] : null

    if (!lastAccessed) {
      // New user: create progress row for first topic so "Continue learning" has a row before they open Learn
      const firstTopic = getAllTopics(courses)[0]
      if (firstTopic) {
        const totalTasks = (firstTopic.tasks || []).length
        await upsertProgress(userId, firstTopic.id, {
          phase: 'session',
          status: 'in_progress',
          current_task: totalTasks > 0 ? 1 : 0,
          total_tasks: totalTasks,
          assignments_completed: 0,
          completed_topics_count: 0,
          current_outcome_index: 0,
          updated_at: new Date().toISOString()
        }, firstTopic.courseId)
      }

      const topic = firstTopic || getAllTopics(courses)[0]
      if (!topic) {
        return res.json(createSuccessResponse({ lastAccessed: null }))
      }

      return res.json(createSuccessResponse({
        lastAccessed: {
          topicId: topic.id,
          phase: 'session'
        }
      }))
    }

    const payload = lastAccessedPayload(lastAccessed)
    if (payload && !findTopicById(courses, payload.topicId)) {
      return res.status(500).json(createErrorResponse('Invalid progress state'))
    }

    res.json(createSuccessResponse({
      lastAccessed: payload
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'get continue learning')
  }
})

// ============ COURSE MANAGEMENT ============

// GET /courses - Course + topic metadata only (no lesson bodies or assignment payloads)
router.get('/courses', authenticateToken, async (req, res) => {
  try {
    res.json(createSuccessResponse({
      courses: slimCoursesForList(courses)
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'Failed to get courses')
  }
})

// ============ TOPIC MANAGEMENT ============

router.get('/topics', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const topics = getAllTopics(courses)
    const userProgress = await getAllProgress(userId)
    const expanded = expandLinearProgressToTopicRows(courses, userProgress)

    // Enhance topics with progress information
    const enhancedTopics = topics.map(topic => {
      const p = expanded.find(
        (row) => String(row.topic_id) === String(topic.id) && String(row.course_id) === String(topic.courseId)
      )
      return {
        ...topic,
        status: p?.status || 'not_started',
        phase: p?.phase || 'session'
      }
    })

    res.json(createSuccessResponse({
      topics: enhancedTopics,
      totalTopics: topics.length,
      completedTopics: enhancedTopics.filter((t) => t.status === 'completed').length
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'get topics')
  }
})

router.get('/topic/:topicId', authenticateToken, requireCourseUnlocked, async (req, res) => {
  try {
    const { topicId } = req.params
    const userId = req.user.userId
    /** Dashboard "notes" / "code" shortcuts: browse without bumping updated_at (does not steal "continue" / Currently learning). */
    const referenceOnly = req.query.ref === '1' || req.query.ref === 'true'
    const phaseHint = req.query.phase === 'assignment' ? 'assignment' : 'session'

    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    const courseId = topic.courseId
    let progress = await getProgress(userId, topicId, courseId)
    const totalTasks = (topic.tasks || []).length

    if (!referenceOnly) {
      // Ensure progress row exists and refresh updated_at and total_tasks when user opens this topic for real learning.
      const now = new Date().toISOString()
      if (!progress) {
        progress = await upsertProgress(userId, topicId, {
          phase: 'session',
          status: 'in_progress',
          topic_id: String(topicId),
          current_task: totalTasks > 0 ? 1 : 0,
          total_tasks: totalTasks,
          assignments_completed: 0,
          current_outcome_index: 0,
          updated_at: now
        }, courseId)
      } else {
        progress = await upsertProgress(userId, topicId, {
          phase: progress.phase || 'session',
          status: progress.status || 'in_progress',
          total_tasks: totalTasks,
          updated_at: now
        }, courseId)
      }

      // Normalize legacy state: completed + session → assignment + in_progress (2-phase model)
      if (progress?.phase === 'session' && progress?.status === 'completed') {
        await upsertProgress(userId, topicId, {
          phase: 'assignment',
          status: 'in_progress',
          total_tasks: totalTasks,
          updated_at: new Date().toISOString()
        }, courseId)
        progress = { ...progress, phase: 'assignment', status: 'in_progress' }
      }
    } else if (!progress) {
      // Reference browse, no DB row yet: return in-memory defaults only (no INSERT, no updated_at change elsewhere)
      progress = {
        phase: phaseHint === 'assignment' ? 'assignment' : 'session',
        status: 'in_progress',
        current_task: totalTasks > 0 ? 1 : 0,
        total_tasks: totalTasks,
        assignments_completed: 0
      }
    }

    // Get all topics to find next topic
    const allTopics = getAllTopics(courses)
    const currentIndex = allTopics.findIndex(t => t.id === topicId)
    const nextTopicFull = currentIndex >= 0 && currentIndex < allTopics.length - 1
      ? allTopics[currentIndex + 1]
      : null

    res.json(createSuccessResponse({
      topic: {
        ...topic,
        status: progress?.status || 'not_started',
        phase: progress?.phase || 'session',
        current_task: progress?.current_task ?? 1,
        total_tasks: progress?.total_tasks ?? totalTasks,
        assignments_completed: progress?.assignments_completed ?? 0,
        topic_completed: progress?.status === 'completed' || (totalTasks > 0 && (progress?.assignments_completed ?? 0) >= totalTasks)
      },
      nextTopic: slimTopicNavRef(nextTopicFull)
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'get topic details')
  }
})

// ============ DEBUG ENDPOINTS ============

// Debug: List all available topics
router.get('/debug/topics', (req, res) => {
  try {
    const allTopics = courses.flatMap(course =>
      course.topics.map(topic => ({
        id: topic.id,
        title: topic.title,
        courseId: course.id,
        courseTitle: course.title
      }))
    )

    res.json(createSuccessResponse({
      total: allTopics.length,
      topics: allTopics
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'Failed to get topics')
  }
})

// Debug: Raw topic from curriculum (no auth, no progress) – use to compare with GET /topic/:id response
// If GET /topic/:id returns topic_notes or different outcome_messages, the source is outside this curriculum.
router.get('/debug/topic/:topicId', (req, res) => {
  try {
    const { topicId } = req.params
    const topic = findTopicById(courses, topicId)
    if (!topic) {
      return res.status(404).json(createErrorResponse('Topic not found'))
    }
    const summary = {
      id: topic.id,
      title: topic.title,
      hasOutcomes: !!topic.outcomes,
      outcomesLength: topic.outcomes?.length ?? 0,
      hasOutcomeMessages: !!topic.outcome_messages,
      outcomeMessagesLength: topic.outcome_messages?.length ?? 0,
      hasTopicNotes: !!(topic.topic_notes && String(topic.topic_notes).trim()),
      topicNotesLength: typeof topic.topic_notes === 'string' ? topic.topic_notes.length : 0
    }
    res.json(createSuccessResponse({
      summary,
      topic: {
        id: topic.id,
        title: topic.title,
        outcomes: topic.outcomes,
        outcome_messages: topic.outcome_messages ? topic.outcome_messages.map(m => (typeof m === 'string' ? m.slice(0, 80) + '...' : '(non-string)')) : undefined,
        topic_notes: topic.topic_notes != null ? (typeof topic.topic_notes === 'string' ? topic.topic_notes.slice(0, 200) + '...' : '(present)') : undefined
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'Failed to get debug topic')
  }
})

export default router