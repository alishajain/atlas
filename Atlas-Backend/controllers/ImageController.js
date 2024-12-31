const fs = require("fs");
const path = require("path");
const db = require("../db/database"); // Ensure this path is correct based on your project structure
const multer = require("multer");

// Set up the 'uploads' directory for storing uploaded files
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create the upload middleware for handling single file uploads with the field name 'Image'
const upload = multer({ storage: storage }).single("Image");

// Function to handle image upload
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const { ImageName, UserId, RSN } = req.body;
    const imageData = path.join("uploads", req.file.filename);

    // Insert image data into the database
    const query =
      "INSERT INTO sample_images (ImageName, ImageData, UserId, RSN) VALUES (?, ?, ?, ?)";

    const [results] = await db.query(query, [
      ImageName,
      imageData,
      UserId,
      RSN,
    ]);
    console.log("Image uploaded to database successfully!");

    // Return the result to the client
    res.status(200).json({
      message: "Image uploaded successfully",
      data: results,
    });
  } catch (error) {
    console.error("Error during image upload:", error);
    return res.status(500).json({ message: "Error uploading image" });
  }
};

// Function to fetch image by RSN
const getImage = async (req, res) => {
  try {
    const { RSN } = req.params;

    const query =
      "SELECT ImageName, ImageData FROM sample_images WHERE RSN = ?";

    // Execute the query to fetch image data
    const [results] = await db.query(query, [RSN]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ data: results });
  } catch (error) {
    // Handle errors in query execution
    console.error("Error fetching image:", error);
    return res.status(500).json({ message: "Error fetching image" });
  }
};

// Export the upload middleware and functions to be used in routes
module.exports = { uploadImage, getImage, upload };
