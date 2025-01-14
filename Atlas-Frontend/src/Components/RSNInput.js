import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RSNInput = ({ onSubmit }) => {
  const [RSN, setRSN] = useState("");
  const navigate = useNavigate();

  const handleRSNSubmit = (e) => {
    e.preventDefault();
    if (RSN.trim() === "") {
      alert("Please enter a valid RSN");
      return;
    }
    navigate(`/show-sample/${RSN}`, { state: { RSN: RSN } });
  };

  const handleBackButton = () => {
    navigate("/welcome-sample");
  };

  return (
    <div>
      <h1>Enter RSN</h1>
      <form onSubmit={handleRSNSubmit}>
        <div>
          <label htmlFor="RSN">Enter RSN:</label>
          <input
            type="text"
            id="RSN"
            value={RSN}
            onChange={(e) => setRSN(e.target.value)}
            placeholder="Enter RSN to fetch details"
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleBackButton}>
          Back
        </button>
      </form>
    </div>
  );
};

export default RSNInput;
