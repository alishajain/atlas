import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AddNewSample = () => {
  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle "Yes" click - navigate to root to add sample
  const handleYesClick = () => {
    navigate("/add-sample-details"); // Navigate to root where AddSampleDetails is displayed
  };

  // Function to handle "No" click - navigate to homepage
  const handleNoClick = () => {
    navigate("/"); // Navigate to home page where Homepage component is displayed
  };

  return (
    <div>
      <h2>Do you want to add a new sample?</h2>

      <div>
        <button onClick={handleYesClick}>Yes</button>
        <button onClick={handleNoClick}>No</button>
      </div>
    </div>
  );
};

export default AddNewSample;
