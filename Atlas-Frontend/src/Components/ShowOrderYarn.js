import React, { useState, useEffect } from "react";
import { searchOrderYarn } from "../API/OrderYarnApi"; // Import the API function

const ShowOrderYarn = () => {
  const orderNo = '67';
  const [orderYarnData, setOrderYarnData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderNo) return;

    const fetchOrderYarnData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await searchOrderYarn(orderNo);
        setOrderYarnData(response.data);
      } catch (err) {
        setError("Error fetching order yarn data");
        console.error("Error fetching order yarn data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderYarnData();
  }, [orderNo]);

  if (loading) {
    return <p>Loading order yarn data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const renderYarnRow = (matchingName, yarnKey, yarnData, rowspan) => {
    if (!yarnData) return null;

    const sizes = ["XS", "S", "M", "L"];
    const sizeData = sizes.map((size) => (
      <td key={size}>{yarnData[size] || 0}</td>
    ));

    const totalWeight = yarnData.Weight || 0;

    return (
      <tr key={yarnKey}>
        <td rowSpan={rowspan}>{matchingName}</td>
        <td>{yarnKey}</td>
        {sizeData}
        <td>{totalWeight}</td>
      </tr>
    );
  };

  const groupYarnDataByMatchingName = () => {
    if (!orderYarnData || orderYarnData.length === 0) {
      return [];
    }

    const groupedData = [];
    let currentMatchingName = null;
    let yarnCount = 0;

    orderYarnData.forEach((item) => {
      if (item.MatchingName !== currentMatchingName) {
        if (currentMatchingName !== null) {
          groupedData.push({
            matchingName: currentMatchingName,
            count: yarnCount,
          });
        }
        currentMatchingName = item.MatchingName;
        yarnCount = 1;
      } else {
        yarnCount++;
      }

      // Push the yarn entry into the grouped data
      groupedData.push({
        matchingName: item.MatchingName,
        yarnData: item,
        yarnCount,
      });
    });

    return groupedData;
  };

  const groupedYarnData = groupYarnDataByMatchingName();

  return (
    <div>
      <h2>Search Order Yarn Data</h2>
      {orderYarnData ? (
        <div>
          <h3>Order Yarn Data for OrderNo: {orderNo}</h3>
          <table>
            <thead>
              <tr>
                <th>Matching Name</th>
                <th>Yarn ID</th>
                <th>XS</th>
                <th>S</th>
                <th>M</th>
                <th>L</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {groupedYarnData.map((item, index) => {
                // Check if yarnData is valid for each row
                if (item.yarnData) {
                  return Object.keys(item.yarnData).map(
                    (key) =>
                      key.startsWith("Yarn") &&
                      item.yarnData[key] !== null && (
                        <React.Fragment key={`${index}-${key}`}>
                          {renderYarnRow(
                            item.matchingName,
                            item.yarnData[key].YarnId,
                            item.yarnData[key],
                            item.yarnCount
                          )}
                        </React.Fragment>
                      )
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data found for this OrderNo.</p>
      )}
    </div>
  );
};

export default ShowOrderYarn;
