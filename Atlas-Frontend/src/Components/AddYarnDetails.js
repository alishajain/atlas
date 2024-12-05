import React, { useState } from "react";
import { addYarnDetails } from "../API/YarnApi";

const AddYarnDetails = () => {
  const [yarnId, setYarnId] = useState("");
  const [yarnType, setYarnType] = useState("");
  const [yarnCount, setYarnCount] = useState("");
  const [colorName, setColorName] = useState("");
  const [ColorCode, setColorCode] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to create the Yarn ID based on the fields
  const createYarnId = () => {
    const createdId = (
      yarnType.charAt(0) +
      yarnCount.slice(-2) +
      colorName.charAt(0) +
      colorName.charAt(colorName.length - 1) +
      ColorCode
    ).toUpperCase();
    setYarnId(createdId);
  };

  // Create the yarnId before sending the data
  const yarnIdHandler = () => {
    createYarnId();
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    if (!yarnType || !yarnCount || !colorName || !ColorCode) {
      setMessage("Please fill in all fields.");
      return;
    }

    // Prepare the data object for the API call
    const yarnData = {
      YarnId: yarnId,        // Use the yarnId created by the function
      YarnType: yarnType,
      YarnCount: yarnCount,
      ColorName: colorName,
      ColorCode: ColorCode,
    };

    setLoading(true);
    try {
      const response = await addYarnDetails(yarnData);
      setMessage(response.success ? "Yarn details added successfully!" : "Failed to add yarn details.");
      console.log(response);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Yarn Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Yarn Type:</label>
          <input
            type="text"
            value={yarnType}
            onChange={(e) => setYarnType(e.target.value)}
          />
        </div>
        <div>
          <label>Yarn Count:</label>
          <input
            type="text"
            value={yarnCount}
            onChange={(e) => setYarnCount(e.target.value)}
          />
        </div>
        <div>
          <label>Color Name:</label>
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
          />
        </div>
        <div>
          <label>Color Code:</label>
          <input
            type="text"
            value={ColorCode}
            onChange={(e) => setColorCode(e.target.value)}
          />
        </div>
        <button onClick={yarnIdHandler}>Generate Yarn ID and Submit</button>
        <div>
            <label>YarnID: </label>
            <label>{yarnId}</label>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddYarnDetails;
