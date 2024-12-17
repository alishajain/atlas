const db = require("../db/database");

// Function to create a new color detail entry
const addColorDetail = async (req, res) => {
  const {
    ColorId,
    Size,
    BaseColor,
    Color1,
    Color2,
    Color3,
    Color4,
    Color5,
    Color6,
    Color7,
    Color8,
    Color9,
    Color10,
    Color11,
    Color12,
    Color13,
    Color14,
  } = req.body;

  try {
    const query = `
      INSERT INTO color_details (ColorId, Size, BaseColor, Color1, Color2, Color3, Color4, Color5, Color6, Color7, Color8, Color9, Color10, Color11, Color12, Color13, Color14)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      ColorId, Size, JSON.stringify(BaseColor), JSON.stringify(Color1), JSON.stringify(Color2),
      JSON.stringify(Color3), JSON.stringify(Color4), JSON.stringify(Color5), JSON.stringify(Color6),
      JSON.stringify(Color7), JSON.stringify(Color8), JSON.stringify(Color9), JSON.stringify(Color10),
      JSON.stringify(Color11), JSON.stringify(Color12), JSON.stringify(Color13), JSON.stringify(Color14),
    ];

    await db.query(query, values);
    res.status(201).json({ message: "Color detail added successfully!" });
  } catch (error) {
    console.error("Error adding color detail:", error);
    res.status(500).json({ message: "Error adding color detail", error });
  }
};

// Function to get all color details
const getAllColorDetails = async (req, res) => {
  try {
    const query = "SELECT * FROM color_details";
    const result = await db.query(query);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching all color details:", error);
    res.status(500).json({ message: "Error fetching color details", error });
  }
};

// Function to get color detail by ColorId
const getColorDetailByColorId = async (req, res) => {
  const { ColorId } = req.params;

  try {
    const query = "SELECT * FROM color_details WHERE ColorId = ?";
    const result = await db.query(query, [ColorId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Color details not found" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error fetching color detail:", error);
    res.status(500).json({ message: "Error fetching color detail", error });
  }
};

// Function to update color detail by ColorId
const updateColorDetail = async (req, res) => {
  const { ColorId } = req.params;
  const {
    Size,
    BaseColor,
    Color1,
    Color2,
    Color3,
    Color4,
    Color5,
    Color6,
    Color7,
    Color8,
    Color9,
    Color10,
    Color11,
    Color12,
    Color13,
    Color14,
  } = req.body;

  try {
    const query = `
      UPDATE color_details
      SET Size = ?, BaseColor = ?, Color1 = ?, Color2 = ?, Color3 = ?, Color4 = ?, Color5 = ?, Color6 = ?, Color7 = ?, Color8 = ?, Color9 = ?, Color10 = ?, Color11 = ?, Color12 = ?, Color13 = ?, Color14 = ?
      WHERE ColorId = ?
    `;
    const values = [
      Size, JSON.stringify(BaseColor), JSON.stringify(Color1), JSON.stringify(Color2), JSON.stringify(Color3),
      JSON.stringify(Color4), JSON.stringify(Color5), JSON.stringify(Color6), JSON.stringify(Color7), JSON.stringify(Color8),
      JSON.stringify(Color9), JSON.stringify(Color10), JSON.stringify(Color11), JSON.stringify(Color12), JSON.stringify(Color13),
      JSON.stringify(Color14), ColorId,
    ];

    const result = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Color details not found" });
    }

    res.status(200).json({ message: "Color detail updated successfully!" });
  } catch (error) {
    console.error("Error updating color detail:", error);
    res.status(500).json({ message: "Error updating color detail", error });
  }
};

// Function to delete color detail by ColorId
const deleteColorDetail = async (req, res) => {
  const { ColorId } = req.params;

  try {
    const query = "DELETE FROM color_details WHERE ColorId = ?";
    const result = await db.query(query, [ColorId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Color detail not found" });
    }

    res.status(200).json({ message: "Color detail deleted successfully!" });
  } catch (error) {
    console.error("Error deleting color detail:", error);
    res.status(500).json({ message: "Error deleting color detail", error });
  }
};

module.exports = {
  addColorDetail,
  getAllColorDetails,
  getColorDetailByColorId,
  updateColorDetail,
  deleteColorDetail,
};
