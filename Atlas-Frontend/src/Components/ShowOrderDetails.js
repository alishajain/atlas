import React, { useState, useEffect } from "react";
import { getOrderByOrderNo } from "../API/OrderDetailsApi";  // Import the API function

const ShowOrderDetails = ({ OrderNo }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details on component mount
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderByOrderNo(OrderNo);  // Call the API with the OrderNo
        if (response.data && Array.isArray(response.data)) {
          setOrderDetails(response.data);  // Set the fetched data to state
        } else {
          setError("No order details found.");
        }
      } catch (err) {
        setError("Error fetching order details.");
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);  // Set loading state to false after data is fetched
      }
    };

    if (OrderNo) {
      fetchOrderDetails();
    }
  }, [OrderNo]);  // Dependency array ensures this runs only when OrderNo changes

  // Show loading indicator while fetching
  if (loading) {
    return <p>Loading order details...</p>;
  }

  // Show error if fetching fails
  if (error) {
    return <p>{error}</p>;
  }

  // Render order details if available
  return (
    <div>
      <h2>Order Details for OrderNo: {OrderNo}</h2>
      {orderDetails.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Field</th>
              {orderDetails.map((order, index) => (
                <th key={index}>{order.MatchingName}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Display rows only for non-null fields */}
            {[
              { label: "Matching Name", key: "MatchingName" },
              { label: "Freesize", key: "Freesize" },
              { label: "XS", key: "XS" },
              { label: "S", key: "S" },
              { label: "M", key: "M" },
              { label: "L", key: "L" },
              { label: "XL", key: "XL" },
              { label: "2XL", key: "2XL" },
              { label: "3XL", key: "3XL" },
              { label: "4XL", key: "4XL" },
              { label: "5XL", key: "5XL" },
              { label: "Total", key: "Total" },
              { label: "UserId", key: "UserId" },
            ].map(({ label, key }) => (
              orderDetails.some((order) => order[key] != null) && (
                <tr key={key}>
                  <td>{label}</td>
                  {orderDetails.map((order, index) => (
                    <td key={index}>{order[key] != null ? order[key] : "-"}</td>
                  ))}
                </tr>
              )
            ))}
          </tbody>
        </table>
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default ShowOrderDetails;
