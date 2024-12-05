const db = require("../db/database");

//Fetch data from YarnMaster Table
const getYarnStockDetails = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * From yarn_inventory");
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getYarnIds = async (req, res) => {
  try {
    const [results] = await db.query("SELECT YarnId From yarn_master");
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addYarnStockDetails = async (req, res) => {
  const { Date, YarnId, SupplierName, SupplierCity, Weight, Amount } = req.body;

  // Validate input fields
  if (!Date || !YarnId || !SupplierName || !SupplierCity || !Weight || !Amount) {
    return res.status(400).json({ message: "All fields are required." }); // Return an error if any field is missing
  }

  let connection;
  try {
    // Get a connection from the pool
    connection = await db.getConnection();
    await connection.beginTransaction(); // Begin a transaction

    // Insert into the sample_details table
    const [newYarnStockDetails] = await connection.query(
      "INSERT INTO yarn_inventory (Date, YarnId, SupplierName, SupplierCity, Weight, Amount) VALUES (?, ?, ?, ?, ?, ?)",
      [Date, YarnId, SupplierName, SupplierCity, Weight, Amount]
    );

    // Commit the transaction
    await connection.commit();

    // Send a successful response
    res.status(200).json({
      success: true,
      message: "Yarn stock details added successfully",
      YarnId: newYarnStockDetails.insertId,
    });
  } catch (error) {
    // Rollback if an error occurs
    if (connection) {
      await connection.rollback();
    }
    console.error("Error inserting yarn stock data:", error); // Log the detailed error for debugging
    res.status(500).json({
      success: false,
      message: `Error inserting yarn stock data: ${error.message}`,
    }); // Send error response with message
  } finally {
    // Always release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  getYarnStockDetails,
  getYarnIds,
  addYarnStockDetails,
};
