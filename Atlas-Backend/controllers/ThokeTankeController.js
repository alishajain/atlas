const db = require("../db/database");

// Controller to add data into the thoke_tanke table
const addThokeTanke = async (req, res) => {
  try {
    const { RSN, EmpID, YarnId, Quantity, Cost, UserId } = req.body;

    // Input validation
    if (!RSN || !EmpID || !YarnId || !Quantity || !Cost || !UserId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Define the SQL query to insert the data
    const query = `
      INSERT INTO thoke_tanke (RSN, EmpID, YarnId, Quantity, Cost, UserId)
      VALUES (?, ?, ?, ?, ?, ?);
    `;

    const values = [RSN, EmpID, YarnId, Quantity, Cost, UserId];

    // Execute the query using the db connection
    db.query(query, values, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error inserting data into the thoke_tanke table.' });
      }

      // Send success response with the inserted data
      return res.status(201).json({
        message: 'Data added successfully.',
        data: {
          RSN,
          EmpID,
          YarnId,
          Quantity,
          Cost,
          UserId,
        }
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Controller to fetch data by RSN from the thoke_tanke table
const getThokeTankeByRSN = (req, res) => {
  const { RSN } = req.params;

  // Validate that RSN is provided
  if (!RSN) {
    return res.status(400).json({ message: 'RSN parameter is required.' });
  }

  // Define the SQL query to fetch data by RSN
  const query = `
    SELECT * FROM thoke_tanke WHERE RSN = ?;
  `;

  // Execute the query using the db connection
  db.query(query, [RSN], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching data from the thoke_tanke table.' });
    }

    // Check if any data was found
    if (results.length === 0) {
      return res.status(404).json({ message: 'No data found for the provided RSN.' });
    }

    // Send success response with the fetched data
    return res.status(200).json({
      message: 'Data fetched successfully.',
      data: results[0], // Since RSN should be unique, we return the first record
    });
  });
};

module.exports = {
  addThokeTanke,
  getThokeTankeByRSN,
};
