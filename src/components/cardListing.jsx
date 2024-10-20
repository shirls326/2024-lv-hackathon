import React from 'react';
import './css/cardListing.css';

function cardListing({ imgSrc, name, price }) {
  return (
    <div className="ad-container">
      <div className='adImg'>
        <img src={imgSrc ?? 'https://placehold.co/200x200'} alt="listing image" />
      </div>

      <div className='adInfo'>
        <p>{name}</p>
        <p className='price'>${parseFloat(price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default cardListing;
