import React, { useState, useEffect } from "react";
import axios from "axios";

const YarnStockDetails = () => {
  const [yarnStockDetails, setYarnStockDetails] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>Loading Yarn Details...</p>;
  }

  if (error) {
    return <p>Error fetching yarn details: {error}</p>;
  }

  return (
    <div>
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
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(yarnStockDetails) &&
              yarnStockDetails.map((yarn) => (
                <tr key={`${yarn.YarnId}-${yarn.Date}-${yarn.SupplierName}`}>
                  <td>{formatDate(yarn.Date)}</td>
                  <td>{yarn.YarnID}</td>
                  <td>{yarn.SupplierName}</td>
                  <td>{yarn.SupplierCity}</td>
                  <td>{yarn.Weight}</td>
                  <td>{yarn.Amount}</td>
                </tr>
              ))}
            {!Array.isArray(yarnStockDetails) && <p>Not an Array</p>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YarnStockDetails;
