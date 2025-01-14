import React, { useState } from "react";
import { getOrderDetails, deleteOrder } from "../API/OrderApi";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [orderNo, setOrderNo] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrderDetails = async () => {
    if (!orderNo) {
      setError("Please enter an order number");
      return;
    }

    try {
      setError(null);
      const response = await getOrderDetails(orderNo);

      if (response && Array.isArray(response.data) && response.data.length > 0) {
        setOrderDetails(response.data[0]);
      } else {
        setError("No order details found");
        setOrderDetails(null);
      }
    } catch (err) {
      setError("An error occurred while fetching the order details");
      console.error(err);
    }
  };

  const handleDelete = async (orderNo) => {
    try {
      setError(null);

      const response = await deleteOrder(orderNo);

      if (response && response.success) {
        window.alert(`Order No ${orderNo} has been deleted successfully.`);
        setOrderDetails(null);
      } else {
        setError("Failed to delete the order");
      }
    } catch (err) {
      setError("An error occurred while deleting the order");
      console.error(err);
    }
  };

  const handleUpdate = (orderNo) => {
    navigate("/update-order", { state: { orderDetails } });
  };

  const handleBackButton = () => {
    navigate('/order');
  };

  return (
    <div>
      <h2>Search Order</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Order No"
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
        />
        <button onClick={fetchOrderDetails}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orderDetails && (
        <div>
          <h3>Order Details</h3>
          <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Client</th>
                <th>Article No</th>
                <th>Delivery Date</th>
                <th>Approved By</th>
                <th>Date</th>
                <th>User ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr key={orderDetails.OrderNo}>
                <td>{orderDetails.OrderNo}</td>
                <td>{new Date(orderDetails.OrderDate).toLocaleString()}</td>
                <td>{orderDetails.OrderStatus}</td>
                <td>{orderDetails.Client}</td>
                <td>{orderDetails.ArticleNo}</td>
                <td>{new Date(orderDetails.DelieveryDate).toLocaleString()}</td>
                <td>{orderDetails.ApprovedBy}</td>
                <td>{new Date(orderDetails.Date).toLocaleString()}</td>
                <td>{orderDetails.UserId}</td>
                <td>
                  <button onClick={() => handleUpdate(orderDetails.OrderNo)}>Update</button>
                  <button onClick={() => handleDelete(orderDetails.OrderNo)}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <button onClick={handleBackButton}>Back</button>
    </div>
  );
};

export default SearchOrder;
