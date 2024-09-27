const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Use path from environment variable or default to a specific path
const uploadDirectory = path.resolve(process.env.UPLOAD_DIR || 'Fichier');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
