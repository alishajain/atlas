import React, { useState, useEffect } from "react";
import { getKachiWashByRSN } from "../../API/KachiWashApi";

const ShowKachiWash = ({ RSN }) => {
  const [kachiwashData, setKachiWashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch kachiwash data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchKachiWashData = async () => {
      try {
        const response = await getKachiWashByRSN(RSN);
        setKachiWashData(response.data);
      } catch (error) {
        setError("Failed to fetch kachiwash data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchKachiWashData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the kachiwash data is available
  if (!kachiwashData) {
    return <p>No kachiwash data available.</p>;
  }

  return (
    <div>
      <h3>Fetched KachiWash Data</h3>
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
            <td>{kachiwashData.RSN}</td>
            <td>{kachiwashData.EmpID}</td>
            <td>{kachiwashData.Chemical}</td>
            <td>{kachiwashData.Quantity}</td>
            <td>{kachiwashData.Cost}</td>
            <td>{kachiwashData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowKachiWash;
