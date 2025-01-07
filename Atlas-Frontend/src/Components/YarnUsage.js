import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getColorIds, getMatchingNameByRSN } from "../API/ColorApi";
import { getColorDetailByColorId } from "../API/ColorDetailApi";

const YarnUsage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const RSN = location.state ? location.state.RSN : null;

  const RSN = 69;
  // State to hold matching names, color IDs, and color details
  const [matchingNames, setMatchingNames] = useState([]);
  const [colorDetails, setColorDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!RSN) return;

      try {
        // Step 1: Get matching names by RSN
        const matchingNamesResponse = await getMatchingNameByRSN(RSN);
        setMatchingNames(matchingNamesResponse.data);

        // Step 2: For each matching name, get color IDs
        const fetchColorDetails = async () => {
          const details = {};

          for (const matchingName of matchingNamesResponse.data) {
            const colorIdsResponse = await getColorIds(RSN, matchingName.MatchingName);

            // Step 3: For each color ID, get color details
            const colorDetailPromises = colorIdsResponse.data.map(async (color) => {
              const colorDetail = await getColorDetailByColorId(color.ColorId);
              return colorDetail.data;
            });

            // Wait for all color details to be fetched for the current matching name
            const colorDetailsData = await Promise.all(colorDetailPromises);
            details[matchingName.MatchingName] = colorDetailsData;
          }

          setColorDetails(details); // Store the grouped color details
        };

        fetchColorDetails(); // Call to fetch color details
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, [RSN]);

  return (
    <div>
      <h1>Yarn Usage Details</h1>
      {/* Display the color details grouped by matching name */}
      {Object.keys(colorDetails).length > 0 ? (
        Object.entries(colorDetails).map(([matchingName, colors]) => (
          <div key={matchingName}>
            <h2>{matchingName}</h2>
            <ul>
              {colors.map((colorDetail, index) => (
                <li key={index}>
                  <h3>Color ID: {colorDetail.ColorId}</h3>
                  {/* Display other color details here as needed */}
                  <p>Color Name: {colorDetail.ColorName}</p>
                  {/* Add any other details you want to display */}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading yarn usage data...</p>
      )}
    </div>
  );
};

export default YarnUsage;
