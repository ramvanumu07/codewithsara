/**
 * Dashboard course progress bar: 2 units per topic (session→assignment pipeline).
 */

import {
  isTopicFullyComplete,
  topicProgressUnits,
  computeCourseProgressSummary
} from '../courseProgress'

const topics = (n) =>
  Array.from({ length: n }, (_, i) => ({ id: `topic-${i + 1}`, title: `T${i + 1}` }))

describe('isTopicFullyComplete', () => {
  test('null / undefined is not complete', () => {
    expect(isTopicFullyComplete(null)).toBe(false)
    expect(isTopicFullyComplete(undefined)).toBe(false)
  })

  test('topic_completed flag from API', () => {
    expect(isTopicFullyComplete({ topic_completed: true, status: 'in_progress' })).toBe(true)
  })

  test('status completed', () => {
    expect(isTopicFullyComplete({ status: 'completed', phase: 'assignment' })).toBe(true)
  })

  test('assignments_done >= total_tasks when column present', () => {
    expect(
      isTopicFullyComplete({
        status: 'in_progress',
        phase: 'assignment',
        total_tasks: 3,
        assignments_completed: 3
      })
    ).toBe(true)
  })

  test('not complete when fewer assignments than tasks', () => {
    expect(
      isTopicFullyComplete({
        status: 'in_progress',
        phase: 'assignment',
        total_tasks: 3,
        assignments_completed: 1
      })
    ).toBe(false)
  })

  test('session in progress is not complete', () => {
    expect(
      isTopicFullyComplete({
        phase: 'session',
        status: 'in_progress'
      })
    ).toBe(false)
  })

  test('session status completed with assignments remaining is not fully complete', () => {
    expect(
      isTopicFullyComplete({
        phase: 'session',
        status: 'completed',
        total_tasks: 2,
        assignments_completed: 0
      })
    ).toBe(false)
  })
})

describe('topicProgressUnits', () => {
  test('no row → 0', () => {
    expect(topicProgressUnits(null)).toBe(0)
  })

  test('full topic → 2', () => {
    expect(topicProgressUnits({ status: 'completed', phase: 'assignment' })).toBe(2)
  })

  test('session only, in progress → 0', () => {
    expect(topicProgressUnits({ phase: 'session', status: 'in_progress' })).toBe(0)
  })

  test('assignment phase in progress (session done) → 1', () => {
    expect(
      topicProgressUnits({
        phase: 'assignment',
        status: 'in_progress',
        total_tasks: 3,
        assignments_completed: 0
      })
    ).toBe(1)
  })

  test('legacy playtime → 1', () => {
    expect(topicProgressUnits({ phase: 'playtime', status: 'in_progress' })).toBe(1)
  })

  test('session completed but assignments not done (legacy row) → 1', () => {
    expect(
      topicProgressUnits({
        phase: 'session',
        status: 'completed',
        total_tasks: 3,
        assignments_completed: 0
      })
    ).toBe(1)
  })
})

describe('computeCourseProgressSummary', () => {
  test('empty course → 0%', () => {
    expect(computeCourseProgressSummary([], [])).toEqual({
      completed_topics: 0,
      total_topics: 0,
      completion_percentage: 0
    })
  })

  test('topic 1 session only: 1 of 2 units over 10 topics → ~5%', () => {
    const t = topics(10)
    const progress = [
      {
        topic_id: 'topic-1',
        phase: 'assignment',
        status: 'in_progress',
        total_tasks: 2,
        assignments_completed: 0
      }
    ]
    const s = computeCourseProgressSummary(t, progress)
    expect(s.total_topics).toBe(10)
    expect(s.completed_topics).toBe(0)
    // 1 / 20 = 5%
    expect(s.completion_percentage).toBe(5)
  })

  test('topic 1 fully done: 2 of 20 units → 10%', () => {
    const t = topics(10)
    const progress = [
      {
        topic_id: 'topic-1',
        phase: 'assignment',
        status: 'completed',
        total_tasks: 2,
        assignments_completed: 2
      }
    ]
    const s = computeCourseProgressSummary(t, progress)
    expect(s.completed_topics).toBe(1)
    expect(s.completion_percentage).toBe(10)
  })

  test('does not drop to 0% when topic 1 is done and topic 2 row is newer (session)', () => {
    const t = topics(5)
    const progress = [
      {
        topic_id: 'topic-1',
        phase: 'assignment',
        status: 'completed',
        total_tasks: 1,
        assignments_completed: 1,
        updated_at: '2020-01-01T00:00:00.000Z'
      },
      {
        topic_id: 'topic-2',
        phase: 'session',
        status: 'in_progress',
        updated_at: '2025-01-02T00:00:00.000Z'
      }
    ]
    const s = computeCourseProgressSummary(t, progress)
    expect(s.completed_topics).toBe(1)
    // topic1: 2 units, topic2: 0 → 2/10 = 20%
    expect(s.completion_percentage).toBe(20)
  })

  test('matches 41-topic course: one topic halfway (assignment) → round(1/82*100)=1%', () => {
    const t = topics(41)
    const progress = [
      {
        topic_id: 'topic-1',
        phase: 'assignment',
        status: 'in_progress',
        total_tasks: 5,
        assignments_completed: 0
      }
    ]
    const s = computeCourseProgressSummary(t, progress)
    expect(s.completion_percentage).toBe(1)
  })

  test('matches 41-topic course: one topic fully done → round(2/82*100)=2%', () => {
    const t = topics(41)
    const progress = [
      {
        topic_id: 'topic-1',
        phase: 'assignment',
        status: 'completed',
        total_tasks: 3,
        assignments_completed: 3
      }
    ]
    const s = computeCourseProgressSummary(t, progress)
    expect(s.completed_topics).toBe(1)
    expect(s.completion_percentage).toBe(2)
  })
})
