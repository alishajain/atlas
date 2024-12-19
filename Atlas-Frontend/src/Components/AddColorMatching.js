import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addColorMatching } from "../API/ColorApi"; // Assuming colorApi.js is in the 'API' folder
import AddColorDetails from "./AddColorDetails"; // Import the AddColorDetails component

const AddColorMatching = () => {
  const location = useLocation();
  const RSN = 2;
  const selectedStates = {
    FrontRight: false,
    FrontLeft: false,
    FrontComplete: true,
    Tape: true,
    Kharcha1: true,
    Kharcha2: false,
  };
  const size = 'Xl';

  const [numColors, setNumColors] = useState(0);
  const [matchingName, setMatchingName] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showColorDetails, setShowColorDetails] = useState(false); // State to control when AddColorDetails is shown

  // Handle number of color matches input change
  const handleNumColorsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumColors(num);
    setMatchingName(Array(num).fill("")); // Reset color matches array based on number of matches
  };

  // Handle the input change for each color match
  const handleColorMatchChange = (index, e) => {
    const newColorMatches = [...matchingName];
    newColorMatches[index] = e.target.value;
    setMatchingName(newColorMatches);
  };

  // Handle form submission for Color Matching
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if matchingName is populated
    if (
      matchingName.length === 0 ||
      matchingName.some((name) => name.trim() === "")
    ) {
      setError("All color match fields must be filled.");
      return;
    }

    // Step 1: Get panels whose value is true and convert them to uppercase
    const selectedPanels = Object.entries(selectedStates)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    if (selectedPanels.length === 0) {
      setError("No valid panels selected.");
      return; // Return early if no panels are selected
    }

    setLoading(true);
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success message

    try {
      // Create an array to store the API call promises
      const apiCalls = [];

      // Loop through each matchingName and create API calls for each selected panel
      matchingName.forEach((colorName) => {
        selectedPanels.forEach((panel) => {
          // Generate ColorId
          const colorData = {
            ColorId: `${panel
              .split("")
              .reduce(
                (acc, char) => (/[A-Z0-9]/.test(char) ? acc + char : acc),
                ""
              )}${RSN}${colorName[0].toUpperCase()}${colorName[1].toUpperCase()}${colorName[
              colorName.length - 1
            ].toUpperCase()}`,
            RSN: RSN,
            MatchingName: colorName,
            Panel: panel,
          };

          // Push API call promises into the array
          apiCalls.push(addColorMatching(colorData));
        });
      });

      // Wait for all API calls to finish
      const responses = await Promise.all(apiCalls);

      setSuccess("Color matching added successfully!");

      setShowColorDetails(true);
    } catch (error) {
      setError("An error occurred while adding color matching.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Color Matching</h2>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Input for the number of color matches */}
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

        {/* Step 2: Render input fields for each color match */}
        {Array.from({ length: numColors }).map((_, index) => (
          <div key={index}>
            <label>Color Match {index + 1}:</label>
            <input
              type="text"
              value={matchingName[index] || ""}
              onChange={(e) => handleColorMatchChange(index, e)}
              required
            />
          </div>
        ))}

        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Color Matching"}
        </button>
      </form>

      {/* Display error or success messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Only show AddColorDetails numColors times if the button was clicked and data is valid */}
      {showColorDetails &&
        matchingName.map((colorName, index) => (
          <AddColorDetails
            key={index}
            matchingName={colorName} // Pass the specific color name to AddColorDetails
            RSN={RSN}
            size={size}
            selectedStates={selectedStates}
          />
        ))}
    </div>
  );
};

export default AddColorMatching;
