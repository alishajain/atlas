import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom

const WelcomeSample = () => {
  const navigate = useNavigate(); // Initialize useNavigate for routing

  // Function to handle navigation to '/add-sample'
  const handleAddSample = () => {
    navigate("/add-sample");
  };

  // Function to handle navigation to '/get-RSN'
  const handleShowSample = () => {
    navigate("/get-RSN");
  };

  return (
    <div className="welcome-container">
      <h1>Welcome to Sample Details Form</h1>
      <div className="button-group">
        <button onClick={handleShowSample}>
          Show Sample Details
        </button>
        <button onClick={handleAddSample}>
          Add New Sample Record
        </button>
      </div>
    </div>
  );
};

export default WelcomeSample;
