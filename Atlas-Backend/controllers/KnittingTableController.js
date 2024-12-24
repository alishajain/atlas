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

  // Validate input fields (for non-JSON fields)
  if (!RSN || !Size) {
    return res.status(400).json({ message: "RSN and Size are required." });
  }

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
    connection = await db.getConnection();
    await connection.beginTransaction();
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
    await connection.commit();

    // Send a successful response
    res.status(200).json({
      success: true,
      message: "Knitting details added successfully",
      RSN: newKnittingDetails.insertId,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error inserting Knitting data:", error);
    res.status(500).json({
      success: false,
      message: `Error inserting Knitting data: ${error.message}`,
    });
  } finally {
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

  if (!Size) {
    return res.status(400).json({ success: false, message: "Size is required." });
  }

  // Prepare JSON fields for inserting into the database
  const jsonFields = [
    'FrontRight', 'FrontLeft', 'FrontComplete', 'BackRight', 'BackLeft', 
    'BackComplete', 'SleeveRight', 'SleeveLeft', 'BothSleeves', 'Tape', 
    'Collar', 'Kharcha1', 'Kharcha2', 'Kharcha3', 'Total',
  ];

  const jsonData = {};
  jsonFields.forEach(field => {
    if (req.body[field]) {
      if (typeof req.body[field] === 'string') {
        try {
          jsonData[field] = JSON.parse(req.body[field]);
        } catch (error) {
          return res.status(400).json({ success: false, message: `${field} must be a valid JSON.` });
        }
      } else {
        jsonData[field] = req.body[field];
      }
    }
  });

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

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
        RSN 
      ]
    );

    await connection.commit();

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Knitting record not found for update." });
    }

    res.status(200).json({ success: true, message: "Knitting details updated successfully." });
  } catch (err) {
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
