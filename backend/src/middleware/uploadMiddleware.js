const multer = require('multer');
const fs = require('fs');

// TODO: switch to Cloudinary once API keys are available
// For now, use local disk storage since Cloudinary API credentials are not set up.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = 'uploads/';
    if (file.fieldname === 'file') {
      dest = 'uploads/reports/';
    } else if (file.fieldname === 'photo') {
      dest = 'uploads/photos/';
    } else if (file.fieldname === 'idProof') {
      dest = 'uploads/id_proofs/';
    }
    // Ensure destination directory exists
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Configure Multer limits (max 20MB)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024 
  }
});

module.exports = upload;
