/**
 * Public course offers shown on the Welcome page.
 * Add entries here as you ship more courses — the UI maps over this list.
 *
 * Keep `priceAmount` in sync with backend `JS_FULL_ACCESS_PRICE_RUPEES` (checkoutPricing.js).
 *
 * @typedef {Object} WelcomeCourseOffer
 * @property {string} id — stable slug (e.g. for analytics or future checkout)
 * @property {string} title
 * @property {string} [subtitle] — one line under the title
 * @property {string} priceFormatted — display price, e.g. "₹999"
 * @property {number} priceAmount — numeric price in rupees (checkout / API validation)
 * @property {string} [listPriceFormatted] — original list price for promo display (Welcome only)
 * @property {number} [listPriceAmount] — original list price in rupees
 * @property {string} [promoLabel] — e.g. "Limited time offer" (shown above price; not a discount claim)
 * @property {string[]} highlights — short bullets (3–5 recommended)
 * @property {boolean} [featured] — visual emphasis
 * @property {string} [detailHref] — link for full legal / product copy (default /services)
 * @property {string[]} [forCourseIds] — API course ids (e.g. "javascript") for dashboard unlock card
 */

/** JavaScript full-access sale price (INR). Sync with backend/services/checkoutPricing.js */
export const JS_COURSE_PRICE_RUPEES = 999

/** Original list price shown struck through on the Welcome pricing card */
export const JS_COURSE_LIST_PRICE_RUPEES = 2499

function formatInrDisplay (rupees) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(rupees)
}

export const welcomeCourseOffers = [
  {
    id: 'javascript-sara',
    forCourseIds: ['javascript'],
    title: 'JavaScript + DSA with Sara',
    subtitle: 'JavaScript + DSA — AI tutor, playground, assignments, and the Top 100 DSA interview questions',
    priceFormatted: formatInrDisplay(JS_COURSE_PRICE_RUPEES),
    priceAmount: JS_COURSE_PRICE_RUPEES,
    listPriceFormatted: formatInrDisplay(JS_COURSE_LIST_PRICE_RUPEES),
    listPriceAmount: JS_COURSE_LIST_PRICE_RUPEES,
    promoLabel: 'Limited time offer',
    highlights: [
      'AI-powered tutoring tailored to each JavaScript topic',
      'Interactive playground to run and experiment with JavaScript',
      'Assignments with automated tests and feedback',
      'Bonus DSA course — Top 100 interview questions, unlocked free on completion',
      'Certificate + 3 portfolio projects on completion',
    ],
    featured: true,
    detailHref: '/services',
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
