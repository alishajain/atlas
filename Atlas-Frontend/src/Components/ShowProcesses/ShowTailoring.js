import React, { useState, useEffect } from "react";
import { getTailoringByRSN } from "../../API/TailoringApi";

const ShowTailoring = ({ RSN }) => {
  const [tailoringData, setTailoringData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tailoring data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchTailoringData = async () => {
      try {
        const response = await getTailoringByRSN(RSN);
        setTailoringData(response.data);
      } catch (error) {
        setError("Failed to fetch tailoring data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchTailoringData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the tailoring data is available
  if (!tailoringData) {
    return <p>No tailoring data available.</p>;
  }

  return (
    <div>
      <h3>Fetched Tailoring Data</h3>
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
            <td>{tailoringData.RSN}</td>
            <td>{tailoringData.EmpID}</td>
            <td>{tailoringData.YarnId}</td>
            <td>{tailoringData.Quantity}</td>
            <td>{tailoringData.Cost}</td>
            <td>{tailoringData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowTailoring;
