import React, { useState, useEffect } from "react";
import { getSewingByRSN } from "../../API/SewingApi";

const ShowSewing = ({ RSN }) => {
  const [sewingData, setSewingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sewing data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchSewingData = async () => {
      try {
        const response = await getSewingByRSN(RSN);
        setSewingData(response.data);
      } catch (error) {
        setError("Failed to fetch sewing data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchSewingData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the sewing data is available
  if (!sewingData) {
    return <p>No sewing data available.</p>;
  }

  return (
    <div>
      <h3>Fetched Sewing Data</h3>
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
            <td>{sewingData.RSN}</td>
            <td>{sewingData.EmpID}</td>
            <td>{sewingData.YarnId}</td>
            <td>{sewingData.Quantity}</td>
            <td>{sewingData.Cost}</td>
            <td>{sewingData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowSewing;
