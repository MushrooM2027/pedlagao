const express = require('express');
const router = express.Router();
const upload = require('../Utils/multer');

// Test file upload route
router.post('/test-upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'File uploaded successfully!',
    filename: req.file.filename,
    path: req.file.path,
    mimetype: req.file.mimetype
  });
});

module.exports = router;
