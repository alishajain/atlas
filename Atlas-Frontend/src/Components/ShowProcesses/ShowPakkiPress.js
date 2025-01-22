import React, { useState, useEffect } from "react";
import { getPakkiPressByRSN } from "../../API/PakkiPressApi";

const ShowPakkiPress = ({ RSN }) => {
  const [pakkipressData, setPakkiPressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pakkipress data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchPakkiPressData = async () => {
      try {
        const response = await getPakkiPressByRSN(RSN);
        setPakkiPressData(response.data);
      } catch (error) {
        setError("Failed to fetch pakkipress data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchPakkiPressData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the pakkipress data is available
  if (!pakkipressData) {
    return <p>No pakkipress data available.</p>;
  }

  return (
    <div>
      <h3>Fetched PakkiPress Data</h3>
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
            <td>{pakkipressData.RSN}</td>
            <td>{pakkipressData.EmpID}</td>
            <td>{pakkipressData.Cost}</td>
            <td>{pakkipressData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowPakkiPress;
