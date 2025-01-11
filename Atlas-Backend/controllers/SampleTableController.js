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
  const RSN = req.params.RSN;

  try {
    const [rows] = await db.query('SELECT * FROM sample_details WHERE RSN = ?', [RSN]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Sample record not found." });
    }

    res.status(200).json({ success: true, data: rows[0] });
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
    userId,
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
    !sampleStatus ||
    !userId
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // SQL query for updating the record
    const query = `
      UPDATE sample_details 
      SET ArticleName=?, DesignFileNo=?, SeriesArticleFileNo=?, ArticleType=?, Gender=?, 
          MachineSpeed=?, Designer=?, Grapher=?, SampleMaster=?, SampleStatus=?, userId=? 
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
      userId,
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
    userId,
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
    !sampleStatus ||
    !userId
  ) {
    return res.status(400).json({ message: "All fields are required." }); 
  }

  let connection;
  try {
    // Get a connection from the pool
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Insert into the sample_details table
    const [newSampleDetails] = await connection.query(
      "INSERT INTO sample_details (ArticleName, DesignFileNo, SeriesArticleFileNo, ArticleType, Gender, MachineSpeed, Designer, Grapher, SampleMaster, SampleStatus, UserId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        userId,
      ]
    );

    // Commit the transaction
    await connection.commit();

    res
      .status(200)
      .json({
        success: true,
        message: "Sample details added successfully",
        RSN: newSampleDetails.insertId,
      });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error inserting sample data:", error);
    res
      .status(500)
      .json({
        success: false,
        message: `Error inserting sample data: ${error.message}`,
      });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// New function to fetch the latest RSN (auto-incremented value)
const getLatestRSN = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT MAX(RSN) AS RSN FROM sample_details');
    const latestRSN = rows[0].RSN + 1; 
    res.json({ success: true, RSN: latestRSN });
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
  try {
    const { ArticleNo } = req.body;  
    const { RSN } = req.params;

    // Validate the inputs
    if (!ArticleNo || !RSN) {
      return res.status(400).json({
        message: "RSN and ArticleNo are required fields."
      });
    }

    // Prepare the query to update the ArticleNo where RSN matches
    const query = `UPDATE sample_details SET ArticleNo = ? WHERE RSN = ?`;

    // Execute the query
    const [results] = await db.query(query, [ArticleNo, RSN]);

    // Check if any rows were updated
    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: "No record found with the provided RSN."
      });
    }

    // Respond with success
    return res.status(200).json({
      message: "ArticleNo updated successfully."
    });

  } catch (error) {
    console.error("Error updating ArticleNo:", error);
    return res.status(500).json({
      message: "Error updating ArticleNo."
    });
  }
};

module.exports = {
  getSampleDetailsData,
  addSampleDetails,
  updateSampleRecord,
  getSampleDetailsByRSN,
  getLatestRSN,
  deleteSample,
  updateArticleNo,
};
