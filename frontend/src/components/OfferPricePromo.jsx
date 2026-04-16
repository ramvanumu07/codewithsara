import React from 'react'
import './OfferPricePromo.css'

/**
 * Optional promo label (e.g. limited time) + plain price — no list/strike or percent-off.
 */
export default function OfferPricePromo ({ offer, variant = 'welcome' }) {
  if (!offer) return null
  const promoText = (offer.promoLabel || '').trim()
  const ariaLabel = promoText
    ? `${promoText}. Price ${offer.priceFormatted}`
    : `Price ${offer.priceFormatted}`

  return (
    <div className={`offer-price offer-price--${variant}`} role="group" aria-label={ariaLabel}>
      {promoText ? (
        <span className="offer-price__limited">{promoText}</span>
      ) : null}
      <div className="offer-price__amounts">
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
