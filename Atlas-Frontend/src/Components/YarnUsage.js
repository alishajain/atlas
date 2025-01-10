import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getColorIds, getMatchingNameByRSN } from "../API/ColorApi";
import { getColorDetailByColorId } from "../API/ColorDetailApi";
import { addYarnUsage } from "../API/YarnUsageApi";
import { useSelector } from "react-redux";

const YarnUsage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const RSN = location.state ? location.state.RSN : null;
  const userId = useSelector((state) => state.user.userId);

  // State to hold matching names, color IDs, and color details
  const [matchingNames, setMatchingNames] = useState([]);
  const [colorDetailsByMatchingName, setColorDetailsByMatchingName] = useState({});
  const [loading, setLoading] = useState(true);
  const [yarnUsageData, setYarnUsageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!RSN) return;

      try {
        // Step 1: Get matching names by RSN
        const matchingNamesResponse = await getMatchingNameByRSN(RSN);
        setMatchingNames(matchingNamesResponse.data);

        // Step 2: For each matching name, get color IDs and fetch color details
        const fetchColorDetails = async () => {
          const colorDetailsDataByMatchingName = {};

          for (const matchingName of matchingNamesResponse.data) {
            const colorIdsResponse = await getColorIds(RSN, matchingName.MatchingName);
            console.log("Color IDs for:", matchingName.MatchingName, colorIdsResponse.data);  // Log the Color IDs for debugging

            if (colorIdsResponse?.data?.length > 0) {
              const colorDetailPromises = colorIdsResponse.data.map(async (color) => {
                if (color?.ColorId) {
                  const colorDetail = await getColorDetailByColorId(color.ColorId);
                  return colorDetail[0];
                }
                return null;
              });

              // Wait for all color details to be fetched for the current matching name
              const colorDetailsData = await Promise.all(colorDetailPromises);
              colorDetailsDataByMatchingName[matchingName.MatchingName] = colorDetailsData.filter(Boolean);
            }
          }

          setColorDetailsByMatchingName(colorDetailsDataByMatchingName);
          setLoading(false);
        };

        fetchColorDetails();
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [RSN]);

  // Helper function to get YarnId and Weight pairs for a MatchingName
  const getYarnIdWeightPairs = (colorDetails) => {
    const yarnIdWeightPairs = {};

    colorDetails.forEach((colorDetail) => {
      if (colorDetail.BaseColor && colorDetail.BaseColor.YarnId) {
        const yarnId = colorDetail.BaseColor.YarnId;
        const weight = parseFloat(colorDetail.BaseColor.Weight);
        if (yarnIdWeightPairs[yarnId]) {
          yarnIdWeightPairs[yarnId] += weight;
        } else {
          yarnIdWeightPairs[yarnId] = weight;
        }
      }

      // Check for other color fields (Color1, Color2, ..., Color14)
      for (let i = 1; i <= 14; i++) {
        const colorKey = `Color${i}`;
        if (colorDetail[colorKey] && colorDetail[colorKey].YarnId) {
          const yarnId = colorDetail[colorKey].YarnId;
          const weight = parseFloat(colorDetail[colorKey].Weight);
          if (yarnIdWeightPairs[yarnId]) {
            yarnIdWeightPairs[yarnId] += weight;
          } else {
            yarnIdWeightPairs[yarnId] = weight;
          }
        }
      }
    });

    // Convert the object to an array of YarnId, Weight pairs
    return Object.entries(yarnIdWeightPairs).map(([YarnId, Weight]) => ({
      YarnId,
      Weight,
    }));
  };

  // Function to prepare yarn usage data
  const prepareYarnUsageData = () => {
    const yarnUsageEntries = matchingNames.map((matchingName) => {
      const colorDetails = colorDetailsByMatchingName[matchingName.MatchingName];
      const yarnData = getYarnIdWeightPairs(colorDetails);

      const yarnUsage = {
        RSN,
        MatchingName: matchingName.MatchingName,
        UserId: userId,
      };

      // Dynamically add Yarn1, Yarn2, ..., Yarn15
      yarnData.forEach((entry, index) => {
        yarnUsage[`Yarn${index + 1}`] = { YarnId: entry.YarnId, Weight: entry.Weight };
      });

      // Ensure that Yarn1 is not null and others are set as null if missing
      for (let i = yarnData.length; i < 15; i++) {
        yarnUsage[`Yarn${i + 1}`] = null;
      }

      return yarnUsage;
    });

    setYarnUsageData(yarnUsageEntries);
  };

  // Insert the prepared yarn usage data
  const handleInsertData = async () => {
    try {
      // Log matching names for debugging
      console.log("Matching Names:", matchingNames);
  
      const processedMatchingNames = new Set();
  
      // Loop through each matching name and prepare yarn usage data
      for (const matchingName of matchingNames) {
        if (processedMatchingNames.has(matchingName.MatchingName)) {
          console.log(`Skipping already processed MatchingName: ${matchingName.MatchingName}`);
          continue;
        }
  
        console.log("Inserting data for:", matchingName.MatchingName);  // Log each iteration
  
        const colorDetails = colorDetailsByMatchingName[matchingName.MatchingName];
  
        // Check if there are color details for the matching name
        if (!colorDetails || colorDetails.length === 0) {
          console.log(`No color details found for ${matchingName.MatchingName}`);
          continue;
        }
  
        const yarnData = getYarnIdWeightPairs(colorDetails);
  
        const yarnUsage = {
          RSN,
          MatchingName: matchingName.MatchingName,
          UserId: userId,
        };
  
        // Add Yarn1, Yarn2, ..., Yarn15 dynamically
        yarnData.forEach((entry, index) => {
          yarnUsage[`Yarn${index + 1}`] = { YarnId: entry.YarnId, Weight: entry.Weight };
        });
  
        // Ensure that Yarn1 is not null and others are set as null if missing
        for (let i = yarnData.length; i < 15; i++) {
          yarnUsage[`Yarn${i + 1}`] = null;
        }
  
        // Log the prepared yarnUsage data
        console.log("Prepared Yarn Usage:", yarnUsage);
  
        // Call the API for each MatchingName
        const response = await addYarnUsage(yarnUsage);
  
        // Log the API response
        console.log("API Response:", response);
  
        if (response && response.data) {
          console.log(`Successfully inserted data for ${matchingName.MatchingName}`);
        } else {
          console.log(`Failed to insert data for ${matchingName.MatchingName}`);
        }
  
        // Mark this MatchingName as processed
        processedMatchingNames.add(matchingName.MatchingName);
      }
  
      alert("Yarn usage data inserted successfully.");
    } catch (error) {
      console.error("Error inserting yarn usage data:", error);
      alert("Failed to insert yarn usage data.");
    }
  };
  

  const handleNext = () => {
    navigate(`/sample-actions/${RSN}`, { state: { RSN } });
  };

  return (
    <div>
      <h1>Yarn Usage Details by Matching Name</h1>
      {loading ? (
        <p>Loading yarn usage data...</p>
      ) : Object.keys(colorDetailsByMatchingName).length > 0 ? (
        <div>
          {matchingNames.map((matchingName) => {
            const colorDetails = colorDetailsByMatchingName[matchingName.MatchingName];

            return (
              <div key={matchingName.MatchingName}>
                <h3>{matchingName.MatchingName}</h3>
                {colorDetails.length > 0 ? (
                  <table border="1">
                    <thead>
                      <tr>
                        <th>YarnId</th>
                        <th>Total Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getYarnIdWeightPairs(colorDetails).map((pair, index) => (
                        <tr key={index}>
                          <td>{pair.YarnId}</td>
                          <td>{pair.Weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No color details available for this matching name.</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p>No yarn usage data available.</p>
      )}

      <button onClick={prepareYarnUsageData}>Prepare Data</button>
      <button onClick={handleInsertData}>OK</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default YarnUsage;
