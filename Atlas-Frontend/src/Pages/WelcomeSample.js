import React, { useState } from "react";
import ShowSamples from "./ShowSamples";
import UpdateSample from "./UpdateSample";
import AddSample from "./AddSample";

const WelcomeSample = () => {
  const [selectedComponent, setSelectedComponent] = useState("");

  // Handle button click to set the selected component
  const handleButtonClick = (component) => {
    console.log(`Selected component: ${component}`); // Debug log to track state change
    setSelectedComponent(component);
  };

  // Function to render the selected component
  const renderComponent = () => {
    switch (selectedComponent) {
      case "ShowAll":
        return <ShowSamples />
      case "NewRecord":
        return <AddSample />
      case "UpdateRecord":
        return <UpdateSample />;
      default:
        return <p>Please select the activity you want to perform.</p>;
    }
  };

  // Only render WelcomeSample if no component has been selected yet
  if (selectedComponent) {
    return <div>{renderComponent()}</div>;
  }

  return (
    <div>
      <h1>Welcome to Sample Details Form</h1>
      {/* Buttons to change selected component */}
      <button onClick={() => handleButtonClick("ShowAll")}>
        Show All Sample Details
      </button>
      <button onClick={() => handleButtonClick("NewRecord")}>
        Add New Sample Record
      </button>
      <button onClick={() => handleButtonClick("UpdateRecord")}>
        Update Existing Sample Record
      </button>

      {/* Render the message */}
      <div>{renderComponent()}</div>
    </div>
  );
};

export default WelcomeSample;
