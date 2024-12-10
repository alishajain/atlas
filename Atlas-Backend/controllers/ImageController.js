const fs = require('fs');
const path = require('path');
const db = require('../db/database');
const multer = require('multer');

// Set up multer for file uploads to the 'uploads' folder
const uploadDir = path.join(__dirname, '..', 'uploads'); // Assuming uploads is in the root of the project
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create 'uploads' folder if it doesn't exist
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save file to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Set the filename as the original name with a timestamp to avoid overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Filename pattern
  }
});

const upload = multer({ storage: storage });

// Function to upload image
const uploadImage = (req, res) => {
  // Ensure a file is uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { imageName, RSN } = req.body; // Extract imageName and RSN from the body
  if (!imageName) {
    return res.status(400).json({ message: "Image name is required" });
  }
  if (!RSN) {
    return res.status(400).json({ message: "RSN is required" });
  }

  const imageData = path.join('uploads', req.file.filename); // Path to the saved image

  // Database query to insert image information into the database
  const query = "INSERT INTO sample_images (RSN, ImageName, ImageData) VALUES (?, ?, ?)";
  db.query(query, [RSN, imageName, imageData], (err, result) => {
    if (err) {
      console.error("Error uploading image:", err);
      return res.status(500).json({ message: "Error uploading image" });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      RSN: result.insertId, // Return the generated RSN from the database (if auto-incremented)
      imageData: imageData, // Send the path of the uploaded image
    });
  });
};

// Function to fetch image
const getImage = async (req, res) => {
  const { RSN } = req.params; // Extract RSN from URL parameters
  
  const query = "SELECT ImageName, ImageData FROM sample_images WHERE RSN = ?";
  
  try {
    // Await the result of the query execution
    const [rows] = await db.query(query, [RSN]);

    // If no records are found for the given RSN
    if (rows.length === 0) {
      console.log('No image found for RSN:', RSN); // Debugging log
      return res.status(404).json({ message: "Image not found" });
    }

    const { ImageName, ImageData } = rows[0];
    
    // Return the image details as JSON (ImageName and ImageData)
    res.json({
      ImageName,
      ImageData: ImageData.toString("base64"), // Send image data as base64 string
    });
  } catch (err) {
    // Catch any errors during query execution
    console.error("Error fetching image:", err);
    return res.status(500).json({ message: "Error fetching image" });
  }
};

module.exports = {
  uploadImage,
  getImage,
  upload
};
