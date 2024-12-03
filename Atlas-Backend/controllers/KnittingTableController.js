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
    jsonFields.forEach((field) => {
      if (field && typeof field === "string") {
        // If the field is a string, try parsing it into a JSON object
        JSON.parse(field);
      }
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "One or more JSON fields are invalid." });
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

module.exports = {
  getKnittingDetails,
  addKnittingDetails,
};
