/**
 * DSA curriculum barrel: notes-only topics for the "Top 100 DSA Interview
 * Questions" course. Each topic file supplies raw question data; this module
 * generates the notes markdown (with in-page index) and wraps it into the
 * notes-only topic shape the app expects. Order is defined in order.js.
 */
import { buildTopicNotes } from './buildNotes.js'
import { DSA_TOPIC_ORDER } from './order.js'

import array from './topic-array.js'
import matrix from './topic-matrix.js'
import string from './topic-string.js'
import searchingSorting from './topic-searching-sorting.js'
import hashing from './topic-hashing.js'
import linkedList from './topic-linked-list.js'
import stackQueue from './topic-stack-queue.js'
import tree from './topic-tree.js'
import heap from './topic-heap.js'
import graph from './topic-graph.js'
import dpGreedy from './topic-dp-greedy.js'
import bitManipulation from './topic-bit-manipulation.js'

const rawTopics = {
    'dsa-array': array,
    'dsa-matrix': matrix,
    'dsa-string': string,
    'dsa-searching-sorting': searchingSorting,
    'dsa-hashing': hashing,
    'dsa-linked-list': linkedList,
    'dsa-stack-queue': stackQueue,
    'dsa-tree': tree,
    'dsa-heap': heap,
    'dsa-graph': graph,
    'dsa-dp-greedy': dpGreedy,
    'dsa-bit-manipulation': bitManipulation
}

/**
 * @param {{ id: string, title: string, description?: string, intro?: string, questions: Array<{ title: string }> }} raw
 */
function toNotesTopic(raw) {
    if (!raw || !raw.id || !raw.title || !Array.isArray(raw.questions)) {
        throw new Error(`Invalid DSA topic data: ${raw?.id || 'unknown'}`)
    }
    return {
        id: raw.id,
        title: raw.title,
        description: raw.description || '',
        category: 'dsa',
        notesOnly: true,
        outcomes: [],
        practise_tasks: [],
        tasks: [],
        topic_notes: buildTopicNotes({ intro: raw.intro, questions: raw.questions })
    }
}

export const dsaTopics = DSA_TOPIC_ORDER.map((id) => {
    const raw = rawTopics[id]
    if (!raw) throw new Error(`DSA topic missing for id in order.js: ${id}`)
    return toNotesTopic(raw)
})

export { DSA_TOPIC_ORDER }
export default dsaTopics
