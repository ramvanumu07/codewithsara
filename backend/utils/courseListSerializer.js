/**
 * Slim course/topic shapes for list endpoints (dashboard, navigation).
 * Omits outcome_messages, tasks bodies, and other heavy curriculum fields.
 * Full content is served from GET /learn/topic/:topicId.
 */

/**
 * @param {Record<string, unknown>} topic
 * @returns {Record<string, unknown>}
 */
export function slimTopicForList(topic) {
  if (!topic || typeof topic !== 'object') return {}
  const tasks = topic.tasks
  const taskCount = Array.isArray(tasks) ? tasks.length : 0
  return {
    id: topic.id,
    title: topic.title,
    description: topic.description,
    category: topic.category,
    difficulty: topic.difficulty,
    estimatedTime: topic.estimatedTime,
    courseId: topic.courseId,
    taskCount
  }
}

/**
 * @param {Record<string, unknown>} course
 * @returns {Record<string, unknown>}
 */
export function slimCourseForList(course) {
  if (!course || typeof course !== 'object') return {}
  const topics = course.topics
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    topics: Array.isArray(topics) ? topics.map(slimTopicForList) : []
  }
}

/**
 * @param {Array<Record<string, unknown>>} courses
 * @returns {Array<Record<string, unknown>>}
 */
export function slimCoursesForList(courses) {
  if (!Array.isArray(courses)) return []
  return courses.map(slimCourseForList)
}

/**
 * Minimal next-topic hint (navigation only).
 * @param {Record<string, unknown>|null|undefined} topic
 * @returns {{ id?: string, title?: string, courseId?: string }|null}
 */
export function slimTopicNavRef(topic) {
  if (!topic || typeof topic !== 'object' || !topic.id) return null
  return {
    id: topic.id,
    title: topic.title,
    courseId: topic.courseId
  }
}
