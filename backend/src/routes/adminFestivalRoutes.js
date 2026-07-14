const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');
const { protect } = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleCheck.middleware');

// Protected admin routes
router.get('/', protect, requireRole('admin'), festivalController.adminGetFestivals);
router.post('/', protect, requireRole('admin'), festivalController.adminCreateFestival);
router.put('/:id', protect, requireRole('admin'), festivalController.adminUpdateFestival);
router.delete('/:id', protect, requireRole('admin'), festivalController.adminDeleteFestival);
router.patch('/:id/status', protect, requireRole('admin'), festivalController.adminPatchFestivalStatus);

module.exports = router;
