/**
 * Build notes-only markdown for a DSA topic.
 *
 * Each topic supplies an intro + an ordered list of question objects. This
 * generates an in-page index (anchor links) followed by one section per
 * question using a fixed template: Problem -> Example -> Approach -> Solution
 * -> Output -> Complexity. Missing fields are skipped; a question with no
 * authored content yet renders a "Content coming soon." placeholder so the
 * heading (and its anchor) still exists.
 *
 * IMPORTANT: slugify() here MUST match the heading-id slug used by the notes
 * renderer in frontend/src/pages/Learn.jsx, otherwise index links won't jump.
 */

/**
 * @param {string} text
 * @returns {string}
 */
export function slugify(text) {
    return String(text)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

/**
 * @param {{ title: string, problem?: string, examples?: string, approach?: string, solution?: string, output?: string, complexity?: string }} q
 * @param {number} index 1-based question number
 * @returns {string}
 */
function renderQuestion(q, index) {
    const heading = `${index}. ${q.title}`
    const lines = [`## ${heading}`, '']

    const hasContent = Boolean(
        q.problem || q.examples || q.approach || q.solution || q.output || q.complexity
    )
    if (!hasContent) {
        lines.push('_Content coming soon._', '')
        return lines.join('\n')
    }

    if (q.problem) lines.push(`**Problem.** ${q.problem.trim()}`, '')
    if (q.examples) lines.push('**Example**', '', '```text', q.examples.trim(), '```', '')
    if (q.approach) lines.push(`**Approach.** ${q.approach.trim()}`, '')
    if (q.solution) lines.push('**Solution**', '', '```js', q.solution.trim(), '```', '')
    if (q.output) lines.push('**Output**', '', '```text', q.output.trim(), '```', '')
    if (q.complexity) lines.push(`**Complexity.** ${q.complexity.trim()}`, '')

    return lines.join('\n')
}

/**
 * @param {{ intro?: string, questions: Array<{ title: string }> }} param0
 * @returns {string}
 */
export function buildTopicNotes({ intro, questions }) {
    const list = Array.isArray(questions) ? questions : []
    const parts = []

    if (intro && intro.trim()) parts.push(intro.trim(), '')

    parts.push('## Questions', '')
    parts.push(
        list
            .map((q, i) => `${i + 1}. [${q.title}](#${slugify(`${i + 1}. ${q.title}`)})`)
            .join('\n')
    )
    parts.push('')

    list.forEach((q, i) => {
        parts.push(renderQuestion(q, i + 1))
    })

    return parts.join('\n')
}
