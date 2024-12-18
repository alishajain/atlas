const db = require("../db/database");

// Create a new color matching entry
const addColorMatching = async (req, res) => {
  const { ColorId, RSN, MatchingName, Panel } = req.body;
  console.log(ColorId, RSN, MatchingName, Panel);

  // Validate input data
  if (!ColorId || !RSN || !MatchingName || !Panel) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query = `INSERT INTO color_matching (ColorId, RSN, MatchingName, Panel) VALUES (?, ?, ?, ?)`;

    // Await the database query
    const [results] = await db.query(query, [ColorId, RSN, MatchingName, Panel]);

    res.status(201).json({
      message: "Color matching entry created successfully",
      data: results,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error inserting data" });
  }
};

// Get all color matching entries
const getAllColorMatching = async (req, res) => {
  try {
    const query = "SELECT * FROM color_matching";

    // Await the database query
    const [results] = await db.query(query);

    res.status(200).json({ data: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching data" });
  }
};

// Get a single color matching entry by RSN
const getColorMatchingByRSN = async (req, res) => {
  const { RSN } = req.params;

  try {
    const query = "SELECT * FROM color_matching WHERE RSN = ?";

    // Await the database query
    const [results] = await db.query(query, [RSN]);

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Color matching entry not found" });
    }

    res.status(200).json({ data: results[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching data" });
  }
};

// Update an existing color matching entry
const updateColorMatching = async (req, res) => {
  const { RSN } = req.params;
  const { ColorId, MatchingName, Panel } = req.body;

  // Validate input data
  if (!ColorId || !MatchingName || !Panel) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const query = `UPDATE color_matching SET ColorId = ?, MatchingName = ?, Panel = ? WHERE RSN = ?`;

    // Await the database query
    const [results] = await db.query(query, [ColorId, MatchingName, Panel, RSN]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Color matching entry not found" });
    }

    res
      .status(200)
      .json({ message: "Color matching entry updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating data" });
  }
};

// Delete a color matching entry
const deleteColorMatching = async (req, res) => {
  const { RSN } = req.params;

  try {
    const query = "DELETE FROM color_matching WHERE RSN = ?";

    // Await the database query
    const [results] = await db.query(query, [RSN]);

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Color matching entry not found" });
    }

    res
      .status(200)
      .json({ message: "Color matching entry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting data" });
  }
};

// Export functions using module.exports
module.exports = {
  addColorMatching,
  getAllColorMatching,
  getColorMatchingByRSN,
  updateColorMatching,
  deleteColorMatching,
};