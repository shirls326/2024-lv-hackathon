import React from 'react'

function cardListing({ imgSrc, title, price }) {
  return (
    <div className="product">
      <img src={imgSrc} alt={title} />
      <h2>{title}</h2>
      <p>{price}</p>
    </div>
  )
}

export default cardListing;