const db = require("../db/database");

// Controller to add data into the kachiwash table
const addKachiWash = async (req, res) => {
  const { RSN, EmpID, Chemical, Quantity, Cost, UserId } = req.body;

  // Validate if required fields are provided
  if (!RSN || !EmpID || !Cost || !UserId || !Chemical || !Quantity) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required, including UserId.',
    });
  }

  try {
    // Define the SQL query to insert the data
    const query = `
      INSERT INTO kachi_wash (RSN, EmpID, Chemical, Quantity, Cost, UserId)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    
    // Define the values to insert (to be safely used in the query)
    const values = [RSN, EmpID, Chemical, Quantity, Cost, UserId];

    // Execute the query using async/await for handling db query
    const result = await db.query(query, values);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'KachiWash data added successfully',
      data: result,
    });
  } catch (error) {
    // Handle any error during the insertion
    console.error('Error adding kachiwash data:', error);
    return res.status(500).json({
      success: false,
      message: 'Error adding kachiwash data',
    });
  }
};

// Controller to fetch data by RSN from the kachiwash table
const getKachiWashByRSN = async (req, res) => {
  const { RSN } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM kachi_wash WHERE RSN = ?', [RSN]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "KachiWash record not found." });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error fetching kachiwash details:", err);
    res.status(500).json({ success: false, message: "Error fetching kachiwash details.", error: err.message });
  }
};


module.exports = {
  addKachiWash,
  getKachiWashByRSN,
};
