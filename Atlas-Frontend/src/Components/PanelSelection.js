import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PanelSelection = () => {
  const [selectedFields, setSelectedFields] = useState({
    FrontRight: false,
    FrontLeft: false,
    FrontComplete: false,
    BackRight: false,
    BackLeft: false,
    BackComplete: false,
    SleeveRight: false,
    SleeveLeft: false,
    BothSleeves: false,
    Tape: false,
    Collar: false,
    Kharcha1: false,
    Kharcha2: false,
    Kharcha3: false,
  });

  const navigate = useNavigate();
  const location = useLocation();  // Use location hook to get passed state

  // Access RSN from state
  const RSN = location.state ? location.state.RSN : null; // Check if RSN exists in state

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFields((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleNext = () => {
    // Navigate to AddKnittingDetailsForm with RSN and selected fields
    navigate(`/add-knitting-details/${RSN}`, {
      state: { RSN, selectedFields },  // Pass both RSN and selectedFields in state
    });
  };

  return (
    <div>
      <h1>Panel Selection</h1>
        {RSN && <p>RSN: {RSN}</p>}
      <div>
        {/* Render checkboxes dynamically based on state */}
        {Object.keys(selectedFields).map((field) => (
          <div key={field}>
            <label>
              <input
                type="checkbox"
                name={field}
                checked={selectedFields[field]}
                onChange={handleChange}
              />
              {field}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default PanelSelection;
