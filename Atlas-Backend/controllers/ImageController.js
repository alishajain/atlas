const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../db/database');

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads'; // Local directory to store uploaded files
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir); // Create directory if it doesn't exist
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with unique name
  },
});

const upload = multer({ storage: storage });

// Function to handle image upload
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Path to the image
  const imagePath = `/uploads/${req.file.filename}`;

  // Store the file path in MySQL
  const query = 'INSERT INTO sample_images (image_path) VALUES (?)';
  db.query(query, [imagePath], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving image path to database');
    }

    res.status(200).send({ message: 'Image uploaded successfully', imagePath });
  });
};

// Function to fetch all uploaded images
const getImages = (req, res) => {
  const query = 'SELECT * FROM sample_images';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error fetching images');
    }
    res.status(200).json(results);
  });
};

// Export the functions to be used in routes
module.exports = {
  uploadImage,
  getImages,
  upload: upload.single('image') // Multer middleware for single image upload
};
