const db = require("../db/database"); // Assuming your database connection is set up here

// Controller function to add new order details
const addOrderDetails = async (req, res) => {
  const {
    OrderNo,
    MatchingName,
    Freesize = null,
    XS = null,
    S = null,
    M = null,
    L = null,
    XL = null,
    "2XL": XL2 = null, // Alias because column name is "2XL"
    "3XL": XL3 = null,
    "4XL": XL4 = null,
    "5XL": XL5 = null,
    Total,
    UserId,
  } = req.body;

  // Ensure the required fields are present
  if (!OrderNo || !MatchingName || Total === undefined || !UserId) {
    return res.status(400).json({
      error: "OrderNo, MatchingName, Total, and UserId are required fields.",
    });
  }

  try {
    const query = `
      INSERT INTO order_details (
        OrderNo, MatchingName, Freesize, XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL, Total, UserId
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      OrderNo,
      MatchingName,
      Freesize,
      XS,
      S,
      M,
      L,
      XL,
      XL2,
      XL3,
      XL4,
      XL5,
      Total,
      UserId,
    ];

    const [result] = await db.execute(query, values);
    res.status(201).json({ message: "Order details added successfully", orderDetailsId: result.insertId });
  } catch (err) {
    console.error("Error adding order details:", err);
    res.status(500).json({ error: "Failed to add order details" });
  }
};

// Controller function to update existing order details
const updateOrderDetails = async (req, res) => {
  const {
    OrderNo,
    MatchingName,
    Freesize = null,
    XS = null,
    S = null,
    M = null,
    L = null,
    XL = null,
    "2XL": XL2 = null, // Alias because column name is "2XL"
    "3XL": XL3 = null,
    "4XL": XL4 = null,
    "5XL": XL5 = null,
    Total,
    UserId,
  } = req.body;

  // Ensure the required fields are present
  if (!OrderNo || !MatchingName || Total === undefined || !UserId) {
    return res.status(400).json({
      error: "OrderNo, MatchingName, Total, and UserId are required fields.",
    });
  }

  try {
    const query = `
      UPDATE order_details
      SET
        Freesize = ?, XS = ?, S = ?, M = ?, L = ?, XL = ?, 2XL = ?, 3XL = ?, 4XL = ?, 5XL = ?, Total = ?, UserId = ?, updated_at = CURRENT_TIMESTAMP
      WHERE OrderNo = ? AND MatchingName = ?
    `;

    const values = [
      Freesize,
      XS,
      S,
      M,
      L,
      XL,
      XL2,
      XL3,
      XL4,
      XL5,
      Total,
      UserId,
      OrderNo,
      MatchingName,
    ];

    const [result] = await db.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No order details found to update" });
    }

    res.status(200).json({ message: "Order details updated successfully" });
  } catch (err) {
    console.error("Error updating order details:", err);
    res.status(500).json({ error: "Failed to update order details" });
  }
};

module.exports = {
  addOrderDetails,
  updateOrderDetails,
};
