import React, { useState } from "react";

const RSNInput = ({ onSubmit }) => {
  const [RSN, setRSN] = useState("");

  const handleRSNSubmit = (e) => {
    e.preventDefault();
    if (RSN.trim() === "") {
      alert("Please enter a valid RSN");
      return;
    }
    onSubmit(RSN); // Pass RSN to the parent component
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
      </form>
    </div>
  );
};

export default RSNInput;
