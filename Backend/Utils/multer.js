const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define accepted mime types
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];

const allowedTypes = [...IMAGE_TYPES, ...VIDEO_TYPES];

// Helper to create folder if it doesn't exist
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Get folder based on field name or route type
const getDestinationFolder = (fieldname) => {
  switch (fieldname) {
    case 'profilePicture':
      return path.join(__dirname, '../media/profilePictures');
    case 'postMedia':
      return path.join(__dirname, '../media/posts');
    case 'LocationImage':
      return path.join(__dirname, '../media/plantationRequests');
    case 'fulfillmentMedia':
      return path.join(__dirname, '../media/requestFulfillments');
    default:
      return path.join(__dirname, '../media/misc');
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = getDestinationFolder(file.fieldname);
    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only image and video files are allowed'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100 MB max
  }
});

module.exports = upload;
