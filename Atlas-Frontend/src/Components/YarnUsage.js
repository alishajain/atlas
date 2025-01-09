import React, { useEffect, useState } from "react";
import { getColorIds, getMatchingNameByRSN } from "../API/ColorApi";
import { getColorDetailByColorId } from "../API/ColorDetailApi";

const YarnUsage = () => {
  const RSN = 69; // You can change this to dynamically set it if needed.

  // State to hold matching names, color IDs, and color details
  const [matchingNames, setMatchingNames] = useState([]);
  const [usageByName, setUsageByName] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!RSN) return;

      try {
        // Step 1: Get matching names by RSN
        const matchingNamesResponse = await getMatchingNameByRSN(RSN);
        console.log("Matching Names Response: ", matchingNamesResponse.data); // Debugging line
        setMatchingNames(matchingNamesResponse.data);

        // Step 2: For each matching name, get color IDs and fetch color details
        const fetchColorDetails = async () => {
          const usage = {}; // This will hold total usage grouped by color Name

          for (const matchingName of matchingNamesResponse.data) {
            const colorIdsResponse = await getColorIds(RSN, matchingName.MatchingName);
            console.log("Color IDs Response: ", colorIdsResponse.data); // Debugging line

            // Safeguard: Check if colorIdsResponse has data
            if (colorIdsResponse?.data?.length > 0) {
              const colorDetailPromises = colorIdsResponse.data.map(async (color) => {
                if (color?.ColorId) {
                  const colorDetail = await getColorDetailByColorId(color.ColorId);
                  console.log(`Color Detail for ColorId ${color.ColorId}: `, colorDetail[0]); // Debugging line
                  return colorDetail[0]; // Assume colorDetail is an array and we're taking the first element
                }
                return null;
              });

              // Wait for all color details to be fetched for the current matching name
              const colorDetailsData = await Promise.all(colorDetailPromises);

              // Process each color detail and sum yarn usage grouped by Name
              colorDetailsData.forEach((colorDetail) => {
                if (colorDetail) {
                  const colorName = colorDetail.BaseColor?.Name || "Unknown Color"; // Get color name

                  if (colorDetail.YarnUsage) {
                    console.log("YarnUsage for ColorId:", colorDetail.ColorId, colorDetail.YarnUsage); // Debugging line
                    colorDetail.YarnUsage.forEach((yarn) => {
                      // Group by color Name instead of YarnId
                      if (!usage[colorName]) {
                        usage[colorName] = 0;
                      }
                      usage[colorName] += yarn.UsageAmount || 0; // Sum up yarn usage
                    });
                  }
                }
              });
            }
          }

          setUsageByName(usage); // Store the total yarn usage grouped by Name
          setLoading(false); // Set loading to false when data is fetched
        };

        fetchColorDetails(); // Call to fetch color details
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, [RSN]);

  return (
    <div>
      <h1>Yarn Usage Details</h1>
      {loading ? (
        <p>Loading yarn usage data...</p>
      ) : Object.keys(usageByName).length > 0 ? (
        <div>
          <h2>Total Yarn Usage Grouped by Color Name</h2>
          <ul>
            {Object.entries(usageByName).map(([colorName, totalUsage]) => (
              <li key={colorName}>
                <h3>Color Name: {colorName}</h3>
                <p>Total Usage: {totalUsage} units</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No yarn usage data available.</p>
      )}
    </div>
  );
};

export default YarnUsage;
