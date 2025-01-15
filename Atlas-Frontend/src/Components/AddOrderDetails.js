import React, { useState, useEffect } from "react";
import { getYarnUsageByArticleNo } from "../API/YarnUsageApi";

const AddOrderDetails = ({ ArticleNo }) => {
  const [yarnUsageData, setYarnUsageData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({}); // Store quantities for matchingName and size
  const [updatedYarnUsageData, setUpdatedYarnUsageData] = useState([]); // Store updated yarn data

  useEffect(() => {
    const fetchYarnUsage = async () => {
      try {
        const response = await getYarnUsageByArticleNo(ArticleNo);
        if (response.success && response.data && response.data.length > 0) {
          setYarnUsageData(response.data);
        } else {
          setError("No data found for this ArticleNo.");
        }
      } catch (err) {
        setError("Failed to fetch yarn usage data.");
      } finally {
        setLoading(false);
      }
    };

    fetchYarnUsage();
  }, [ArticleNo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // List of all possible sizes
  const sizes = [
    "Freesize",
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
  ];

  // Function to get sizes that have non-null values across all MatchingNames
  const getAllNonNullSizes = (data) => {
    const nonNullSizes = sizes.filter((size) =>
      data.some((row) => row[size] !== null)
    );
    return nonNullSizes;
  };

  const nonNullSizes = getAllNonNullSizes(yarnUsageData);

  // Function to handle quantity input changes
  const handleQuantityChange = (matchingName, size, value) => {
    const quantity = parseInt(value) || 0;

    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [matchingName]: {
        ...prevQuantities[matchingName],
        [size]: quantity,
      },
    }));
  };

  // Function to calculate the total quantity for a MatchingName
  const calculateTotalQuantity = (matchingName) => {
    const quantitiesForMatchingName = quantities[matchingName] || {};
    const totalQuantity = nonNullSizes.reduce((total, size) => {
      return total + (quantitiesForMatchingName[size] || 0);
    }, 0);
    return totalQuantity;
  };

  // Function to get non-null yarns (YarnId and Weight)
  const getNonNullYarns = (data) => {
    const yarns = [];
    for (let i = 1; i <= 15; i++) {
      const yarnKey = `Yarn${i}`;
      if (data[yarnKey] && data[yarnKey].YarnId) {
        yarns.push({
          YarnId: data[yarnKey].YarnId,
          Weight: data[yarnKey].Weight,
        });
      }
    }
    return yarns;
  };

  // Function to calculate the updated weight based on the quantity change for a specific size
  const calculateUpdatedWeight = (originalWeight, size, matchingName) => {
    const quantity = quantities[matchingName]?.[size];
    if (!quantity) {
      return 0; // Set to 0 if quantity is not updated for the size
    }

    const row = yarnUsageData.find((row) => row.MatchingName === matchingName);
    const percentage = row ? row[size] : 0;

    const updatedWeight = originalWeight * (1 + percentage / 100) * quantity;
    return updatedWeight;
  };

  // Handle the submit button click to perform the calculation and update table 2
  const handleSubmit = () => {
    const updatedData = yarnUsageData.map((data) => {
      const yarns = getNonNullYarns(data);
      const updatedYarns = yarns.map((yarn) => {
        const updatedYarnDetails = {};
        let totalWeight = 0; // Initialize total weight for each YarnId

        nonNullSizes.forEach((size) => {
          const updatedWeight = calculateUpdatedWeight(
            yarn.Weight,
            size, // Calculate for the specific size
            data.MatchingName
          );

          updatedYarnDetails[size] = updatedWeight;
          totalWeight += updatedWeight; // Sum the weights for the total
        });

        return {
          ...yarn,
          updatedYarnDetails,
          totalWeight, // Add total weight for the YarnId
        };
      });

      return {
        ...data,
        yarns: updatedYarns,
      };
    });

    // Store the updated yarn usage data
    setUpdatedYarnUsageData(updatedData);
  };

  return (
    <div>
      <h2>
        Order Quantity Details for Article No: {ArticleNo} with RSN:{" "}
        {yarnUsageData[0]?.RSN}
      </h2>

      {/* Table for Yarn Quantity Inputs */}
      {yarnUsageData.length > 0 ? (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th>Matching Name</th>
              {nonNullSizes.map((size) => (
                <th key={size}>{size}</th>
              ))}
              <th>Total</th> {/* Add Total column */}
            </tr>
          </thead>
          <tbody>
            {yarnUsageData.map((data, dataIndex) => (
              <tr key={dataIndex}>
                <td>{data.MatchingName}</td>
                {nonNullSizes.map((size) => (
                  <td key={size}>
                    {/* Set default value of 0 for each input */}
                    <input
                      type="number"
                      value={quantities[data.MatchingName]?.[size] || 0} // Initial value is 0
                      onChange={(e) =>
                        handleQuantityChange(
                          data.MatchingName,
                          size,
                          e.target.value
                        )
                      }
                      min="0"
                    />
                  </td>
                ))}
                <td>{calculateTotalQuantity(data.MatchingName)}</td> {/* Display total quantity */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No yarn usage data found.</div>
      )}

      {/* Submit Button to trigger calculation */}
      <button onClick={handleSubmit}>Submit</button>

      {/* Table for YarnId and Weight (After Submit) */}
      {updatedYarnUsageData.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Updated Yarn Details</h2>
          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", marginTop: "20px" }}
          >
            <thead>
              <tr>
                <th>Matching Name</th>
                <th>Yarn ID</th>
                {nonNullSizes.map((size) => (
                  <th key={size}>{size}</th>
                ))}
                <th>Total</th> {/* Add Total column */}
              </tr>
            </thead>
            <tbody>
              {updatedYarnUsageData.map((data, dataIndex) => {
                return data.yarns.map((yarn, yarnIndex) => (
                  <tr key={`${dataIndex}-${yarnIndex}`}>
                    {yarnIndex === 0 && (
                      <td rowSpan={data.yarns.length}>{data.MatchingName}</td>
                    )}
                    <td>{yarn.YarnId}</td>
                    {/* Display updated weight for each size */}
                    {nonNullSizes.map((size) => (
                      <td key={`${size}-${yarnIndex}`}>
                        {yarn.updatedYarnDetails[size]
                          ? yarn.updatedYarnDetails[size].toFixed(2)
                          : "-"}
                      </td>
                    ))}
                    {/* Display Total weight */}
                    <td>{yarn.totalWeight.toFixed(2)}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddOrderDetails;
