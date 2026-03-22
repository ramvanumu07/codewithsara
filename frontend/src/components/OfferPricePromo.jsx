import React from 'react'
import { getOfferDiscountPercent } from '../data/welcomeCourseOffers'
import './OfferPricePromo.css'

/**
 * Limited-time label + compare-at (gray text, red strike line) + sale price + inline % off.
 */
export default function OfferPricePromo ({ offer, variant = 'welcome' }) {
  if (!offer) return null
  const pct = getOfferDiscountPercent(offer)
  const hasCompare = Boolean(offer.compareAtPriceFormatted && pct != null && pct > 0)
  const promoText = (offer.promoLabel || 'Limited time offer').trim()

  const ariaLabel = hasCompare
    ? `${promoText}. Sale price ${offer.priceFormatted}, was ${offer.compareAtPriceFormatted}, ${pct} percent off`
    : `Price ${offer.priceFormatted}`

  return (
    <div className={`offer-price offer-price--${variant}`} role="group" aria-label={ariaLabel}>
      {hasCompare && (
        <span className="offer-price__limited">{promoText}</span>
      )}
      <div className="offer-price__amounts">
        {hasCompare && (
          <span className="offer-price__compare-at" aria-hidden="true">
            {offer.compareAtPriceFormatted}
          </span>
        )}
        <span className="offer-price__sale-group">
          <span className="offer-price__current">{offer.priceFormatted}</span>
          {hasCompare && (
            <span className="offer-price__pct-inline">{pct}% off</span>
          )}
        </span>
      </div>
    </div>
  )
}
