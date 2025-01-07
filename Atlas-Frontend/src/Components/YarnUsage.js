import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getColorIds, getMatchingNameByRSN } from "../API/ColorApi";
import { getColorDetailByColorId } from "../API/ColorDetailApi";

const YarnUsage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const RSN = 69; // You can change this to dynamically set it if needed.

  // State to hold matching names, color IDs, and color details
  const [matchingNames, setMatchingNames] = useState([]);
  const [colorDetails, setColorDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!RSN) return;

      try {
        // Step 1: Get matching names by RSN
        const matchingNamesResponse = await getMatchingNameByRSN(RSN);
        console.log("Matching Names Response: ", matchingNamesResponse.data);
        setMatchingNames(matchingNamesResponse.data);

        // Step 2: For each matching name, get color IDs and fetch color details
        const fetchColorDetails = async () => {
          const details = {};

          for (const matchingName of matchingNamesResponse.data) {
            const colorIdsResponse = await getColorIds(RSN, matchingName.MatchingName);

            // Log the colorIdsResponse to verify the data structure
            console.log(`Color IDs for ${matchingName.MatchingName}: `, colorIdsResponse.data);

            // Safeguard: Check if colorIdsResponse has data
            if (colorIdsResponse?.data?.length > 0) {
              const colorDetailPromises = colorIdsResponse.data.map(async (color) => {
                if (color?.ColorId) {
                  console.log(`Fetching color details for ColorId: ${color.ColorId}`);
                  const colorDetail = await getColorDetailByColorId(color.ColorId);
                  return colorDetail.data;
                }
                return null;
              });

              // Wait for all color details to be fetched for the current matching name
              const colorDetailsData = await Promise.all(colorDetailPromises);

              // Filter out null values in case some ColorId was missing or invalid
              details[matchingName.MatchingName] = colorDetailsData.filter((item) => item !== null);
            } else {
              details[matchingName.MatchingName] = [];
            }
          }

          setColorDetails(details); // Store the grouped color details
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

  // Display logs for debugging
  console.log("Matching Names: ", matchingNames);
  console.log("Color Details: ", colorDetails);

  return (
    <div>
      <h1>Yarn Usage Details</h1>
      {loading ? (
        <p>Loading yarn usage data...</p>
      ) : Object.keys(colorDetails).length > 0 ? (
        Object.entries(colorDetails).map(([matchingName, colors]) => (
          <div key={matchingName}>
            <h2>{matchingName}</h2>
            {colors.length > 0 ? (
              <ul>
                {colors.map((colorDetail, index) => (
                  <li key={index}>
                    <h3>Color ID: {colorDetail?.ColorId}</h3>
                    {/* Display other color details here as needed */}
                    <p>Color Name: {colorDetail?.ColorName}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No color details available for this matching name.</p>
            )}
          </div>
        ))
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default YarnUsage;
