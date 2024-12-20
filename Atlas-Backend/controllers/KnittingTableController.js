const db = require("../db/database");

// Fetch data from Knitting_Details table
const getKnittingDetails = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM knitting_details");
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return error response if query fails
  }
};

// Add Knitting Details
const addKnittingDetails = async (req, res) => {
  const {
    RSN,
    Size,
    FrontRight,
    FrontLeft,
    FrontComplete,
    BackRight,
    BackLeft,
    BackComplete,
    SleeveRight,
    SleeveLeft,
    BothSleeves,
    Tape,
    Collar,
    Kharcha1,
    Kharcha2,
    Kharcha3,
    Total,
  } = req.body;

  console.log(Total);
  console.log("Alisha");
  // Validate input fields (for non-JSON fields)
  if (!RSN || !Size) {
    return res.status(400).json({ message: "RSN and Size are required." });
  }

  // Optionally, validate JSON fields (if you want to ensure they are valid JSON objects)
  const jsonFields = [
    FrontRight,
    FrontLeft,
    FrontComplete,
    BackRight,
    BackLeft,
    BackComplete,
    SleeveRight,
    SleeveLeft,
    BothSleeves,
    Tape,
    Collar,
    Kharcha1,
    Kharcha2,
    Kharcha3,
    Total
  ];

  // Ensure each JSON field is valid (using `try/catch` to check JSON parsing)
  try {
    jsonFields.forEach((field, index) => {
      if (field && typeof field === "string") {
        // If the field is a string, try parsing it into a JSON object
        JSON.parse(field);
      }
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: `One or more JSON fields are invalid at index ${jsonFields.indexOf(error)}` });
  }

  let connection;
  try {
    // Get a connection from the pool
    connection = await db.getConnection();
    await connection.beginTransaction(); // Begin a transaction

    // Insert into the knitting_details table (treating JSON columns as strings)
    const [newKnittingDetails] = await connection.query(
      "INSERT INTO knitting_details (RSN, Size, FrontRight, FrontLeft, FrontComplete, BackRight, BackLeft, BackComplete, SleeveRight, SleeveLeft, BothSleeves, Tape, Collar, Kharcha1, Kharcha2, Kharcha3, Total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        RSN,
        Size,
        JSON.stringify(FrontRight),
        JSON.stringify(FrontLeft),
        JSON.stringify(FrontComplete),
        JSON.stringify(BackRight),
        JSON.stringify(BackLeft),
        JSON.stringify(BackComplete),
        JSON.stringify(SleeveRight),
        JSON.stringify(SleeveLeft),
        JSON.stringify(BothSleeves),
        JSON.stringify(Tape),
        JSON.stringify(Collar),
        JSON.stringify(Kharcha1),
        JSON.stringify(Kharcha2),
        JSON.stringify(Kharcha3),
        JSON.stringify(Total),
      ]
    );

    // Commit the transaction
    await connection.commit();

    // Send a successful response
    res.status(200).json({
      success: true,
      message: "Knitting details added successfully",
      RSN: newKnittingDetails.insertId,
    });
  } catch (error) {
    // Rollback if an error occurs
    if (connection) {
      await connection.rollback();
    }
    console.error("Error inserting Knitting data:", error); // Log the detailed error for debugging
    res.status(500).json({
      success: false,
      message: `Error inserting Knitting data: ${error.message}`,
    });
  } finally {
    // Always release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
};

// Controller to fetch knitting details by RSN
const getKnittingDetailsByRSN = async (req, res) => {
  const RSN = req.params.RSN; // Get RSN from URL parameters

  try {
    const [rows] = await db.query('SELECT * FROM knitting_details WHERE RSN = ?', [RSN]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Knitting record not found." });
    }

    res.status(200).json({ success: true, data: rows }); // Return the first record (should be unique by RSN)
  } catch (err) {
    console.error("Error fetching knitting details:", err);
    res.status(500).json({ success: false, message: "Error fetching knitting details.", error: err.message });
  }
};

