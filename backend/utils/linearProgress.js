/**
 * One DB row per (user, course): expand to per-topic rows for API clients (dashboard, etc.).
 */

/**
 * Topic id the learner should be on: index = completed_topics_count (next after finished prefix).
 */
export function resolveCanonicalCurrentTopicId(row, course) {
  if (!row) return null
  const ids = course?.topics?.map((t) => t.id) ?? []
  if (!ids.length) return row.topic_id
  const done = Math.min(Number(row.completed_topics_count) || 0, ids.length)
  if (done < ids.length) return ids[done]
  return ids[ids.length - 1]
}

/**
 * @param {Array<{ id: string, topics: Array<{ id: string, tasks?: unknown[] }> }>} courses
 * @param {Array<{ course_id: string, topic_id: string, completed_topics_count?: number, status?: string, phase?: string, updated_at?: string, [k: string]: unknown }>} progressRows
 * @returns {object[]}
 */
export function expandLinearProgressToTopicRows(courses, progressRows) {
  const out = []
  for (const course of courses) {
    const row = progressRows.find((r) => String(r.course_id) === String(course.id))
    if (!row) continue
    const topics = course.topics || []
    const ids = topics.map((t) => t.id)
    const done = Math.min(Number(row.completed_topics_count) || 0, ids.length)
    // Live row applies to topic at index `done` (first not-yet-counted topic), not row.topic_id when counts disagree.
    const currentIdx = done < ids.length ? done : -1

    for (let i = 0; i < ids.length; i++) {
      const topic = topics[i]
      const tid = topic.id
      if (i < done) {
        const tt = topic.tasks?.length ?? 0
        out.push({
          topic_id: tid,
          course_id: course.id,
          status: 'completed',
          phase: 'assignment',
          total_tasks: tt,
          assignments_completed: tt,
          current_task: tt,
          updated_at: row.updated_at
        })
      } else if (currentIdx >= 0 && i === currentIdx) {
        out.push({
          ...row,
          topic_id: tid,
          course_id: course.id
        })
      }
    }
  }
  return out
}
