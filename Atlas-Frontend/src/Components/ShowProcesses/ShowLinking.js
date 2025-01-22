import React, { useState, useEffect } from "react";
import { getLinkingByRSN } from "../../API/LinkingApi";

const ShowLinking = ({ RSN }) => {
  const [linkingData, setLinkingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch linking data when the component mounts or when RSN changes
  useEffect(() => {
    const fetchLinkingData = async () => {
      try {
        const response = await getLinkingByRSN(RSN);
        setLinkingData(response.data);
      } catch (error) {
        setError("Failed to fetch linking data");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchLinkingData();
    }
  }, [RSN]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Check if the linking data is available
  if (!linkingData) {
    return <p>No linking data available.</p>;
  }

  return (
    <div>
      <h3>Fetched Linking Data</h3>
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
            <td>{linkingData.RSN}</td>
            <td>{linkingData.EmpID}</td>
            <td>{linkingData.YarnId}</td>
            <td>{linkingData.Quantity}</td>
            <td>{linkingData.Cost}</td>
            <td>{linkingData.UserId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowLinking;
