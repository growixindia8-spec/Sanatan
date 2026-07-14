const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');
const upload = require('../middleware/uploadMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post(
  '/register',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'idProof', maxCount: 1 },
    { name: 'aadhaarFront', maxCount: 1 },
    { name: 'aadhaarBack', maxCount: 1 },
    { name: 'selfie', maxCount: 1 }
  ]),
  memberController.registerMember
);

router.post(
  '/:id/confirm-payment',
  upload.single('paymentScreenshot'),
  memberController.confirmPayment
);

router.get('/verify/:memberId', memberController.verifyPublicMember);
router.get('/:id/receipt', memberController.getReceiptPdf);
router.post('/create-order', memberController.createMembershipOrder);
router.post('/verify-payment', memberController.verifyMembershipPayment);

// User-facing applications and mock payment routes
router.get('/my-applications', protect, memberController.getMyApplications);

// DEV ONLY: Conditional registration for mark-paid-test
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  router.patch('/:id/mark-paid-test', memberController.markPaidTest);
}

// Coordinator/Admin routes
router.patch('/:id/approve', protect, authorize('admin'), memberController.approveMember);
router.patch('/:id/reject', protect, authorize('admin'), memberController.rejectMember);

module.exports = router;
