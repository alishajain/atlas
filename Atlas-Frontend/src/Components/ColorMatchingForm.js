import React, { useState } from "react";

const ColorMatchingForm = ({ onSubmit }) => {
  const [numColors, setNumColors] = useState(0); // Number of color matches
  const [buttonNames, setButtonNames] = useState([]); // Names for the buttons

  // Handle number of colors change
  const handleNumColorsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumColors(num);
    setButtonNames(Array(num).fill("")); // Reset button names when the number changes
  };

  // Handle button name change
  const handleButtonNameChange = (index, e) => {
    const newNames = [...buttonNames];
    newNames[index] = e.target.value;
    setButtonNames(newNames);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the button names to the parent component (AddKnittingDetailsForm)
    onSubmit(buttonNames);
  };

  return (
    <div>
      <h2>Color Matching</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Number of color matches: </label>
          <input
            type="number"
            value={numColors}
            onChange={handleNumColorsChange}
            min="1"
            required
          />
        </div>

        <div>
          {Array.from({ length: numColors }, (_, index) => (
            <div key={index}>
              <label>Color Match {index + 1} Name: </label>
              <input
                type="text"
                value={buttonNames[index]}
                onChange={(e) => handleButtonNameChange(index, e)}
                required
              />
            </div>
          ))}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ColorMatchingForm;
