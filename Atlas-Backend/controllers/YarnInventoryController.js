const db = require("../db/database");

// Fetch data from YarnInventory Table
const getYarnStockDetails = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM yarn_inventory");
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//fetch yarn details by YarnId
const getYarnbyYarnID = async (req, res) => {
  const { YarnId } = req.params; // Extract YarnId from the request params

  try {
    // Query to select and group by LotNo for the given YarnId
    const [results] = await db.query(
      "SELECT LotNo, SUM(Weight) AS TotalWeight FROM yarn_inventory WHERE YarnId = ? GROUP BY LotNo",
      [YarnId]
    );

    if (results.length === 0) {
      return res.status(404).json({ message: "No yarn found with this YarnId" });
    }

    res.json({ success: true, data: results });
  } catch (err) {
    // Catch and handle any database or query errors
    console.error("Error fetching yarn data:", err);
    res.status(500).json({ error: err.message });
  }
};

// Fetch YarnIds from YarnMaster Table
const getYarnIds = async (req, res) => {
  try {
    const [results] = await db.query("SELECT YarnId FROM yarn_master");
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add Yarn Stock Details and Update Yarn Master Table
const addYarnStockDetails = async (req, res) => {
  const { Date, YarnId, SupplierName, SupplierCity, Weight, Amount, BillNo, UserId, LotNo } = req.body;

  // Validate input fields
  if (!Date || !YarnId || !SupplierName || !SupplierCity || !Weight || !Amount || !BillNo || !UserId || !LotNo) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Validate numeric fields
  if (isNaN(Weight) || Weight <= 0 || isNaN(Amount) || Amount <= 0) {
    return res.status(400).json({ message: "Weight and Amount must be positive numbers." });
  }

  let connection;
  try {
    // Get a connection from the pool and begin a transaction
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Check if the stock details already exist for the same YarnId and Date
    const [existingStock] = await connection.query(
      "SELECT 1 FROM yarn_inventory WHERE YarnId = ? AND Date = ? AND LotNo = ?",
      [YarnId, Date, LotNo]
    );

    if (existingStock.length > 0) {
      return res.status(400).json({
        message: "Yarn stock details for this YarnId and Date already exist.",
      });
    }

    // Insert yarn stock details into yarn_inventory table
    const [newYarnStockDetails] = await connection.query(
      "INSERT INTO yarn_inventory (Date, YarnId, SupplierName, SupplierCity, Weight, Amount, BillNo, UserId, LotNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [Date, YarnId, SupplierName, SupplierCity, Weight, Amount, BillNo, UserId, LotNo]
    );
    
    // Check if YarnId exists in yarn_master and update or insert weight
    const [existingYarn] = await connection.query(
      "SELECT Weight FROM yarn_master WHERE YarnId = ?",
      [YarnId]
    );

    const updatedWeight = Number(Weight);
    if (existingYarn.length > 0) {
      // Update the weight if YarnId exists in yarn_master
      const newWeight = Number(existingYarn[0].Weight) + updatedWeight;
      await connection.query("UPDATE yarn_master SET Weight = ? WHERE YarnId = ?", [newWeight, YarnId]);
    } else {
      // Insert new entry into yarn_master if YarnId does not exist
      await connection.query("INSERT INTO yarn_master (YarnId, Weight) VALUES (?, ?)", [YarnId, updatedWeight]);
    }

    // Commit the transaction
    await connection.commit();

    // Send a successful response
    res.status(200).json({
      success: true,
      message: "Yarn stock details added and yarn master updated successfully.",
      YarnId: newYarnStockDetails.insertId,
    });
  } catch (error) {
    // Rollback transaction in case of an error
    if (connection) {
      await connection.rollback();
    }
    console.error("Error inserting yarn stock data:", error);
    res.status(500).json({
      success: false,
      message: `Error inserting yarn stock data: ${error.message}`,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  getYarnStockDetails,
  getYarnIds,
  addYarnStockDetails,
  getYarnbyYarnID,
};
