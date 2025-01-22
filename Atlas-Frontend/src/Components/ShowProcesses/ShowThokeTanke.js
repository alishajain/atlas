import React, { useState, useEffect } from "react";
import { getThokeTankeByRSN } from "../../API/ThokeTankeApi";

const ShowThokeTanke = ({ RSN }) => {
  const [thoketankeData, setThokeTankeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch thoketanke data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchThokeTankeData = async () => {
      try {
        const response = await getThokeTankeByRSN(RSN);
        setThokeTankeData(response.data);
      } catch (error) {
        setError("Failed to fetch thoketanke data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchThokeTankeData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the thoketanke data is available
  if (!thoketankeData) {
    return <p>No thoketanke data available.</p>;
  }

  return (
    <div>
      <h3>Fetched ThokeTanke Data</h3>
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
            <td>{thoketankeData.RSN}</td>
            <td>{thoketankeData.EmpID}</td>
            <td>{thoketankeData.YarnId}</td>
            <td>{thoketankeData.Quantity}</td>
            <td>{thoketankeData.Cost}</td>
            <td>{thoketankeData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowThokeTanke;
