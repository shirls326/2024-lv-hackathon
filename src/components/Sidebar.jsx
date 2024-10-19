import React from 'react'
import './Sidebar.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <button>Saved Products</button>
            <button>Sell Something</button>
            <hr style={{
                color: 'black',
                backgroundColor: 'black',
                height: 1
            }} />
            <h2>Categories</h2>
            <button>Clothing</button>
            <button>Furniture</button>
            <button>Free Stuff</button>
            <button>Kitchen</button>
        </div>
    )
}

export default Sidebar;