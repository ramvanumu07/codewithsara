/**
 * Public course offers shown on the Welcome page.
 * Add entries here as you ship more courses — the UI maps over this list.
 *
 * @typedef {Object} WelcomeCourseOffer
 * @property {string} id — stable slug (e.g. for analytics or future checkout)
 * @property {string} title
 * @property {string} [subtitle] — one line under the title
 * @property {string} priceFormatted — display string, e.g. "₹499" (keep in sync with /products)
 * @property {string} [priceNote] — clarifies currency + that it is a single purchase, not daily or subscription
 * @property {string[]} highlights — short bullets (3–5 recommended)
 * @property {boolean} [featured] — visual emphasis
 * @property {string} [detailHref] — link for full legal / product copy (default /products)
 * @property {string[]} [forCourseIds] — API course ids (e.g. "javascript") for dashboard unlock card
 */

export const welcomeCourseOffers = [
  {
    id: 'javascript-sara',
    forCourseIds: ['javascript'],
    title: 'JavaScript with Sara',
    subtitle: 'Structured JavaScript curriculum — AI tutor, playground, and assignments',
    priceFormatted: '₹499',
    priceNote: 'INR',
    highlights: [
      'AI-powered tutoring tailored to each JavaScript topic',
      'Interactive playground to run and experiment with JavaScript',
      'Assignments with automated tests and feedback',
      'Progress saved so you can pick up where you left off',
    ],
    featured: true,
    detailHref: '/products',
  },
]

/**
 * Pricing copy for the dashboard unlock card and payment modal.
 * Matches offers where `forCourseIds` includes the course id; otherwise first listing or null.
 *
 * @param {string} courseId
 * @returns {WelcomeCourseOffer | null}
 */
export function getUnlockOfferForDashboardCourse (courseId) {
  if (!courseId) return welcomeCourseOffers[0] ?? null
  const match = welcomeCourseOffers.find(
    (o) => Array.isArray(o.forCourseIds) && o.forCourseIds.includes(courseId)
  )
  if (match) return match
  if (welcomeCourseOffers.length === 1) return welcomeCourseOffers[0]
  return welcomeCourseOffers[0] ?? null
}
