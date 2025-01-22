const db = require("../db/database");

// Controller to add data into the kachian table
const addKachian = async (req, res) => {
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
      INSERT INTO kachian (RSN, EmpID, YarnId, Quantity, Cost, UserId)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    // Define the values to insert (to be safely used in the query)
    const values = [RSN, EmpID, YarnId, Quantity, Cost, UserId];

    // Execute the query using async/await for handling db query
    const result = await db.query(query, values);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'Kachian data added successfully',
      data: result,
    });
  } catch (error) {
    // Handle any error during the insertion
    console.error('Error adding kachian data:', error);
    return res.status(500).json({
      success: false,
      message: 'Error adding kachian data',
    });
  }
};

// Controller to fetch data by RSN from the kachian table
const getKachianByRSN = async (req, res) => {
  const { RSN } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM kachian WHERE RSN = ?', [RSN]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Kachian record not found." });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error fetching kachian details:", err);
    res.status(500).json({ success: false, message: "Error fetching kachian details.", error: err.message });
  }
};

module.exports = {
  addKachian,
  getKachianByRSN,
};
