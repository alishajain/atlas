import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { addColorMatching } from "../API/ColorApi"; // Assuming colorApi.js is in the 'API' folder

const ColorMatching = () => {
  const location = useLocation();
  const RSN = 10; // You can get this from the location or hardcode it for now
  const selectedStates = {
    FrontRight: false,
    FrontLeft: false,
    FrontComplete: true,
    Tape: true,
    kharcha1: false,
    Kharcha2: true,
  };

  const [numColors, setNumColors] = useState(0); // Number of color matches
  const [colorMatches, setColorMatches] = useState([]); // Color match names entered by user
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // To handle loading state
  const [success, setSuccess] = useState(""); // To store success message

  // Function to generate ColorId based on RSN, first and last letters of color matches, and selected panels
  const generateColorIds = () => {
    // Step 1: Validate if colorMatches is populated
    if (
      colorMatches.length === 0 ||
      colorMatches.some((name) => name.trim() === "")
    ) {
      setError("All color match fields must be filled.");
      console.log("Color match validation failed.");
      return []; // Return an empty array if validation fails
    }

    // Step 2: Get the first and last letters of each ColorMatching
    const colorMatchLetters = colorMatches
      .map((name) => {
        if (name.trim() !== "") {
          return name[0].toUpperCase() + name[name.length - 1].toUpperCase();
        }
        return ""; // If the name is empty or not valid, return an empty string
      })
      .filter((name) => name !== ""); // Filter out any invalid empty strings

    if (colorMatchLetters.length === 0) {
      setError("All color match fields must be filled correctly.");
      console.log("No valid color match letters found.");
      return []; // Return empty array if no valid color match letters
    }

    // Step 3: Get panels that are true and match the regex (case-insensitive)
    const selectedUppercasePanels = Object.entries(selectedStates)
      .filter(([key, value]) => value === true) // Filter selected states where value is true
      .map(([key]) => key) // Extract the keys (panel names)
      .filter((key) => /^[a-zA-Z0-9]+$/.test(key)); // Allow both uppercase and lowercase letters and numerals

    console.log("Selected panels after validation:", selectedUppercasePanels);

    if (selectedUppercasePanels.length === 0) {
      setError("No valid panels selected.");
      console.log("No valid panels selected.");
      return []; // Return empty array if no valid panels are selected
    }

    // Step 4: Generate a ColorID for each combination of color match and panel
    const colorIds = [];

    colorMatchLetters.forEach((colorLetter) => {
      selectedUppercasePanels.forEach((panel) => {
        const colorId = `${RSN}${colorLetter}${panel}`;
        colorIds.push(colorId); // Store the unique ColorID for each combination
        console.log(`Generated ColorID: ${colorId}`); // Log each generated ColorID for debugging
      });
    });

    // Log all generated ColorIDs for checking
    console.log("Generated Color IDs:", colorIds);

    return colorIds; // Return an array of all generated ColorIDs
  };

  // Handle number of color matches input change
  const handleNumColorsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumColors(num);
    setColorMatches(Array(num).fill("")); // Reset color matches array based on number of matches
  };

  // Handle the input change for each color match
  const handleColorMatchChange = (index, e) => {
    const newColorMatches = [...colorMatches];
    newColorMatches[index] = e.target.value;
    setColorMatches(newColorMatches);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate all possible ColorIDs
    const colorIds = generateColorIds();

    // If no ColorIDs are generated, exit early
    if (colorIds.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success message

    try {
      // Create an array to store the API call promises
      const apiCalls = [];

      // Loop through each ColorID and create API calls
      colorIds.forEach((colorId) => {
        const [colorMatch, panel] = colorId.slice(2).split(/(?=[A-Z])/); // Extract the color and panel
        const colorData = {
          ColorID: colorId,
          RSN: RSN,
          ColorMatching: colorMatch,
          Panel: panel,
        };

        // Log the data before making the API call
        console.log("API call data:", colorData);

        // Push API call promises into the array
        apiCalls.push(addColorMatching(colorData));
      });

      // Wait for all API calls to finish
      const responses = await Promise.all(apiCalls);

      // Log and handle the success responses
      console.log("Color matching added:", responses);
      setSuccess("Color matching added successfully!");

      // Reset the form after successful submission
      setNumColors(0);
      setColorMatches([]);
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
              value={colorMatches[index] || ""}
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
    </div>
  );
};

export default ColorMatching;
