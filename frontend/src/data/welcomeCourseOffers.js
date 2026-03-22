/**
 * Public course offers shown on the Welcome page.
 * Add entries here as you ship more courses — the UI maps over this list.
 *
 * @typedef {Object} WelcomeCourseOffer
 * @property {string} id — stable slug (e.g. for analytics or future checkout)
 * @property {string} title
 * @property {string} [subtitle] — one line under the title
 * @property {string} priceFormatted — display string, e.g. "₹499" (keep in sync with /products)
 * @property {string} [priceNote] — e.g. currency / billing cadence
 * @property {string[]} highlights — short bullets (3–5 recommended)
 * @property {boolean} [featured] — visual emphasis
 * @property {string} [detailHref] — link for full legal / product copy (default /products)
 */

export const welcomeCourseOffers = [
  {
    id: 'javascript-sara',
    title: 'JavaScript with Sara',
    subtitle: 'Structured JavaScript curriculum — AI tutor, playground, and assignments',
    priceFormatted: '₹499',
    priceNote: 'INR · one-time digital access',
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
