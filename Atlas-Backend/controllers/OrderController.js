const db = require("../db/database");

// Add order details
const addOrderDetails = async (req, res) => {
  const {
    OrderDate,
    OrderStatus,
    Client,
    ArticleNo,
    DelieveryDate,
    ApprovedBy,
    UserId,
  } = req.body;

  // Validate if required fields are provided
  if (
    !OrderDate ||
    !OrderStatus ||
    !Client ||
    !ArticleNo ||
    !DelieveryDate ||
    !ApprovedBy ||
    !UserId
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required, including UserId",
    });
  }

  try {
    const result = await db.query(
      "INSERT INTO order_master (OrderDate, OrderStatus, Client, ArticleNo, DelieveryDate, ApprovedBy, UserId) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        OrderDate,
        OrderStatus,
        Client,
        ArticleNo,
        DelieveryDate,
        ApprovedBy,
        UserId,
      ]
    );

    // Respond with success
    return res.json({
      success: true,
      message: "Order details added successfully",
      data: result,
    });
  } catch (error) {
    // Handle any error during the insertion
    console.error("Error adding order details:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error adding order details" });
  }
};

// Update order details by OrderNo
const updateOrderDetails = async (req, res) => {
  const { OrderNo } = req.params;
  const { OrderDate, OrderStatus, Client, ArticleNo, DelieveryDate, ApprovedBy, UserId } = req.body;

  // Validate if at least one field is provided for update
  if (
    !OrderDate &&
    !OrderStatus &&
    !Client &&
    !ArticleNo &&
    !DelieveryDate &&
    !ApprovedBy &&
    !UserId
  ) {
    return res.status(400).json({
      success: false,
      message: "At least one field should be provided for update.",
    });
  }

  try {
    const updateQuery = `
      UPDATE order_master
      SET OrderDate = ?, OrderStatus = ?, Client = ?, ArticleNo = ?, DelieveryDate = ?, ApprovedBy = ?, UserId = ?
      WHERE OrderNo = ?
    `;

    const result = await db.query(updateQuery, [
      OrderDate || null,
      OrderStatus || null,
      Client || null,
      ArticleNo || null,
      DelieveryDate || null,
      ApprovedBy || null,
      UserId || null,
      OrderNo,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found with the provided OrderNo.",
      });
    }

    return res.json({
      success: true,
      message: "Order details updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating order details:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating order details" });
  }
};

// Update only OrderStatus by OrderNo
const updateOrderStatus = async (req, res) => {
  const { OrderNo } = req.params;
  const { OrderStatus } = req.body;

  // Validate if OrderStatus is provided
  if (!OrderStatus) {
    return res.status(400).json({
      success: false,
      message: "OrderStatus is required for update.",
    });
  }

  try {
    console.log("Alisha");
    const result = await db.query(
      "UPDATE order_master SET OrderStatus = ? WHERE OrderNo = ?",
      [OrderStatus, OrderNo]
    );

    console.log(result);
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found with the provided OrderNo.",
      });
    }

    return res.json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating order status" });
  }
};

// Delete an order by OrderNo
const deleteOrder = async (req, res) => {
  const { OrderNo } = req.params;

  try {
    const result = await db.query("DELETE FROM order_master WHERE OrderNo = ?", [OrderNo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found with the provided OrderNo.",
      });
    }

    return res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error deleting order" });
  }
};

// Show all orders
const getAllOrders = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM order_master");

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found.",
      });
    }

    return res.json({
      success: true,
      message: "Orders retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error retrieving orders" });
  }
};

// Search order by OrderNo
const getOrderDetails = async (req, res) => {
    const OrderNo = req.params.OrderNo;

    try {
      const result = await db.query("SELECT * FROM order_master WHERE OrderNo = ?", [OrderNo]);
  
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No orders found.",
        });
      }
  
      return res.json({
        success: true,
        message: "Order retrieved successfully",
        data: result[0],
      });
    } catch (error) {
      console.error("Error retrieving order:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error retrieving order" });
    }
};

// New function to fetch the latest RSN (auto-incremented value)
const getLatestOrderNo = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT MAX(OrderNo) AS OrderNo FROM order_master');
    res.json({ success: true, OrderNo: rows[0].OrderNo });
  } catch (err) {
    console.error("Error fetching latest OrderNo:", err);
    res.status(500).json({ success: false, message: "Error fetching latest OrderNo", error: err.message });
  }
};

module.exports = {
  addOrderDetails,
  updateOrderDetails,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
  getOrderDetails,
  getLatestOrderNo,
};
