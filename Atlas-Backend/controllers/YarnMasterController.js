const db = require("../db/database");

//Fetch data from YarnMaster Table 
const getYarnDetails = async (req, res) => {
    try {
        const [results] = await db.query("SELECT * From yarn_master");
        res.json({ success: true, data: results});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// Add Yarn Details
const addYarnDetails = async (req, res) => {
    const {
      YarnId,
      YarnType,
      YarnCount,
      ColorName,
      ColorCode,
    } = req.body;
  
    // Validate input fields
    if (
      !YarnId ||
      !YarnType ||
      !YarnCount ||
      !ColorName ||
      !ColorCode
    ) {
      return res.status(400).json({ message: "All fields are required." }); // Return an error if any field is missing
    }
  
    let connection;
    try {
      // Get a connection from the pool
      connection = await db.getConnection();
      await connection.beginTransaction(); // Begin a transaction
  
      // Insert into the sample_details table
      const [newYarnDetails] = await connection.query(
        "INSERT INTO yarn_master (YarnId, YarnType, YarnCount, ColorName, ColorCode) VALUES (?, ?, ?, ?, ?)",
        [
          YarnId,
          YarnType,
          YarnCount,
          ColorName,
          ColorCode
        ]
      );
  
      // Commit the transaction
      await connection.commit();
  
      // Send a successful response
      res
        .status(200)
        .json({
          success: true,
          message: "Yarn details added successfully",
          YarnId: newYarnDetails.insertId,
        });
    } catch (error) {
      // Rollback if an error occurs
      if (connection) {
        await connection.rollback();
      }
      console.error("Error inserting yarn data:", error); // Log the detailed error for debugging
      res
        .status(500)
        .json({
          success: false,
          message: `Error inserting yarn data: ${error.message}`,
        }); // Send error response with message
    } finally {
      // Always release the connection back to the pool
      if (connection) {
        connection.release();
      }
    }
  };

module.exports = {
    getYarnDetails,
    addYarnDetails,
}
