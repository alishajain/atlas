const db = require("../db/database");

// Controller to add data into the pakkiwash table
const addPakkiWash = async (req, res) => {
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
      INSERT INTO pakki_wash (RSN, EmpID, Chemical, Quantity, Cost, UserId)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    
    // Define the values to insert (to be safely used in the query)
    const values = [RSN, EmpID, Chemical, Quantity, Cost, UserId];

    // Execute the query using async/await for handling db query
    const result = await db.query(query, values);

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'PakkiWash data added successfully',
      data: result,
    });
  } catch (error) {
    // Handle any error during the insertion
    console.error('Error adding pakkiwash data:', error);
    return res.status(500).json({
      success: false,
      message: 'Error adding pakkiwash data',
    });
  }
};

// Controller to fetch data by RSN from the pakkiwash table
const getPakkiWashByRSN = async (req, res) => {
  const { RSN } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM pakki_wash WHERE RSN = ?', [RSN]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "PakkiWash record not found." });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error("Error fetching pakkiwash details:", err);
    res.status(500).json({ success: false, message: "Error fetching pakkiwash details.", error: err.message });
  }
};


module.exports = {
  addPakkiWash,
  getPakkiWashByRSN,
};
