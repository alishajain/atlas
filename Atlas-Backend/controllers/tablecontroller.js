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
};
