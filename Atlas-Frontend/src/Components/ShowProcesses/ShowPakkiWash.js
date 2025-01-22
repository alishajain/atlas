import React, { useState, useEffect } from "react";
import { getPakkiWashByRSN } from "../../API/PakkiWashApi";

const ShowPakkiWash = ({ RSN }) => {
  const [pakkiwashData, setPakkiWashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pakkiwash data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchPakkiWashData = async () => {
      try {
        const response = await getPakkiWashByRSN(RSN);
        setPakkiWashData(response.data);
      } catch (error) {
        setError("Failed to fetch pakkiwash data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchPakkiWashData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the pakkiwash data is available
  if (!pakkiwashData) {
    return <p>No pakkiwash data available.</p>;
  }

  return (
    <div>
      <h3>Fetched PakkiWash Data</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>RSN</th>
            <th>EmpID</th>
            <th>Chemical</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>UserId</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{pakkiwashData.RSN}</td>
            <td>{pakkiwashData.EmpID}</td>
            <td>{pakkiwashData.Chemical}</td>
            <td>{pakkiwashData.Quantity}</td>
            <td>{pakkiwashData.Cost}</td>
            <td>{pakkiwashData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowPakkiWash;
