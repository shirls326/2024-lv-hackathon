import './css/Sidebar.css';
import { useNavigate } from 'react-router'

function Sidebar() {
    const navigate = useNavigate();
    const handleRedirect = (event) => {
        event.preventDefault();
        const button = event.currentTarget;
        if (button && button.dataset && button.dataset.redirect) {
            navigate(button.dataset.redirect);
        }
    }
    return (
        <div className='sidebar'>
            <div className='sidebar top'>
                <button data-redirect="/profile" onClick={handleRedirect}>Saved Listings</button>
                <button data-redirect="/newproduct" onClick={handleRedirect}>Creating Listing</button>
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