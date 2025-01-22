import React, { useState, useEffect } from "react";
import { getCuttingByRSN } from "../../API/CuttingApi";

const ShowCutting = ({ RSN }) => {
  const [cuttingData, setCuttingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cutting data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchCuttingData = async () => {
      try {
        const response = await getCuttingByRSN(RSN);
        setCuttingData(response.data);
      } catch (error) {
        setError("Failed to fetch cutting data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchCuttingData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the cutting data is available
  if (!cuttingData) {
    return <p>No cutting data available.</p>;
  }

  return (
    <div>
      <h3>Fetched Cutting Data</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>RSN</th>
            <th>EmpID</th>
            <th>Cost</th>
            <th>UserId</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cuttingData.RSN}</td>
            <td>{cuttingData.EmpID}</td>
            <td>{cuttingData.Cost}</td>
            <td>{cuttingData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowCutting;
