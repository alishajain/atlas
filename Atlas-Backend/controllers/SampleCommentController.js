const db = require('../db/database');

// Controller function to add a comment using async/await
const addComment = async (req, res) => {
  const { RSN, UserId, Comments } = req.body;

  // Validate input fields
  if (!RSN || !UserId || !Comments) {
    return res.status(400).json({ error: 'All fields (RSN, UserId, Comments) are required' });
  }

  // SQL query to insert a new comment into the sample_comments table
  const query = 'INSERT INTO sample_comments (RSN, UserId, Comments) VALUES (?, ?, ?)';

  try {
    // Using promise wrapper for the database query to work with async/await
    const result = await new Promise((resolve, reject) => {
      db.query(query, [RSN, UserId, Comments], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return res.status(201).json({ message: 'Comment added successfully', data: result });
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Controller function to get all comments by RSN
const getComments = async (req, res) => {
  const { RSN } = req.params;

  // Log the received RSN for debugging
  console.log("Received RSN:", RSN);
  console.log("Alisha");

  // Validate if RSN is provided
  if (!RSN) {
    return res.status(400).json({ error: 'RSN is required' });
  }

  const query = 'SELECT Comments FROM sample_comments WHERE RSN = ?';

  try {
    // Use await with mysql2's promise-based query method
    const [results] = await db.query(query, [RSN]);

    console.log('Query Results:', results); // Log query results for debugging

    // Check if comments are found
    if (results.length === 0) {
      return res.status(404).json({ message: 'No comments found for the given RSN' });
    }

    // Return the fetched comments as response
    return res.status(200).json({ data: results });

  } catch (err) {
    // Handle error if the query fails
    console.error('Error fetching comments:', err);
    return res.status(500).json({ error: 'Failed to fetch comments' });
  }
};


module.exports = {
  addComment,
  getComments
};
