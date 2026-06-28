/**
 * Course access rules: payment unlock (JavaScript) vs JS-completion unlock (DSA).
 */
import { courses } from '../data/curriculum.js'
import { getAllProgress, isCourseUnlockedForUser } from '../services/database.js'
import { expandLinearProgressToTopicRows } from './linearProgress.js'

const JAVASCRIPT_COURSE_ID = 'javascript'
const DSA_COURSE_ID = 'dsa'

function isTopicFullyComplete (p) {
  if (!p) return false
  if (p.topic_completed === true) return true
  const total = Number(p.total_tasks ?? 0)
  const done = Number(p.assignments_completed ?? p.completed_assignments ?? 0)
  if (p.status === 'completed' && p.phase === 'session' && total > 0 && done < total) {
    return false
  }
  if (p.status === 'completed') return true
  if (total > 0 && done >= total) return true
  return false
}

/**
 * True when every topic in the JavaScript course is fully complete for this user.
 * @param {number|string} userId
 */
export async function isJavascriptCourseFullyCompleteForUser (userId) {
  const jsCourse = courses.find((c) => c.id === JAVASCRIPT_COURSE_ID)
  const topics = jsCourse?.topics || []
  if (topics.length === 0) return false

  const userProgress = await getAllProgress(userId)
  const expanded = expandLinearProgressToTopicRows(courses, userProgress)
  const jsProgress = expanded.filter((row) =>
    topics.some((t) => String(t.id) === String(row.topic_id))
  )

  return topics.every((t) =>
    isTopicFullyComplete(jsProgress.find((p) => String(p.topic_id) === String(t.id)))
  )
}

/**
 * @param {number|string} userId
 * @param {string} courseId
 */
export async function isCourseAccessibleForUser (userId, courseId) {
  if (courseId === DSA_COURSE_ID) {
    return isJavascriptCourseFullyCompleteForUser(userId)
  }
  return isCourseUnlockedForUser(userId, courseId)
}

export function isNotesOnlyCourseId (courseId) {
  return courseId === DSA_COURSE_ID
}
