import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getColorMatchingByRSN } from "../API/ColorApi";
import { getColorDetailByColorId } from "../API/ColorDetailApi";

// Utility function to check for non-null, non-zero values
const isValidValue = (value) => {
  return value !== null && value !== "" && value !== 0;
};

const ShowColor = () => {
  //const navigate = useNavigate();
  const location = useLocation();

  const RSN = location.state ? location.state.RSN : null;

  const [colorMatchingData, setColorMatchingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [colorDetails, setColorDetails] = useState({});

  useEffect(() => {
    const fetchColorMatchingData = async () => {
      setLoading(true);
      try {
        const response = await getColorMatchingByRSN(RSN);
        setColorMatchingData(response.data); // Store color matching data
      } catch (err) {
        setError("Failed to fetch color matching details.");
      } finally {
        setLoading(false);
      }
    };

    if (RSN) {
      fetchColorMatchingData();
    }
  }, [RSN]);

  const fetchColorDetail = async (ColorId) => {
    if (!colorDetails[ColorId]) {
      // If not already fetched
      try {
        const response = await getColorDetailByColorId(ColorId);
        setColorDetails((prevDetails) => ({
          ...prevDetails,
          [ColorId]: response,
        }));
      } catch (err) {
        console.error("Failed to fetch color detail for", ColorId);
      }
    }
  };

  if (loading) return <p>Loading color matching data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Group color matching data by MatchingName
  const groupedData = colorMatchingData?.reduce((acc, item) => {
    const { MatchingName } = item;
    if (!acc[MatchingName]) {
      acc[MatchingName] = [];
    }
    acc[MatchingName].push(item);
    return acc;
  }, {});

  // Function to check and extract valid color details for each ColorId
  const renderColorDetail = (ColorId) => {
    const details = colorDetails[ColorId]?.[0]; // Assuming the data is an array and we take the first element
    if (details) {
      const colorKeys = [
        "BaseColor",
        "Color1",
        "Color2",
        "Color3",
        "Color4",
        "Color5",
        "Color6",
        "Color7",
        "Color8",
        "Color9",
        "Color10",
        "Color11",
        "Color12",
        "Color13",
        "Color14",
      ];

      // Filter out invalid values
      const validColorKeys = colorKeys.filter((colorKey) => {
        const colorData = details[colorKey];
        return (
          colorData &&
          isValidValue(colorData.Name) &&
          isValidValue(colorData.Weight)
        );
      });

      // Extract 'Name' and 'Weight' for valid color fields
      const names = validColorKeys.map((colorKey) => details[colorKey].Name);
      const weights = validColorKeys.map(
        (colorKey) => details[colorKey].Weight
      );

      return (
        <td>
          {validColorKeys.length > 0 ? (
            <table border="1" style={{ width: "100%", marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>Property</th>
                  {validColorKeys.map((colorKey, index) => (
                    <th key={index}>{colorKey}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  {names.map((name, index) => (
                    <td key={index}>{name}</td>
                  ))}
                </tr>
                <tr>
                  <td>Weight</td>
                  {weights.map((weight, index) => (
                    <td key={index}>{weight}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No color details available for this ColorId.</p>
          )}
        </td>
      );
    }
    return <td>Loading...</td>;
  };

  return (
    <div>
      <h1>Color Matching Details for RSN: {RSN}</h1>
      {groupedData ? (
        Object.keys(groupedData).map((matchingName, index) => (
          <div key={index}>
            <h2>Matching name: {matchingName}</h2>
            <table border="1" style={{ width: "100%", marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>ColorId</th>
                  <th>Panel</th>
                  <th>Color Details</th> {/* Column for color details */}
                </tr>
              </thead>
              <tbody>
                {groupedData[matchingName].map((item, itemIndex) => {
                  fetchColorDetail(item.ColorId); // Fetch color details if not already done
                  return (
                    <tr key={itemIndex}>
                      <td>{item.ColorId}</td>
                      <td>{item.Panel}</td>
                      {renderColorDetail(item.ColorId)}{" "}
                      {/* Render color details in the same row */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No color matching details available for this RSN.</p>
      )}
    </div>
  );
};

export default ShowColor;
