import './css/Sidebar.css';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

function Sidebar({ setSelectedCategory }) {
    const navigate = useNavigate();
    
    const handleRedirect = (event) => {
        event.preventDefault();
        const button = event.currentTarget;
        if (button && button.dataset && button.dataset.redirect) {
            navigate(button.dataset.redirect);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className='sidebar'>
            <div className='sidebar top'>
                <button data-redirect="/profile" onClick={handleRedirect}>Saved Listings</button>
                <button data-redirect="/newproduct" onClick={handleRedirect}>Create Listing</button>
            </div>
            <hr />
            <h2>Categories</h2>
            <div className='sidebar bottom'>
                <button onClick={() => handleCategoryClick('Apparel')}>Clothing</button>
                <button onClick={() => handleCategoryClick('Furniture')}>Furniture</button>
                <button onClick={() => handleCategoryClick('Free Items')}>Free Stuff</button>
                <button onClick={() => handleCategoryClick('Kitchen')}>Kitchen</button>
                <button onClick={() => handleCategoryClick('All')}>All</button>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    setSelectedCategory: PropTypes.func.isRequired, // Must be a function
};

export default Sidebar;
