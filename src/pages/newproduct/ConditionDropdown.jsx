import PropTypes from 'prop-types';

function ConditionDropdown({selectedCondition, setSelectedCondition}) {

  const conditions = [
    'Brand New',
    'Like New',
    'Excellent',
    'Very Good',
    'Good',
    'Fair',
    'Poor / Heavily Used',
    'For Parts / Not Working',
  ];
  
  // Handle option selection
  const handleOptionClick = (condition) => {
    setSelectedCondition(condition);
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Dropdown Trigger */}
      <label tabIndex={0} className="btn m-1">
        {selectedCondition || 'Select Condition'}
      </label>

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {conditions.map((condition, index) => (
          <li key={index}>
            <button
              className="w-full text-left bg-white"
              onClick={() => handleOptionClick(condition)}
            >
              {condition}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Define PropTypes for your component
ConditionDropdown.propTypes = {
    selectedCondition: PropTypes.array.isRequired,         // Must be an array
    setSelectedCondition: PropTypes.func.isRequired,       // Must be a function
};

export default ConditionDropdown;
