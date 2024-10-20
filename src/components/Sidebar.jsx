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

    const handleCategoryClick = (event) => {
        if (event === 'Saved') {
            setSelectedCategory('Saved');
            return;
        }

        event.preventDefault();
        const id = event.target.id;
        setSelectedCategory(id);

        // add active property
        document.querySelectorAll('.sidebar button').forEach((button) => {
            button.classList.remove('active');
        });

        event.target.classList.add('active');
    };

    return (
        <div className='sidebar'>
            <div className='sidebar top'>
                <button onClick={() => handleCategoryClick('Saved')}>Saved Listings</button>
                <button data-redirect="/newproduct" onClick={handleRedirect}>Create Listing</button>
            </div>
            <hr />
            <h2>Categories</h2>
            <div className='sidebar bottom'>
                <button id='All' onClick={e => handleCategoryClick(e)}>All</button>
                <button id='Free' onClick={e => handleCategoryClick(e)}>Free Stuff</button>
                <button id='Apparel' onClick={e => handleCategoryClick(e)}>Clothing</button>
                <button id='Furniture' onClick={e => handleCategoryClick(e)}>Furniture</button>
                <button id='Kitchen' onClick={e => handleCategoryClick(e)}>Kitchen</button>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    setSelectedCategory: PropTypes.func.isRequired,
};

export default Sidebar;
