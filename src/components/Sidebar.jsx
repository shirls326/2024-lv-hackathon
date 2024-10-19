import React from 'react'
import './Sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className='sidebar top'>
                <button>Saved Products</button>
                <button>Sell Something</button>
            </div>
            <hr style={{
                color: 'black',
                backgroundColor: 'black',
                height: 1
            }} />
            <div className='sidebar bottom'>
                <h2>Categories</h2>
                <button>Clothing</button>
                <button>Furniture</button>
                <button>Free Stuff</button>
                <button>Kitchen</button>

            </div>
          
        </div>
    )
}

export default Sidebar;