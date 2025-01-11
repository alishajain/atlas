const db = require("../db/database");

const addArticleMaster = async (req, res) => {
  const {
    RSN,
    ArticleNo,
    Freesize,
    XS,
    S,
    M,
    L,
    XL,
    "2XL": TwoXL,
    "3XL": ThreeXL,
    "4XL": FourXL,
    "5XL": FiveXL,
    UserId,
  } = req.body;

  // Validate input data
  if (!RSN || !ArticleNo || !UserId) {
    return res.status(400).json({
      message: "RSN, ArticleNo, and UserId are mandatory fields.",
    });
  }

  let connection;
  try {
    // Get a connection from the pool
    connection = await db.getConnection();
    await connection.beginTransaction();

    // Prepare the query to insert the data
    const query = `
      INSERT INTO article_master (
        RSN, ArticleNo, Freesize, XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL, UserId
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Insert the data into the database
    const [results] = await connection.query(
      query,
      [
        RSN,
        ArticleNo,
        Freesize || null,
        XS || null,
        S || null,
        M || null,
        L || null,
        XL || null,
        TwoXL || null,
        ThreeXL || null,
        FourXL || null,
        FiveXL || null,
        UserId,
      ]
    );

    await connection.commit();

    res.status(201).json({
      success: true,
      message: "Article master data added successfully",
      data: results,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error inserting article master data:", error);
    res.status(500).json({
      success: false,
      message: `Error inserting article master data: ${error.message}`,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { addArticleMaster };
