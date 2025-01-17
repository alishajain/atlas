const db = require("../db/database");

const addOrderYarn = async (req, res) => {
  const {
    OrderNo,
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
    Yarn16,
    Yarn17,
    Yarn18,
    Yarn19,
    Yarn20,
    Yarn21,
    Yarn22,
    Yarn23,
    Yarn24,
    Yarn25,
    Yarn26,
    Yarn27,
    Yarn28,
    Yarn29,
    Yarn30,
  } = req.body;

  // Validate required fields
  if (!OrderNo || !MatchingName || !UserId || !Yarn1) {
    return res.status(400).json({
      message: 'Missing required fields: OrderNo, MatchingName, UserId, and Yarn1 are required.'
    });
  }

  // Prepare the yarn values dynamically, making sure to handle missing yarn values
  const yarnValues = [
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
    Yarn16,
    Yarn17,
    Yarn18,
    Yarn19,
    Yarn20,
    Yarn21,
    Yarn22,
    Yarn23,
    Yarn24,
    Yarn25,
    Yarn26,
    Yarn27,
    Yarn28,
    Yarn29,
    Yarn30
  ].map(yarn => yarn ? JSON.stringify(yarn) : null); // Convert to JSON strings if not null, otherwise null

  // Fill the rest with nulls if there are less than 30 yarn values
  while (yarnValues.length < 30) {
    yarnValues.push(null);
  }

  // Prepare the SQL query
  const query = `
    INSERT INTO order_yarn_req (
      OrderNo,
      MatchingName,
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
      Yarn16,
      Yarn17,
      Yarn18,
      Yarn19,
      Yarn20,
      Yarn21,
      Yarn22,
      Yarn23,
      Yarn24,
      Yarn25,
      Yarn26,
      Yarn27,
      Yarn28,
      Yarn29,
      Yarn30,
      UserId
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Combine all values into a single array
  const values = [
    OrderNo,
    MatchingName,
    ...yarnValues, // Spread the yarn values here
    UserId
  ];

  try {
    // Execute the query
    const result = await db.query(query, values);
    res.status(201).json({
      message: 'Order Yarn Request added successfully',
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error adding Order Yarn Request',
      error: err.message
    });
  }
};

// Controller function to search order yarn data by OrderNo
const searchOrderYarnByOrderNo = async (req, res) => {
  const { OrderNo } = req.params;

  // Validate that OrderNo is provided
  if (!OrderNo) {
    return res.status(400).json({
      message: 'OrderNo is required to search for order yarn details.'
    });
  }

  // Prepare the SQL query to fetch order yarn data by OrderNo
  const query = `
    SELECT * FROM order_yarn_req WHERE OrderNo = ?
  `;

  try {
    // Execute the query with the provided OrderNo
    const [result] = await db.execute(query, [OrderNo]);

    // Check if any order yarn data is found
    if (result.length === 0) {
      return res.status(404).json({
        message: 'No order yarn data found for the given OrderNo.'
      });
    }

    // Return the search result
    res.status(200).json({
      message: 'Order yarn data retrieved successfully',
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Error retrieving order yarn data',
      error: err.message
    });
  }
};

module.exports = { searchOrderYarnByOrderNo, addOrderYarn };
