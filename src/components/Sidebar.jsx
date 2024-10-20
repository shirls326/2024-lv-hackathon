import React from 'react'
import './css/Sidebar.css'

function Sidebar() {
    return (
        <div className='sidebar'>

            <div className='sidebar top'>
                <button>Saved Listings</button>
                <button>Creating Listing</button>
            </div>
            <hr />
            <h2>Categories</h2>
            <div className='sidebar bottom'>
                <button>Clothing</button>
                <button>Furniture</button>
                <button>Free Stuff</button>
                <button>Kitchen</button>

            </div>
          
        </div>
    )
}

export default Sidebar;