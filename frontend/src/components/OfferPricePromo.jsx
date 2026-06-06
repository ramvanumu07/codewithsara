import React from 'react'
import './OfferPricePromo.css'

/**
 * Optional promo label + price. Welcome variant shows list price strike-through.
 */
export default function OfferPricePromo ({ offer, variant = 'welcome' }) {
  if (!offer) return null
  const promoText = (offer.promoLabel || '').trim()
  const showPromoPricing =
    variant === 'welcome' &&
    offer.listPriceFormatted

  const ariaLabel = promoText
    ? showPromoPricing
      ? `${promoText}. Was ${offer.listPriceFormatted}, now ${offer.priceFormatted}`
      : `${promoText}. Price ${offer.priceFormatted}`
    : showPromoPricing
      ? `Was ${offer.listPriceFormatted}, now ${offer.priceFormatted}`
      : `Price ${offer.priceFormatted}`

  return (
    <div className={`offer-price offer-price--${variant}`} role="group" aria-label={ariaLabel}>
      {promoText ? (
        <span className="offer-price__limited">{promoText}</span>
      ) : null}
      <div className="offer-price__amounts">
        {showPromoPricing ? (
          <span className="offer-price__list" aria-hidden="true">
            {offer.listPriceFormatted}
          </span>
        ) : null}
        <span className="offer-price__sale-group">
          <span className="offer-price__current">
            {offer.priceFormatted}
            {variant === 'dashboard' && <span className="offer-price__current-suffix">/-</span>}
          </span>
        </span>
      </div>
    </div>
  )
}
