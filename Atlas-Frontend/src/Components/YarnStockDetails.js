import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const YarnStockDetails = () => {
  const [yarnStockDetails, setYarnStockDetails] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigate function

  // Function to format the date to a readable format
  const formatDate = (date) => {
    const jsDate = new Date(date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return jsDate.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/YarnStock")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          // Ensure the response is an array
          setYarnStockDetails(response.data.data);
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
    return <p>Loading Yarn Stock Details...</p>;
  }

  if (error) {
    return <p>Error fetching yarn stock details: {error}</p>;
  }

  return (
    <div>
      <h1>Yarn Inventory Details</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>YarnID</th>
            <th>Supplier Name</th>
            <th>Supplier City</th>
            <th>Weight (in Kgs)</th>
            <th>Cost</th>
            <th>Bill Number</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(yarnStockDetails) &&
            yarnStockDetails.map((yarn) => (
              <tr key={`${yarn.YarnId}-${yarn.BillNo}`}>
                <td>{formatDate(yarn.Date)}</td>
                <td>{yarn.YarnID}</td>
                <td>{yarn.SupplierName}</td>
                <td>{yarn.SupplierCity}</td>
                <td>{yarn.Weight}</td>
                <td>{yarn.Amount}</td>
                <td>{yarn.BillNO}</td>
              </tr>
            ))}
          {!Array.isArray(yarnStockDetails) && <p>Not an Array</p>}
        </tbody>
      </table>

      {/* Button to navigate to /yarn */}
      <div>
        <button onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default YarnStockDetails;
