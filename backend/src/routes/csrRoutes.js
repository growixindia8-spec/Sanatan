const express = require('express');
const router = express.Router();
const csrController = require('../controllers/csrController');

router.post('/enquiry', csrController.submitCsrEnquiry);

module.exports = router;
