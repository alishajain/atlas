import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addColorMatching } from "../API/ColorApi";
import AddColorDetails from "./AddColorDetails";
import AddSample from '../Pages/AddSample';

const AddColorMatching = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate function
  const selectedStates = location.state?.selectedStates || {};
  const RSN = location.state?.RSN || "";
  const size = location.state?.size;

  const [numColors, setNumColors] = useState(0);
  const [matchingName, setMatchingName] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [showColorDetails, setShowColorDetails] = useState(false); // State to control when AddColorDetails is shown

  // Handle number of color matches input change
  const handleNumColorsChange = (e) => {
    const num = e.target.value;

    // If input is empty, reset error
    if (num === "") {
      setError("");
    }

    // Allow only numbers greater than 0
    if (num && num > 0) {
      setError(""); // Clear error if the number is valid
      setNumColors(num);
      setMatchingName(Array(num).fill("")); // Reset color matches array based on number of matches
    } else {
      setNumColors(num);
    }
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

    // Validate that the number of color matches is greater than 0
    if (numColors <= 0) {
      setError("Number of color matches must be greater than 0.");
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
              )}${RSN}${colorName[0].toUpperCase()}${colorName[1].toUpperCase()}${colorName[colorName.length - 1].toUpperCase()}`,
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

  // Function to handle "Next" button click - Navigate to /add-new-sample
  const handleNextClick = () => {
    navigate("/add-sample"); // Navigate to the AddNewSample component
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

        {/* Display error if the number of colors is not valid */}
        {error && <p style={{ color: "red" }}>{error}</p>}

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

      {/* Display success message */}
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

      {/* Next button - visible only after color matchings are added successfully */}
      {success && (
        <button onClick={handleNextClick} style={{ marginTop: "20px" }}>
          Next
        </button>
      )}
    </div>
  );
};

export default AddColorMatching;