// Controller to update knitting details by RSN
const updateKnittingDetails = async (req, res) => {
  const RSN = req.params.RSN;
  const {
    Size,
    FrontRight,
    FrontLeft,
    FrontComplete,
    BackRight,
    BackLeft,
    BackComplete,
    SleeveRight,
    SleeveLeft,
    BothSleeves,
    Tape,
    Collar,
    Kharcha1,
    Kharcha2,
    Kharcha3,
    Total
  } = req.body;

  // Validate required fields (e.g., Size and FrontRight are mandatory for the update)
  if (!Size) {
    return res.status(400).json({ success: false, message: "Size is required." });
  }

  // Prepare JSON fields for inserting into the database
  const jsonFields = [
    'FrontRight', 'FrontLeft', 'FrontComplete', 'BackRight', 'BackLeft', 
    'BackComplete', 'SleeveRight', 'SleeveLeft', 'BothSleeves', 'Tape', 
    'Collar', 'Kharcha1', 'Kharcha2', 'Kharcha3', 'Total',
  ];

  // Ensure all JSON fields are properly formatted
  const jsonData = {};
  jsonFields.forEach(field => {
    if (req.body[field]) {
      // If it's a string, try parsing it
      if (typeof req.body[field] === 'string') {
        try {
          jsonData[field] = JSON.parse(req.body[field]);
        } catch (error) {
          return res.status(400).json({ success: false, message: `${field} must be a valid JSON.` });
        }
      } else {
        // If it's already an object (not a string), use it as is
        jsonData[field] = req.body[field];
      }
    }
  });

  let connection;
  try {
    // Get a connection from the pool
    connection = await db.getConnection();
    await connection.beginTransaction(); // Start transaction

    // Update the knitting details
    const [result] = await connection.query(
      `UPDATE knitting_details SET 
        Size = ?, 
        FrontRight = ?, 
        FrontLeft = ?, 
        FrontComplete = ?, 
        BackRight = ?, 
        BackLeft = ?, 
        BackComplete = ?, 
        SleeveRight = ?, 
        SleeveLeft = ?, 
        BothSleeves = ?, 
        Tape = ?, 
        Collar = ?, 
        Kharcha1 = ?, 
        Kharcha2 = ?, 
        Kharcha3 = ?, 
        Total = ?
      WHERE RSN = ?`,
      [
        Size,
        JSON.stringify(jsonData.FrontRight),
        JSON.stringify(jsonData.FrontLeft),
        JSON.stringify(jsonData.FrontComplete),
        JSON.stringify(jsonData.BackRight),
        JSON.stringify(jsonData.BackLeft),
        JSON.stringify(jsonData.BackComplete),
        JSON.stringify(jsonData.SleeveRight),
        JSON.stringify(jsonData.SleeveLeft),
        JSON.stringify(jsonData.BothSleeves),
        JSON.stringify(jsonData.Tape),
        JSON.stringify(jsonData.Collar),
        JSON.stringify(jsonData.Kharcha1),
        JSON.stringify(jsonData.Kharcha2),
        JSON.stringify(jsonData.Kharcha3),
        JSON.stringify(jsonData.Total),
        RSN // Update by RSN
      ]
    );

    // Commit the transaction
    await connection.commit();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Knitting record not found for update." });
    }

    res.status(200).json({ success: true, message: "Knitting details updated successfully." });
  } catch (err) {
    // Rollback if error occurs
    if (connection) {
      await connection.rollback();
    }
    console.error("Error updating knitting details:", err);
    res.status(500).json({
      success: false,
      message: "Error updating knitting details.",
      error: err.message,
    });
  } finally {
    // Always release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  getKnittingDetails,
  addKnittingDetails,
  getKnittingDetailsByRSN,
  updateKnittingDetails,
};
