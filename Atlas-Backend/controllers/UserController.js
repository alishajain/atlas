const bcrypt = require('bcryptjs');
const db = require("../db/database");

// Hash the password before saving it
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

// Add new user (with hashed password)
const addUser = async (req, res) => {
  const { UserID, EmpID, Password } = req.body;
  
  if (!UserID || !EmpID || !Password) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: UserID, EmpID, and Password are required.",
    });
  }

  try {
    // Hash the password before saving it
    const hashedPassword = await hashPassword(Password);

    // Insert new user into the database with hashed password
    const result = await db.query(
      "INSERT INTO users (UserID, EmpID, Password) VALUES (?, ?, ?)",
      [UserID, EmpID, hashedPassword]
    );

    // Return success response with the inserted user data
    res.status(201).json({
      success: true,
      id: result.insertId,
      UserID: UserID,
    });
  } catch (err) {
    console.error('Error while adding user:', err);
    res.status(500).json({
      success: false,
      message: "Server error while adding user.",
    });
  }
};

// Login user (check if the user exists and compare password)
const loginUser = async (req, res) => {
  const { UserID, Password } = req.body;

  if (!UserID || !Password) {
    return res.status(400).json({
      success: false,
      message: "UserID and Password are required.",
    });
  }

  try {
    // Check if the user exists
    const [user] = await db.query("SELECT UserID, Password FROM users WHERE UserID = ?", [UserID]);

    // If no user found, return an error
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // If password is missing, handle this case
    if (!user[0].Password) {
      return res.status(404).json({
        success: false,
        message: "Password not set for the user.",
      });
    }

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(Password, user[0].Password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful.",
      UserID: user[0].UserID,
    });
  } catch (err) {
    console.error('Error while logging in:', err);
    res.status(500).json({
      success: false,
      message: "Server error while logging in.",
    });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  addUser,
  loginUser,
  getUsers,
};
