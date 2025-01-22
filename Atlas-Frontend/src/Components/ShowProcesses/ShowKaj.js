import React, { useState, useEffect } from "react";
import { getKajByRSN } from "../../API/KajApi";

const ShowKaj = ({ RSN }) => {
  const [kajData, setKajData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch kaj data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchKajData = async () => {
      try {
        const response = await getKajByRSN(RSN);
        setKajData(response.data);
      } catch (error) {
        setError("Failed to fetch kaj data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchKajData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the kaj data is available
  if (!kajData) {
    return <p>No kaj data available.</p>;
  }

  return (
    <div>
      <h3>Fetched Kaj Data</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>RSN</th>
            <th>EmpID</th>
            <th>YarnId</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>UserId</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{kajData.RSN}</td>
            <td>{kajData.EmpID}</td>
            <td>{kajData.YarnId}</td>
            <td>{kajData.Quantity}</td>
            <td>{kajData.Cost}</td>
            <td>{kajData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowKaj;
