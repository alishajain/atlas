const db = require("../db/database"); // Assuming this is the connection pool

// Function to calculate total weight and time from JSON fields
const calculateTotalWeightAndTime = (jsonData) => {
  let totalWeight = 0;
  let totalTime = 0;

  // Loop through each item in the JSON and sum the weight and time
  if (Array.isArray(jsonData)) {
    jsonData.forEach((item) => {
      totalWeight += item.weight || 0; // Add weight if present, otherwise 0
      totalTime += item.time || 0; // Add time if present, otherwise 0
    });
  }

  return { totalWeight, totalTime };
};

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
  } = req.body;

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

  // Calculate the total weight and time for each field
  const totalData = {
    FrontRight: calculateTotalWeightAndTime(FrontRight),
    FrontLeft: calculateTotalWeightAndTime(FrontLeft),
    FrontComplete: calculateTotalWeightAndTime(FrontComplete),
    BackRight: calculateTotalWeightAndTime(BackRight),
    BackLeft: calculateTotalWeightAndTime(BackLeft),
    BackComplete: calculateTotalWeightAndTime(BackComplete),
    SleeveRight: calculateTotalWeightAndTime(SleeveRight),
    SleeveLeft: calculateTotalWeightAndTime(SleeveLeft),
    BothSleeves: calculateTotalWeightAndTime(BothSleeves),
    Tape: calculateTotalWeightAndTime(Tape),
    Collar: calculateTotalWeightAndTime(Collar),
    Kharcha1: calculateTotalWeightAndTime(Kharcha1),
    Kharcha2: calculateTotalWeightAndTime(Kharcha2),
    Kharcha3: calculateTotalWeightAndTime(Kharcha3),
  };

  // Now calculate the total weight and time across all fields for the 'Total' column
  const totalWeight = Object.values(totalData).reduce(
    (sum, data) => sum + data.totalWeight,
    0
  );
  const totalTime = Object.values(totalData).reduce(
    (sum, data) => sum + data.totalTime,
    0
  );

  // The Total field will now store a JSON object with the sum of weight and time
  const total = JSON.stringify({ Weight: totalWeight, Time: totalTime });

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
        JSON.stringify(FrontRight), // Ensure that these fields are stored as JSON
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
        total, // The calculated total as a JSON string
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

    res.status(200).json({ success: true, data: rows[0] }); // Return the first record (should be unique by RSN)
  } catch (err) {
    console.error("Error fetching knitting details:", err);
    res.status(500).json({ success: false, message: "Error fetching knitting details.", error: err.message });
  }
};

// Controller to update knitting details by RSN
const updateKnittingDetails = async (req, res) => {
  const RSN = req.params.RSN; // Get RSN from URL parameters
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
  } = req.body;

  // Validate required fields (e.g., Size and FrontRight are mandatory for the update)
  if (!Size) {
    return res.status(400).json({ success: false, message: "Size is required." });
  }

  // Prepare JSON fields for inserting into the database
  const jsonFields = [
    'FrontRight', 'FrontLeft', 'FrontComplete', 'BackRight', 'BackLeft', 
    'BackComplete', 'SleeveRight', 'SleeveLeft', 'BothSleeves', 'Tape', 
    'Collar', 'Kharcha1', 'Kharcha2', 'Kharcha3'
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

  // Calculate the total weight and time from the JSON fields
  const totalData = {
    FrontRight: calculateTotalWeightAndTime(jsonData.FrontRight),
    FrontLeft: calculateTotalWeightAndTime(jsonData.FrontLeft),
    FrontComplete: calculateTotalWeightAndTime(jsonData.FrontComplete),
    BackRight: calculateTotalWeightAndTime(jsonData.BackRight),
    BackLeft: calculateTotalWeightAndTime(jsonData.BackLeft),
    BackComplete: calculateTotalWeightAndTime(jsonData.BackComplete),
    SleeveRight: calculateTotalWeightAndTime(jsonData.SleeveRight),
    SleeveLeft: calculateTotalWeightAndTime(jsonData.SleeveLeft),
    BothSleeves: calculateTotalWeightAndTime(jsonData.BothSleeves),
    Tape: calculateTotalWeightAndTime(jsonData.Tape),
    Collar: calculateTotalWeightAndTime(jsonData.Collar),
    Kharcha1: calculateTotalWeightAndTime(jsonData.Kharcha1),
    Kharcha2: calculateTotalWeightAndTime(jsonData.Kharcha2),
    Kharcha3: calculateTotalWeightAndTime(jsonData.Kharcha3),
  };

  // Calculate total weight and time across all fields
  const totalWeight = Object.values(totalData).reduce((sum, data) => sum + data.totalWeight, 0);
  const totalTime = Object.values(totalData).reduce((sum, data) => sum + data.totalTime, 0);

  // Create the total field as a JSON object
  const total = JSON.stringify({ Weight: totalWeight, Time: totalTime });

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
        total, // The total weight and time
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
