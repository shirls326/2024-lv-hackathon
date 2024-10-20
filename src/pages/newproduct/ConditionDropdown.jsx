import PropTypes from 'prop-types';

function ConditionDropdown({selectedCondition, setSelectedCondition}) {

  const conditions = [
    'New (Brand New / Sealed)',
    'Like New',
    'Excellent / Mint Condition',
    'Very Good',
    'Good',
    'Fair',
    'Poor / Heavily Used',
    'For Parts / Not Working',
  ];

  const handleSelectChange = (e) => {
    setSelectedCondition(e.target.value);
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Trigger Button */}
      <label tabIndex={0} className="btn m-1">
        {selectedCondition || 'Select Condition'}
      </label>

      {/* Dropdown Content */}
      <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        <select
          value={selectedCondition}
          onChange={handleSelectChange}
          className="select select-bordered w-full"
        >
          <option disabled value="">
            Select a condition
          </option>
          {conditions.map((condition, index) => (
            <option key={index} value={condition}>
              {condition}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Define PropTypes for your component
ConditionDropdown.propTypes = {
    selectedCondition: PropTypes.array.isRequired,         // Must be an array
    setSelectedCondition: PropTypes.func.isRequired,       // Must be a function
};

export default ConditionDropdown;
