const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const upload = require('../middleware/uploadMiddleware');

router.post('/submit', upload.single('evidence'), complaintController.submitComplaint);

module.exports = router;
