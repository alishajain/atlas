import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getKnittingDetailsByRSN } from "../API/SampleApi";

const ShowKnittingDetails = ({ RSN }) => {
  const [knittingData, setKnittingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (RSN) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getKnittingDetailsByRSN(RSN);
          setKnittingData(response.data);
        } catch (err) {
          setError("Failed to fetch knitting details.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [RSN]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Function to check for non-null, non-zero, and non-empty values
  const isNonZero = (value) => {
    if (typeof value === "object" && value !== null) {
      return (
        (value.Weight && value.Weight !== 0) ||
        (value.Time && value.Time !== 0)
      );
    }
    return value !== 0 && value !== "" && value !== null && value !== undefined;
  };

  const isNonZeroData = (data) => {
    return Object.entries(data).filter(([key, value]) => isNonZero(value));
  };

  const handleUpdateClick = () => {
    navigate(`/panel-selection/${RSN}`, {
      state: { RSN: RSN, action: "update" },
    })
  };

  return (
    <div>
      <h1>Knitting Details</h1>
      {knittingData && knittingData.length > 0 ? (
        knittingData.map((data, index) => {
          const nonZeroData = isNonZeroData(data);
          return (
            <div key={index} style={{ marginBottom: "30px" }}>
              {nonZeroData.length > 0 ? (
                <table border="1" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Weight</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nonZeroData.map(([key, value]) => {
                      if (typeof value === "object" && value !== null) {
                        return (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{value.Weight || "N/A"}</td>
                            <td>{value.Time || "N/A"}</td>
                          </tr>
                        );
                      }
                      return (
                        <tr key={key}>
                          <td>{key}</td>
                          <td colSpan="2">{value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p>No relevant data available</p>
              )}
            </div>
          );
        })
      ) : (
        <p>No knitting details available</p>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleUpdateClick}>Update Knitting Details</button>
      </div>
    </div>
  );
};

export default ShowKnittingDetails;
