import React, { useState, useEffect } from "react";
import { getKachianByRSN } from "../../API/KachianApi";

const ShowKachian = ({ RSN }) => {
  const [kachianData, setKachianData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch kachian data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchKachianData = async () => {
      try {
        const response = await getKachianByRSN(RSN);
        setKachianData(response.data);
      } catch (error) {
        setError("Failed to fetch kachian data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchKachianData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the kachian data is available
  if (!kachianData) {
    return <p>No kachian data available.</p>;
  }

  return (
    <div>
      <h3>Fetched Kachian Data</h3>
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
            <td>{kachianData.RSN}</td>
            <td>{kachianData.EmpID}</td>
            <td>{kachianData.YarnId}</td>
            <td>{kachianData.Quantity}</td>
            <td>{kachianData.Cost}</td>
            <td>{kachianData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowKachian;
