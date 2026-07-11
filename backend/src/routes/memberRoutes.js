const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const upload = require('../middleware/uploadMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post(
  '/register',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'idProof', maxCount: 1 }
  ]),
  memberController.registerMember
);

router.post(
  '/:id/confirm-payment',
  upload.single('paymentScreenshot'),
  memberController.confirmPayment
);

router.get('/verify/:memberId', memberController.verifyPublicMember);

// Coordinator/Admin routes
router.patch('/:id/approve', protect, authorize('admin'), memberController.approveMember);
router.patch('/:id/reject', protect, authorize('admin'), memberController.rejectMember);

module.exports = router;
