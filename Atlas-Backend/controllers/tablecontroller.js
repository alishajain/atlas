const db = require('../db/database'); // Assuming this is the connection pool

// Fetch data from Sample_Details table
const getSampleDetailsData = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM sample_details');
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });  // Return error response if query fails
  }
};

// Controller function to update a record
const updateRecord = async (req, res) => {
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
    sampleStatus 
  } = req.body;

  // Check if RSN and other required fields are provided
  if (!RSN || !articleName || !designFileNo || !seriesArticleFileNo || !articleType || !gender || 
      !machineSpeed || !designer || !grapher || !master || !sampleStatus) {
    return res.status(400).json({ message: 'Missing required fields' });
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
      RSN
    ]);

    // If no rows were affected, return 404
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Success response
    res.status(200).json({ message: 'Record updated successfully' });
  } catch (error) {
    // Log the error and return a server error response
    console.error(error);
    res.status(500).json({ message: 'Error updating record' });
  }
};


// Fetch data from Knitting_Details table
const getKnittingDetailsData = (req, res) => {
  try {
    const [results] = db.query('SELECT * FROM knitting_details');
    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ error: err.message });  // Return error response if query fails
  }
};

// Add Sample Details
const addSampleDetails = async (req, res) => {
  const { articleName, designFileNo, seriesArticleFileNo, articleType, gender, machineSpeed, designer, grapher, master, sampleStatus } = req.body;

  // Validate input fields
  if (!articleName || !designFileNo || !seriesArticleFileNo || !articleType || !gender || !machineSpeed || !designer || !grapher || !master || !sampleStatus) {
    return res.status(400).json({ message: 'All fields are required.' });  // Return an error if any field is missing
  }

  let connection;
  try {
    // Get a connection from the pool
    connection = await db.getConnection();
    await connection.beginTransaction(); // Begin a transaction

    // Insert into the sample_details table
    const [newSampleDetails] = await connection.query(
      'INSERT INTO sample_details (ArticleName, DesignFileNo, SeriesArticleFileNo, ArticleType, Gender, MachineSpeed, Designer, Grapher, SampleMaster, SampleStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [articleName, designFileNo, seriesArticleFileNo, articleType, gender, machineSpeed, designer, grapher, master, sampleStatus]
    );

    // Commit the transaction
    await connection.commit();

    // Send a successful response
    res.status(200).json({ success: true, message: 'Sample details added successfully', RSN: newSampleDetails.insertId });
  } catch (error) {
    // Rollback if an error occurs
    if (connection) {
      await connection.rollback();
    }
    console.error('Error inserting sample data:', error);  // Log the detailed error for debugging
    res.status(500).json({ success: false, message: `Error inserting sample data: ${error.message}` });  // Send error response with message
  } finally {
    // Always release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
};

module.exports = {
  getSampleDetailsData,
  getKnittingDetailsData,
  addSampleDetails,
  updateRecord,
};
