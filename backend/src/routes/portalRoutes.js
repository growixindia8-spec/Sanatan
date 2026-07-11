const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');
const upload = require('../middleware/uploadMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');

// General coordinator / admin access
router.get('/dashboard', protect, authorize('coordinator', 'admin'), portalController.getDashboardStats);
router.get('/notifications', protect, authorize('coordinator', 'admin'), portalController.getNotifications);

// Upload report (Coordinator or Admin)
router.post(
  '/financial-report',
  protect,
  authorize('coordinator', 'admin'),
  upload.single('file'),
  portalController.uploadFinancialReport
);

module.exports = router;
