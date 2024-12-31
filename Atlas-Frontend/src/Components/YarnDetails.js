import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const YarnDetails = () => {
  const [yarnDetails, setYarnDetails] = useState([]);  // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/YarnDetails")
      .then((response) => {
        if (Array.isArray(response.data.data)) { // Ensure the response is an array
          setYarnDetails(response.data.data);
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleBack = () => {
    navigate("/yarn"); // Navigate to the /yarn route
  };

  if (loading) {
    return <p>Loading Yarn Details...</p>;
  }

  if (error) {
    return <p>Error fetching Yarn details: {error}</p>;
  }

  return (
    <div>
      <h1>Yarn Details</h1>
      <table>
        <thead>
          <tr>
            <th>YarnID</th>
            <th>Yarn Type</th>
            <th>Yarn Count</th>
            <th>Color Name</th>
            <th>Color Code</th>
            <th>Weight (in Kgs)</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(yarnDetails) && yarnDetails.map((yarn) => (
            <tr key={yarn.YarnID}>
              <td>{yarn.YarnID}</td>
              <td>{yarn.YarnType}</td>
              <td>{yarn.YarnCount}</td>
              <td>{yarn.ColorName}</td>
              <td>{yarn.ColorCode}</td>
              <td>{yarn.Weight}</td>
            </tr>
          ))}
          {!Array.isArray(yarnDetails) && <p>Not an Array</p>}
        </tbody>
      </table>

      {/* Button to navigate to /yarn */}
      <div>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default YarnDetails;
