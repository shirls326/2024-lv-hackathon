import React from 'react';
import './css/cardListing.css';
import { useNavigate } from 'react-router';

function cardListing({ id, imgSrc, name, price }) {
  const navigate = useNavigate();

  return (
    <div className="ad-container" onClick={() => navigate('/products/' + id)}>
      <div className='ad-Img'>
        <img src={imgSrc ?? 'https://placehold.co/200x200'} alt="listing image" />
      </div>

      <div className='ad-Info'>
        <p>{name}</p>
        <p className='price'>${parseFloat(price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default cardListing;
