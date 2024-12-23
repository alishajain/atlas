import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  const location = useLocation();

  const RSN = location.state ? location.state.RSN : null;
  const action = location.state ? location.state.action : null;

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFields((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleNext = () => {
    if (!RSN || !action) {
      console.error("RSN or action is missing");
      return;
    }

    const navigateTo =
      action === "Add"
        ? `/add-knitting-details/${RSN}`
        : `/update-knitting/${RSN}`;

    navigate(navigateTo, {
      state: { RSN, selectedFields }, // Pass both RSN and selectedFields in state
    });
  };

  return (
    <div>
      <h1>Panel Selection</h1>
      {RSN && <p>RSN: {RSN}</p>}
      <div>
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
