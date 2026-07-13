const express = require('express');
const router = express.Router();
const portalController = require('../controllers/portalController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleCheck.middleware');

// Dashboard summary stats
router.get('/dashboard-stats', protect, requireRole('coordinator', 'admin'), portalController.getDashboardStats);

// Profile management
router.get('/profile', protect, portalController.getProfile);
router.put('/profile', protect, portalController.updateProfile);

// Membership internal search/verification tool
router.get('/verify-membership', protect, requireRole('coordinator', 'admin'), portalController.verifyMembership);

// Notifications endpoints
router.get('/notifications', protect, requireRole('coordinator', 'admin'), portalController.getNotifications);
router.patch('/notifications/:id/read', protect, requireRole('coordinator', 'admin'), portalController.markNotificationRead);
router.post('/notifications', protect, requireRole('admin'), portalController.createNotification);

// Financial Reports upload and retrieval
router.post(
  '/financial-reports',
  protect,
  requireRole('admin'),
  upload.single('file'),
  portalController.uploadFinancialReport
);
router.get('/financial-reports', protect, requireRole('coordinator', 'admin'), portalController.getFinancialReports);

// Membership application approvals
router.get('/memberships', protect, requireRole('coordinator', 'admin'), portalController.getMemberships);
router.patch('/memberships/:id/approve', protect, requireRole('coordinator', 'admin'), portalController.approveMembership);
router.patch('/memberships/:id/reject', protect, requireRole('coordinator', 'admin'), portalController.rejectMembership);

// Fundraiser application approvals
router.get('/fundraisers', protect, requireRole('coordinator', 'admin'), portalController.getFundraisers);
router.patch('/fundraisers/:id/approve', protect, requireRole('coordinator', 'admin'), portalController.approveFundraiser);
router.patch('/fundraisers/:id/reject', protect, requireRole('coordinator', 'admin'), portalController.rejectFundraiser);

module.exports = router;
