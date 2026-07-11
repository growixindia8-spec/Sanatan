const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

router.get('/:documentType/:credentialNumber', verificationController.verifyDocument);

module.exports = router;
