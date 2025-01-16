import React, { useState, useEffect } from "react";
import { getYarnUsageByArticleNo } from "../API/YarnUsageApi";
import { getOrderNo } from "../API/OrderApi";
import { addOrderDetails } from "../API/OrderDetailsApi";
import { addOrderYarn } from "../API/OrderYarnApi";
import { useSelector } from "react-redux";

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

const AddOrderDetails = ({ ArticleNo }) => {
  const userId = useSelector((state) => state.user.userId);

  const [yarnUsageData, setYarnUsageData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [updatedYarnUsageData, setUpdatedYarnUsageData] = useState([]);
  const [orderNo, setOrderNo] = useState(null);

  // Fetch Order No on component load
  useEffect(() => {
    const fetchOrderNo = async () => {
      try {
        const { OrderNo } = await getOrderNo();
        setOrderNo(OrderNo);
      } catch (err) {
        setError("Failed to fetch Order No.");
      }
    };

    fetchOrderNo();
  }, []);

  // Fetch Yarn Usage data based on ArticleNo
  useEffect(() => {
    const fetchYarnUsage = async () => {
      if (!ArticleNo) return;
      setLoading(true);
      try {
        const response = await getYarnUsageByArticleNo(ArticleNo);
        if (response.success && response.data.length > 0) {
          setYarnUsageData(response.data);
        } else {
          setError("No yarn usage data found.");
        }
      } catch (err) {
        setError("Failed to fetch yarn usage data.");
      } finally {
        setLoading(false);
      }
    };

    fetchYarnUsage();
  }, [ArticleNo]);

  const getNonNullSizes = (data) => {
    if (Array.isArray(data)) {
      return sizes.filter((size) => data.some((row) => row[size] !== null));
    }
    return sizes.filter((size) => data[size] !== null);
  };

  const handleQuantityChange = (matchingName, size, value) => {
    const quantity = parseInt(value) || 0;
    setQuantities((prev) => ({
      ...prev,
      [matchingName]: {
        ...prev[matchingName],
        [size]: quantity,
      },
    }));
  };

  const calculateTotalQuantity = (matchingName) => {
    const quantitiesForMatchingName = quantities[matchingName] || {};
    return getNonNullSizes(yarnUsageData).reduce(
      (total, size) => total + (quantitiesForMatchingName[size] || 0),
      0
    );
  };

  const getNonNullYarns = (data) => {
    return Array.from({ length: 15 }, (_, i) => {
      const yarnKey = `Yarn${i + 1}`;
      if (data[yarnKey]?.YarnId) {
        return {
          YarnId: data[yarnKey].YarnId,
          Weight: data[yarnKey].Weight,
        };
      }
      return null;
    }).filter(Boolean);
  };

  const calculateUpdatedWeight = (originalWeight, size, matchingName) => {
    const quantity = quantities[matchingName]?.[size];
    if (!quantity) return 0;

    const row = yarnUsageData.find((row) => row.MatchingName === matchingName);
    const percentage = row ? row[size] : 0;

    return originalWeight * (1 + percentage / 100) * quantity;
  };

  // This function prepares the updated yarn usage data without calling the API
  const handleSubmit = () => {
    if (!orderNo) {
      setError("Order No is not available.");
      return;
    }

    // Prepare the updated data in the required format for the API
    const updatedData = yarnUsageData.map((data) => {
      const yarns = getNonNullYarns(data);
      const updatedYarns = yarns.reduce((acc, yarn, index) => {
        const updatedYarnDetails = {};
        let totalWeight = 0;

        getNonNullSizes(data).forEach((size) => {
          const updatedWeight = calculateUpdatedWeight(
            yarn.Weight,
            size,
            data.MatchingName
          );
          updatedYarnDetails[size] = updatedWeight;
          totalWeight += updatedWeight;
        });

        acc[`Yarn${index + 1}`] = {
          YarnId: yarn.YarnId,
          Weight: totalWeight,
        };

        return acc;
      }, {});

      return {
        MatchingName: data.MatchingName,
        UserId: userId,
        OrderNo: orderNo,
        ...updatedYarns, // Dynamically adds Yarn1, Yarn2, etc. to the object
      };
    });

    setUpdatedYarnUsageData(updatedData);
  };

  const addYarnHandler = async () => {
    // Ensure updatedYarnUsageData has content
    if (updatedYarnUsageData.length === 0) {
      setError("No updated yarn usage data available.");
      return;
    }

    // Process each updated yarn usage entry and send them via the API
    try {
      for (const data of updatedYarnUsageData) {
        // Extract the yarn details dynamically
        const orderYarnData = {
          MatchingName: data.MatchingName,
          UserId: data.UserId,
          OrderNo: data.OrderNo,
          // Dynamically add Yarn fields (Yarn1, Yarn2, etc.)
          ...Object.keys(data)
            .filter((key) => key.startsWith("Yarn")) // Ensure only yarn fields are considered
            .reduce((acc, key) => {
              acc[key] = data[key];
              return acc;
            }, {}),
        };

        // Make API call to add yarn details for each MatchingName
        const response = await addOrderYarn(orderYarnData);
      }

      // If all data was processed without error
      alert("Yarn details added successfully!");
    } catch (err) {
      console.error("Failed to add yarn request:", err);
      setError("Failed to add yarn request.");
    }
  };

  const addOrderDetailsHandler = async () => {
    if (!orderNo) {
      setError("Order No is not available.");
      return;
    }

    // Iterate over each yarn usage data (each `MatchingName`)
    try {
      for (const data of yarnUsageData) {
        const matchingName = data.MatchingName;

        // Prepare the order details for each matching name
        const orderDetails = {
          OrderNo: orderNo,
          MatchingName: matchingName,
          UserId: userId,
          Total: calculateTotalQuantity(matchingName),
          ...getNonNullSizes(data).reduce((acc, size) => {
            acc[size] = quantities[matchingName]?.[size] || 0;
            return acc;
          }, {}),
        };

        // Call the API for each MatchingName
        await addOrderDetails(orderDetails);
      }

      // If all order details are added successfully
      alert("Order details added successfully!");
    } catch (err) {
      console.error("Failed to add order details:", err);
      setError("Failed to add order details.");
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const nonNullSizes = getNonNullSizes(yarnUsageData);

  return (
    <div>
      <h2>
        Order Quantity Details for Article No: {ArticleNo} with RSN:{" "}
        {yarnUsageData[0]?.RSN}
      </h2>

      {yarnUsageData.length ? (
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
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {yarnUsageData.map((data, dataIndex) => (
              <tr key={dataIndex}>
                <td>{data.MatchingName}</td>
                {nonNullSizes.map((size) => (
                  <td key={size}>
                    <input
                      type="number"
                      value={quantities[data.MatchingName]?.[size] || 0}
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
                <td>{calculateTotalQuantity(data.MatchingName)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No yarn usage data found.</div>
      )}

      <button onClick={addOrderDetailsHandler}>Add Quantity</button>
      <button onClick={handleSubmit}>Prepare Data</button>

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
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {updatedYarnUsageData.map((data, dataIndex) => {
                const yarnKeys = Object.keys(data).filter((key) =>
                  key.startsWith("Yarn")
                );
                return yarnKeys.map((key, yarnIndex) => (
                  <tr key={`${dataIndex}-${yarnIndex}`}>
                    {yarnIndex === 0 && (
                      <td rowSpan={yarnKeys.length}>{data.MatchingName}</td>
                    )}
                    <td>{data[key].YarnId}</td>
                    {nonNullSizes.map((size) => (
                      <td key={`${size}-${yarnIndex}`}>
                        {data[key].Weight ? data[key].Weight.toFixed(2) : "-"}
                      </td>
                    ))}
                    <td>{data[key].Weight.toFixed(2)}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
          <button onClick={addYarnHandler}>Add Yarn Details</button>
        </div>
      )}
    </div>
  );
};

export default AddOrderDetails;
