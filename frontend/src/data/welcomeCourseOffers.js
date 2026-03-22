/**
 * Public course offers shown on the Welcome page.
 * Add entries here as you ship more courses — the UI maps over this list.
 *
 * @typedef {Object} WelcomeCourseOffer
 * @property {string} id — stable slug (e.g. for analytics or future checkout)
 * @property {string} title
 * @property {string} [subtitle] — one line under the title
 * @property {string} priceFormatted — current sale price display, e.g. "₹999" (keep in sync with /products)
 * @property {string} [compareAtPriceFormatted] — strikethrough list price, e.g. "₹1599"
 * @property {number} [priceAmount] — numeric sale price (for % off); pair with compareAtAmount
 * @property {number} [compareAtAmount] — numeric list price before discount
 * @property {number} [discountPercent] — optional override; else computed from amounts
 * @property {string} [promoLabel] — e.g. "Limited time offer" (compact label above price row)
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
    priceFormatted: '₹999',
    compareAtPriceFormatted: '₹1599',
    priceAmount: 999,
    compareAtAmount: 1599,
    promoLabel: 'Limited time offer',
    highlights: [
      'AI-powered tutoring tailored to each JavaScript topic',
      'Interactive playground to run and experiment with JavaScript',
      'Assignments with automated tests and feedback',
      'Certificate + 3 portfolio projects on completion',
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
/**
 * @param {WelcomeCourseOffer | null | undefined} offer
 * @returns {number | null} whole-number percent off (e.g. 33), or null if no promo
 */
export function getOfferDiscountPercent (offer) {
  if (!offer) return null
  if (typeof offer.discountPercent === 'number' && offer.discountPercent > 0) {
    return Math.round(offer.discountPercent)
  }
  const hi = offer.compareAtAmount
  const lo = offer.priceAmount
  if (typeof hi === 'number' && typeof lo === 'number' && hi > lo) {
    return Math.round((1 - lo / hi) * 100)
  }
  return null
}

export function getUnlockOfferForDashboardCourse (courseId) {
  if (!courseId) return welcomeCourseOffers[0] ?? null
  const match = welcomeCourseOffers.find(
    (o) => Array.isArray(o.forCourseIds) && o.forCourseIds.includes(courseId)
  )
  if (match) return match
  if (welcomeCourseOffers.length === 1) return welcomeCourseOffers[0]
  return welcomeCourseOffers[0] ?? null
}
