import React from 'react';
import './css/cardListing.css';

function cardListing() {
return (
    <div className="ad-container">
        <div className='adImg'>
            <img src="https://picsum.photos/200" alt="listing image"/>   
        </div>

        <div className='adInfo'> 
            <p>ITEM LISTING</p>
            <p className='price'>$XXX.XX</p>
        </div>
    </div>
);
};

export default cardListing;
