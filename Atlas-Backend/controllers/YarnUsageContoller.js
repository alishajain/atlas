const db = require("../db/database");

// Function to create a new yarn usage entry
const addYarnUsage = async (req, res) => {
  try {
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
      return res
        .status(400)
        .json({
          message:
            "Missing required fields: RSN, MatchingName, UserId, and Yarn1 are mandatory.",
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

    // Convert YarnId and Weight for insertion (or NULL if not present)
    const yarnValuesPrepared = yarnValues.map((yarn) => {
      return yarn ? JSON.stringify(yarn) : null;
    });

    // SQL query to insert yarn usage data
    const query = `
      INSERT INTO yarn_usage 
      (RSN, MatchingName, Yarn1, Yarn2, Yarn3, Yarn4, Yarn5, Yarn6, Yarn7, Yarn8, Yarn9, Yarn10, Yarn11, Yarn12, Yarn13, Yarn14, Yarn15, UserId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert the data into the database
    db.query(
      query,
      [RSN, MatchingName, ...yarnValuesPrepared, UserId],
      (err, results) => {
        if (err) {
          console.error("Error inserting data into yarn_usage:", err);
          return res
            .status(500)
            .json({ message: "Error inserting data into database" });
        }

        // Respond with success
        return res.status(201).json({
          message: "Data added successfully",
          data: results,
        });
      }
    );

  } catch (error) {
    console.error("Error in addYarnUsage controller:", error);
    return res.status(500).json({ message: "Error adding yarn usage" });
  }
};

module.exports = { addYarnUsage };
