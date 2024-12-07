import React, { useState } from "react";
import "../Styles/WelcomeSample.css";
import ShowSamples from "./ShowSamples";
import UpdateSample from "./UpdateSample";
import AddSample from "./AddSample";

const WelcomeSample = () => {
  const [selectedComponent, setSelectedComponent] = useState("");

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "ShowAll":
        return <ShowSamples />;
      case "NewRecord":
        return <AddSample />;
      case "UpdateRecord":
        return <UpdateSample />;
      default:
        return <p>Please select the activity you want to perform.</p>;
    }
  };

  if (selectedComponent) {
    return <div className="welcome-container">{renderComponent()}</div>;
  }

  return (
    <div className="welcome-container">
      <h1>Welcome to Sample Details Form</h1>
      <div className="button-group">
        <button onClick={() => handleButtonClick("ShowAll")}>
          Show All Sample Details
        </button>
        <button onClick={() => handleButtonClick("NewRecord")}>
          Add New Sample Record
        </button>
        <button onClick={() => handleButtonClick("UpdateRecord")}>
          Update Existing Sample Record
        </button>
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
};

export default WelcomeSample;
