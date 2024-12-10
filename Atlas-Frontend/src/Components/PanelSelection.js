import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFields((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleNext = () => {
    // Navigate and pass the selected fields as state
    navigate('/add-knitting-details', { state: selectedFields });
  };

  return (
    <div>
      <h1>Panel Selection</h1>
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
