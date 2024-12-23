import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 

const SampleActions = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const RSN = location.state ? location.state.RSN : null;

  const [selectedOption, setSelectedOption] = useState(null);

  // Handler for when an option is selected
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    
    // Based on the option selected, navigate to a different route or perform actions
    switch (option) {
      case "allocate":
        navigate(`/allocate-article/${RSN}`, { state: { RSN }});
        break;
      case "update":
        navigate(`/update-sample/${RSN}`, { state: { RSN }});
        break;
      case "delete":
        navigate(`/delete-sample/${RSN}`, { state: { RSN }});
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Please select an action</h1>
      <div>
        <button onClick={() => handleOptionSelect("allocate")}>Allocate Article Number</button>
        <button onClick={() => handleOptionSelect("update")}>Update Sample Details</button>
        <button onClick={() => handleOptionSelect("delete")}>Delete Sample Details</button>
      </div>

      {selectedOption && (
        <div>
          <h2>You selected: {selectedOption}</h2>
        </div>
      )}
    </div>
  );
};

export default SampleActions;
