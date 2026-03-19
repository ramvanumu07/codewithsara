/**
 * Course progress for the dashboard bar.
 * Each topic has 2 units: (1) session through starting assignments, (2) assignments finished / topic mastered.
 * DB rows use snake_case (topic_id, total_tasks, assignments_completed, …).
 */

/**
 * @param {object|null|undefined} p progress row from API
 * @returns {boolean}
 */
export function isTopicFullyComplete (p) {
  if (!p) return false
  if (p.topic_completed === true) return true
  const total = Number(p.total_tasks ?? 0)
  const done = Number(p.assignments_completed ?? p.completed_assignments ?? 0)
  // Session marked "completed" but assignments remain → not mastered yet (legacy / pre-assignment row)
  if (p.status === 'completed' && p.phase === 'session' && total > 0 && done < total) {
    return false
  }
  if (p.status === 'completed') return true
  if (total > 0 && done >= total) return true
  return false
}

/**
 * Units earned toward the 2-unit-per-topic bar (0, 1, or 2).
 * @param {object|null|undefined} p
 * @returns {0|1|2}
 */
export function topicProgressUnits (p) {
  if (!p) return 0
  if (isTopicFullyComplete(p)) return 2
  if (p.phase === 'assignment' || p.phase === 'playtime') return 1
  if (p.phase === 'session' && p.status === 'completed') return 1
  return 0
}

function findProgressForTopic (progressRows, topicId) {
  return progressRows.find((pr) => String(pr.topic_id) === String(topicId))
}

/**
 * @param {{ id: string }[]} courseTopics topics in this course (order preserved)
 * @param {object[]} courseProgressRows progress rows for this user filtered to this course
 * @returns {{ completed_topics: number, total_topics: number, completion_percentage: number }}
 */
export function computeCourseProgressSummary (courseTopics, courseProgressRows) {
  const total_topics = courseTopics.length
  const totalUnits = Math.max(0, total_topics * 2)

  let sumUnits = 0
  for (const t of courseTopics) {
    const p = findProgressForTopic(courseProgressRows, t.id)
    sumUnits += topicProgressUnits(p)
  }

  const completed_topics = courseTopics.filter((t) =>
    isTopicFullyComplete(findProgressForTopic(courseProgressRows, t.id))
  ).length

  const completion_percentage =
    totalUnits > 0 ? Math.round((sumUnits / totalUnits) * 100) : 0

  return {
    completed_topics,
    total_topics,
    completion_percentage
  }
}
