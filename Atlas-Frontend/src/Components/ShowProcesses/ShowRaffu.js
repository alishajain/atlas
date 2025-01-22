import React, { useState, useEffect } from "react";
import { getRaffuByRSN } from "../../API/RaffuApi";

const ShowRaffu = ({ RSN }) => {
  const [raffuData, setRaffuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch raffu data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchRaffuData = async () => {
      try {
        const response = await getRaffuByRSN(RSN);
        setRaffuData(response.data);
      } catch (error) {
        setError("Failed to fetch raffu data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchRaffuData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the raffu data is available
  if (!raffuData) {
    return <p>No raffu data available.</p>;
  }

  return (
    <div>
      <h3>Fetched Raffu Data</h3>
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
            <td>{raffuData.RSN}</td>
            <td>{raffuData.EmpID}</td>
            <td>{raffuData.YarnId}</td>
            <td>{raffuData.Quantity}</td>
            <td>{raffuData.Cost}</td>
            <td>{raffuData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowRaffu;
