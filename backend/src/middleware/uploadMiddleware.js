const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sanatan_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf', 'docx'],
    resource_type: 'auto'
  }
});

// Configure Multer limits (individual file checks are enforced at endpoint-level if custom size caps apply)
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB max file size default limit
  }
});

module.exports = upload;
