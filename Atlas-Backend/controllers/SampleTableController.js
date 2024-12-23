const db = require("../db/database");

// Fetch data from Sample_Details table
const getSampleDetailsData = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM sample_details");
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Return error response if query fails
  }
};

// Controller to fetch knitting details by RSN
const getSampleDetailsByRSN = async (req, res) => {
  const RSN = req.params.RSN; // Get RSN from URL parameters

  try {
    const [rows] = await db.query('SELECT * FROM sample_details WHERE RSN = ?', [RSN]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Sample record not found." });
    }

    res.status(200).json({ success: true, data: rows[0] }); // Return the first record (should be unique by RSN)
  } catch (err) {
    console.error("Error fetching sample details:", err);
    res.status(500).json({ success: false, message: "Error fetching sample details.", error: err.message });
  }
};

// Controller function to update a record
const updateSampleRecord = async (req, res) => {
  const {
    RSN,
    articleName,
    designFileNo,
    seriesArticleFileNo,
    articleType,
    gender,
    machineSpeed,
    designer,
    grapher,
    master,
    sampleStatus,
  } = req.body;

  // Check if RSN and other required fields are provided
  if (
    !RSN ||
    !articleName ||
    !designFileNo ||
    !seriesArticleFileNo ||
    !articleType ||
    !gender ||
    !machineSpeed ||
    !designer ||
    !grapher ||
    !master ||
    !sampleStatus
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // SQL query for updating the record
    const query = `
      UPDATE sample_details 
      SET ArticleName=?, DesignFileNo=?, SeriesArticleFileNo=?, ArticleType=?, Gender=?, 
          MachineSpeed=?, Designer=?, Grapher=?, SampleMaster=?, SampleStatus=? 
      WHERE RSN = ?`;

    // Execute the query with parameters
    const [result] = await db.execute(query, [
      articleName,
      designFileNo,
      seriesArticleFileNo,
      articleType,
      gender,
      machineSpeed,
      designer,
      grapher,
      master,
      sampleStatus,
      RSN,
    ]);

    // If no rows were affected, return 404
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Success response
    res.status(200).json({ message: "Record updated successfully" });
  } catch (error) {
    // Log the error and return a server error response
    console.error(error);
    res.status(500).json({ message: "Error updating record" });
  }
};

// Add Sample Details
const addSampleDetails = async (req, res) => {
  const {
    articleName,
    designFileNo,
    seriesArticleFileNo,
    articleType,
    gender,
    machineSpeed,
    designer,
    grapher,
    master,
    sampleStatus,
  } = req.body;

  // Validate input fields
  if (
    !articleName ||
    !designFileNo ||
    !seriesArticleFileNo ||
    !articleType ||
    !gender ||
    !machineSpeed ||
    !designer ||
    !grapher ||
    !master ||
    !sampleStatus
  ) {
    return res.status(400).json({ message: "All fields are required." }); // Return an error if any field is missing
  }

  let connection;
  try {
    // Get a connection from the pool
    connection = await db.getConnection();
    await connection.beginTransaction(); // Begin a transaction

    // Insert into the sample_details table
    const [newSampleDetails] = await connection.query(
      "INSERT INTO sample_details (ArticleName, DesignFileNo, SeriesArticleFileNo, ArticleType, Gender, MachineSpeed, Designer, Grapher, SampleMaster, SampleStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        articleName,
        designFileNo,
        seriesArticleFileNo,
        articleType,
        gender,
        machineSpeed,
        designer,
        grapher,
        master,
        sampleStatus,
      ]
    );

    // Commit the transaction
    await connection.commit();

    // Send a successful response with the RSN (insertId is the auto-incremented RSN)
    res
      .status(200)
      .json({
        success: true,
        message: "Sample details added successfully",
        RSN: newSampleDetails.insertId, // Send back the generated RSN
      });
  } catch (error) {
    // Rollback if an error occurs
    if (connection) {
      await connection.rollback();
    }
    console.error("Error inserting sample data:", error); // Log the detailed error for debugging
    res
      .status(500)
      .json({
        success: false,
        message: `Error inserting sample data: ${error.message}`,
      }); // Send error response with message
  } finally {
    // Always release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
};

// New function to fetch the latest RSN (auto-incremented value)
const getLatestRSN = async (req, res) => {
  try {
    // Query to get the last inserted RSN (auto-incremented)
    const [rows] = await db.query('SELECT MAX(RSN) AS RSN FROM sample_details');
    const latestRSN = rows[0].RSN + 1; // Increment by 1 to get the next RSN
    res.json({ success: true, RSN: latestRSN }); // Return the next available RSN
  } catch (err) {
    console.error("Error fetching latest RSN:", err);
    res.status(500).json({ success: false, message: "Error fetching latest RSN", error: err.message });
  }
};

// Delete Sample Details by RSN
const deleteSample = async (req, res) => {
  const RSN = req.params.RSN;
  try {
    const query = "DELETE FROM sample_details WHERE RSN = ?";

    const [result] = await db.execute(query, [RSN]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Sample record not found." });
    }

    res.status(200).json({ success: true, message: "Sample record deleted successfully" });
  } catch (err) {
    console.error("Error deleting sample record:", err);
    res.status(500).json({ success: false, message: "Error deleting sample record", error: err.message });
  }
};

const updateArticleNo = async (req, res) => {

}

module.exports = {
  getSampleDetailsData,
  addSampleDetails,
  updateSampleRecord,
  getSampleDetailsByRSN,
  getLatestRSN,
  deleteSample,
  updateArticleNo,
};
