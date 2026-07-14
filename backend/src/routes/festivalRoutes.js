const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');

// Public read routes
router.get('/', festivalController.getFestivals);
router.get('/upcoming', festivalController.getUpcomingFestivals);
router.get('/home', festivalController.getHomeFestivals);

module.exports = router;
