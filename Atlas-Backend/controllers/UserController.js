const bcrypt = require('bcryptjs');
const db = require("../db/database");

// Hash the password before saving it
const hashPassword = async (password) => {
  const saltRounds = 10; // Salt rounds for bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Add new user (with hashed password)
const addUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword = await hashPassword(password);

    // Insert new user into the database with hashed password
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    // Respond with the new user data (excluding password)
    res.status(201).json({
      id: result.insertId,
      username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, username FROM users");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addUser,
  getUsers,
};
