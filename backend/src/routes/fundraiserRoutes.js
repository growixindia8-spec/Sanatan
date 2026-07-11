const express = require('express');
const router = express.Router();
const fundraiserController = require('../controllers/fundraiserController');
const upload = require('../middleware/uploadMiddleware');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post(
  '/submit',
  upload.fields([
    { name: 'photoVideo', maxCount: 1 },
    { name: 'idProof', maxCount: 1 },
    { name: 'supportingDocs', maxCount: 5 }
  ]),
  fundraiserController.submitFundraiser
);

router.get('/active', fundraiserController.getActiveFundraisers);

// Admin-level endpoints
router.patch('/:id/approve', protect, authorize('admin'), fundraiserController.approveFundraiser);
router.patch('/:id/update-raised-amount', protect, authorize('admin'), fundraiserController.updateRaisedAmount);

module.exports = router;
