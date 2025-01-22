const db = require("../db/database");

// Controller to add data into the sewing table
const addSewing = async (req, res) => {
  const { RSN, EmpID, YarnId, Quantity, Cost, UserId } = req.body;

  // Validate if required fields are provided
  if (!RSN || !EmpID || !YarnId || !Quantity || !Cost || !UserId) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required, including UserId.',
    });
  }

  try {
    // Define the SQL query to insert the data
    const query = `
      INSERT INTO sewing (RSN, EmpID, YarnId, Quantity, Cost, UserId)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    // Define the values to insert (to be safely used in the query)
    const values = [RSN, EmpID, YarnId, Quantity, Cost, UserId];

    // Execute the query using async/await for handling db query
    const result = await db.query(query, values);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'Sewing data added successfully',
      data: result,
    });
  } catch (error) {
    // Handle any error during the insertion
    console.error('Error adding sewing data:', error);
    return res.status(500).json({
      success: false,
      message: 'Error adding sewing data',
    });
  }
};

// Controller to fetch data by RSN from the sewing table
const getSewingByRSN = async (req, res) => {
  const { RSN } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM sewing WHERE RSN = ?', [RSN]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Sewing record not found." });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error fetching sewing details:", err);
    res.status(500).json({ success: false, message: "Error fetching sewing details.", error: err.message });
  }
};

module.exports = {
  addSewing,
  getSewingByRSN,
};
