import React, { useState, useEffect } from "react";
import { getKachiPressByRSN } from "../../API/KachiPressApi";

const ShowKachiPress = ({ RSN }) => {
  const [kachipressData, setKachiPressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch kachipress data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchKachiPressData = async () => {
      try {
        const response = await getKachiPressByRSN(RSN);
        setKachiPressData(response.data);
      } catch (error) {
        setError("Failed to fetch kachipress data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchKachiPressData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the kachipress data is available
  if (!kachipressData) {
    return <p>No kachipress data available.</p>;
  }

  return (
    <div>
      <h3>Fetched KachiPress Data</h3>
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
            <td>{kachipressData.RSN}</td>
            <td>{kachipressData.EmpID}</td>
            <td>{kachipressData.Cost}</td>
            <td>{kachipressData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowKachiPress;
