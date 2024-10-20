import PropTypes from 'prop-types';

function MultiSelectDropdown({selectedItems, setSelectedItems}) {

  const options = ['Apparel', 'Electronics', 'Furniture', 'Free Items', 'Home Goods', 'Kitchen', 'School Supplies'];

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSelectedItems((prevSelected) => {
      if (checked) {
        // Add item to the selected array if checked
        return [...prevSelected, value];
      } else {
        // Remove item from the selected array if unchecked
        return prevSelected.filter((item) => item !== value);
      }
    });
  };

  return (
    <div className="dropdown dropdown-end relative">
      {/* Trigger Button */}
      <label tabIndex={0} className="btn">
        Select Tags
      </label>

      {/* Dropdown Content */}
      <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50">
        {options.map((option, index) => (
          <label key={index} className="cursor-pointer label">
            <span className="label-text">{option}</span>
            <input
              type="checkbox"
              value={option}
              checked={selectedItems.includes(option)}
              onChange={handleCheckboxChange}
              className="checkbox checkbox-primary"
            />
          </label>
        ))}
      </div>

      {/* Display Selected Items */}
      <div className="absolute top-[3rem] mt-4">
        {selectedItems && selectedItems.length > 0 &&
            <>
                <h4 className="font-bold my-0">Selected:</h4>
                <ul className='my-0 pl-[15px]'>
                {selectedItems.length > 0 ? (
                    selectedItems.map((item, index) => (
                    <li key={index} className="text-gray-700 my-1">
                        {item}
                    </li>
                ))
                ) : (
                    <li className="text-gray-500">No items selected</li>
                )}
                </ul>
            </>
        }

      </div>
    </div>
  );
}

// Define PropTypes for your component
MultiSelectDropdown.propTypes = {
  selectedItems: PropTypes.array.isRequired,         // Must be an array
  setSelectedItems: PropTypes.func.isRequired,       // Must be a function
};

export default MultiSelectDropdown;
