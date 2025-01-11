const db = require("../db/database");

// Function to create a new yarn usage entry
const addYarnUsage = async (req, res) => {
  const {
    RSN,
    MatchingName,
    UserId,
    Yarn1,
    Yarn2,
    Yarn3,
    Yarn4,
    Yarn5,
    Yarn6,
    Yarn7,
    Yarn8,
    Yarn9,
    Yarn10,
    Yarn11,
    Yarn12,
    Yarn13,
    Yarn14,
    Yarn15,
  } = req.body;

  // Validate input data
  if (!RSN || !MatchingName || !UserId || !Yarn1) {
    return res.status(400).json({
      message: "Missing required fields: RSN, MatchingName, UserId, and Yarn1 are mandatory.",
    });
  }

  // Function to extract YarnId and Weight from the provided JSON object
  const extractYarnData = (yarnObj) => {
    if (yarnObj && yarnObj.YarnId && yarnObj.Weight) {
      return { YarnId: yarnObj.YarnId, Weight: yarnObj.Weight };
    }
    return null; // If the yarn data is incomplete, return null
  };

  // Prepare yarn values for insertion, ensuring each yarn field is correctly processed
  const yarnValues = [
    extractYarnData(Yarn1),
    extractYarnData(Yarn2),
    extractYarnData(Yarn3),
    extractYarnData(Yarn4),
    extractYarnData(Yarn5),
    extractYarnData(Yarn6),
    extractYarnData(Yarn7),
    extractYarnData(Yarn8),
    extractYarnData(Yarn9),
    extractYarnData(Yarn10),
    extractYarnData(Yarn11),
    extractYarnData(Yarn12),
    extractYarnData(Yarn13),
    extractYarnData(Yarn14),
    extractYarnData(Yarn15),
  ];

  // Ensure each Yarn field is valid (checking if each is an object and then parsing it)
  const yarnValuesParsed = yarnValues.map((yarn) => {
    if (yarn) {
      return JSON.stringify(yarn);
    }
    return null; // Return null if yarn is invalid or empty
  });

  // SQL query to insert yarn usage data
  const query = `
    INSERT INTO yarn_usage 
    (RSN, MatchingName, Yarn1, Yarn2, Yarn3, Yarn4, Yarn5, Yarn6, Yarn7, Yarn8, Yarn9, Yarn10, Yarn11, Yarn12, Yarn13, Yarn14, Yarn15, UserId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();
    const [newYarnUsage] = await connection.query(query, [
      RSN,
      MatchingName,
      ...yarnValuesParsed,
      UserId,
    ]);
    await connection.commit();

    // Send a successful response
    res.status(200).json({
      success: true,
      message: "Yarn usage details added successfully",
      RSN: newYarnUsage.insertId,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error inserting Yarn Usage data:", error);
    res.status(500).json({
      success: false,
      message: `Error inserting Yarn Usage data: ${error.message}`,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { addYarnUsage };
