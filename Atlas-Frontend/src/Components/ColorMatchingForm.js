import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ColorMatchingForm = ({ onSubmit }) => {
  const location = useLocation();
  const { RSN, selectedStates } = location.state || {}; // Access RSN and selectedFields passed via navigation

  const [numColors, setNumColors] = useState(0); // Number of color matches
  const [buttonNames, setButtonNames] = useState([]); // Names for the buttons
  const [activeColorMatchIndices, setActiveColorMatchIndices] = useState([]); // To track which color matches are being edited
  const [formData, setFormData] = useState([]); // To store form data for the color match form

  // Handle number of colors change
  const handleNumColorsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumColors(num);
    setButtonNames(Array(num).fill("")); // Reset button names when the number changes
    setActiveColorMatchIndices([]); // Reset active color match when number of colors changes
  };

  // Handle button name change
  const handleButtonNameChange = (index, e) => {
    const newNames = [...buttonNames];
    newNames[index] = e.target.value;
    setButtonNames(newNames);
  };

  // Handle form data change
  const handleFormDataChange = (rowIndex, colIndex, e) => {
    const newData = [...formData];
    if (!newData[rowIndex]) newData[rowIndex] = Array(16).fill(""); // Ensure each row has 16 columns
    newData[rowIndex][colIndex] = e.target.value;
    setFormData(newData);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the button names and formData to the parent component (AddKnittingDetailsForm)
    onSubmit(buttonNames, formData);
  };

  // Open the color match form when a button is clicked
  const openColorMatchForm = (index) => {
    // Toggle the form visibility (show if not already visible, hide if already visible)
    setActiveColorMatchIndices(
      (prevIndices) =>
        prevIndices.includes(index)
          ? prevIndices.filter((i) => i !== index) // Remove the form if already active
          : [...prevIndices, index] // Add the form if not active
    );

    // Initialize the form data with rows based on selectedFields and columns = 16
    const initialFormData = Array(Object.keys(selectedStates).length).fill(
      Array(16).fill("")
    );
    setFormData(initialFormData);
  };

  useEffect(() => {
    // Optionally, you can pre-populate the form based on RSN or selectedFields if needed.
    if (selectedStates) {
      // Log selectedStates for debugging
      console.log("selectedStates:", selectedStates);

      // Ensure selectedStates is an object before proceeding
      if (typeof selectedStates !== "object" || selectedStates === null) {
        console.error("selectedStates is not a valid object:", selectedStates);
        return;
      }
    }
  }, [selectedStates, RSN]); // Re-run when selectedFields or RSN change

  return (
    <div>
      <h2>Color Matching</h2>
      <p>RSN: {RSN}</p> {/* Display RSN for reference */}
      <p>Selected Panels: {JSON.stringify(selectedStates)}</p>{" "}
      {/* Optionally, display selected fields */}
      {/* Color Match Buttons */}
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
            <button type="button" onClick={() => openColorMatchForm(index)}>
              Open Color Match Form
            </button>
          </div>
        ))}
      </div>
      {/* Dynamic Form for Color Match */}
      {activeColorMatchIndices.map((index) => (
        <div key={index}>
          <h3>Color Match {index + 1} Form</h3>
          <form onSubmit={handleSubmit}>
            <table border="1">
              <thead>
                <tr>
                  <th>Field</th>
                  {Array.from({ length: 16 }, (_, index) => (
                    <th key={index}>Col {index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedStates)
                  .filter(([key, value]) => value === true) // Filter only the fields where value is true
                  .map(([fieldKey, fieldValue], rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{fieldKey}</td>{" "}
                      {/* Display field key as row header */}
                      {Array.from({ length: 16 }, (_, colIndex) => (
                        <td key={colIndex}>
                          <input
                            type="text"
                            value={
                              formData[rowIndex]
                                ? formData[rowIndex][colIndex]
                                : ""
                            }
                            onChange={(e) =>
                              handleFormDataChange(rowIndex, colIndex, e)
                            }
                            required
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>

            <button type="submit">Submit</button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default ColorMatchingForm;
