import React from 'react';
import './css/cardListing.css';
import flowerTest from './flowerTest.jpeg';

function cardListing() {
return (
    <div className="ad-container">
        <div className='adImg'>
            <img src= {flowerTest} alt="listing image"/>   
            
            
        </div>

        <div className='adInfo'> 
            <p>ITEM LISTING</p>
            <p className='price'>$XXX.XX</p>
        </div>
        
        

        {/* <img 
            src='https://via.placeholder.com/150'
            alt="Kitchen Aid Mixer"
            className="ad-image"
        />
        <div className="ad-overlay">
            <h2>Kitchen Aid Mixer</h2>
            <p className="ad-price">$25</p>
        </div> */}
    </div>
);
};

export default cardListing;
