import React, { useState, useEffect } from "react";
import { getKnittingDetailsByRSN } from "../API/SampleApi";

const ShowKnittingDetails = ({ RSN }) => {
  const [knittingData, setKnittingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (RSN) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await getKnittingDetailsByRSN(RSN);
          setKnittingData(response.data); // Assuming the response contains an array of knitting details
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
    // Check if value is an object (contains Weight and Time)
    if (typeof value === "object" && value !== null) {
      return (
        (value.Weight && value.Weight !== 0) || // Weight is non-zero
        (value.Time && value.Time !== 0) // Time is non-zero
      );
    }
    // Otherwise, check if it's not 0, empty string, null, or undefined
    return value !== 0 && value !== "" && value !== null && value !== undefined;
  };

  // Filter out fields with null, zero, or empty values
  const isNonZeroData = (data) => {
    return Object.entries(data).filter(([key, value]) => isNonZero(value));
  };

  return (
    <div>
      <h1>Knitting Details</h1>
      {knittingData && knittingData.length > 0 ? (
        knittingData.map((data, index) => {
          const nonZeroData = isNonZeroData(data);
          return (
            <div key={index} style={{ marginBottom: "30px" }}>
              <h2>Knitting Details for Record {index + 1}</h2>
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
                      // If the value is an object (i.e., contains Weight and Time)
                      if (typeof value === "object" && value !== null) {
                        return (
                          <tr key={key}>
                            <td>{key}</td>
                            <td>{value.Weight || "N/A"}</td>
                            <td>{value.Time || "N/A"}</td>
                          </tr>
                        );
                      }
                      // For non-object values (if the value is just a number, string, etc.)
                      return (
                        <tr key={key}>
                          <td>{key}</td>
                          <td colSpan="2">{value}</td> {/* Render non-object values */}
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
    </div>
  );
};

export default ShowKnittingDetails;
