/**
 * One DB row per (user, course): expand to per-topic rows for API clients (dashboard, etc.).
 */

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
    const curIdx = ids.indexOf(row.topic_id)

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
      } else if (curIdx >= 0 && i === curIdx) {
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
