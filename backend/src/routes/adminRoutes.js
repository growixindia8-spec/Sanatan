const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleCheck.middleware');

// Middlewares shorthand
const adminOrSuperOrViewer = requireRole('admin', 'superadmin', 'viewer');
const adminOrSuper = requireRole('admin', 'superadmin');
const superadminOnly = requireRole('superadmin');

// 1. Admin Auth & Profile
router.get('/me', protect, adminOrSuperOrViewer, adminController.adminMe);
router.get('/dashboard/stats', protect, adminOrSuperOrViewer, adminController.getDashboardStats);

// 2. Donations Management
router.get('/donations', protect, adminOrSuperOrViewer, adminController.getDonations);
router.get('/donations/export', protect, adminOrSuperOrViewer, adminController.getDonations); // handled by query param exportCsv=true
router.get('/donations/:id', protect, adminOrSuperOrViewer, adminController.getDonation);
router.patch('/donations/:id', protect, adminOrSuper, adminController.updateDonation);
router.post('/donations/:id/notes', protect, adminOrSuper, adminController.addDonationNote);

// 3. Approved Members
router.get('/members', protect, adminOrSuperOrViewer, adminController.getMembers);
router.get('/members/export', protect, adminOrSuperOrViewer, adminController.getMembers); // handled by exportCsv=true
router.get('/members/:id', protect, adminOrSuperOrViewer, adminController.getMember);
router.post('/members', protect, adminOrSuper, adminController.createMember);
router.put('/members/:id', protect, adminOrSuper, adminController.updateMember);
router.patch('/members/:id/status', protect, adminOrSuper, adminController.updateMemberStatus);
router.delete('/members/:id', protect, adminOrSuper, adminController.deleteMember);

// 4. Membership Applications
router.get('/membership-applications', protect, adminOrSuperOrViewer, adminController.getMembershipApplications);
router.get('/membership-applications/export', protect, adminOrSuperOrViewer, adminController.getMembershipApplications); // handled by exportCsv=true
router.patch('/membership-applications/:id/approve', protect, adminOrSuper, adminController.approveMembership);
router.patch('/membership-applications/:id/reject', protect, adminOrSuper, adminController.rejectMembership);
router.patch('/membership-applications/:id/request-correction', protect, adminOrSuper, adminController.requestMembershipCorrection);
router.patch('/membership-applications/:id/payment-status', protect, adminOrSuper, adminController.updateMembershipPaymentStatus);
router.post('/membership-applications/:id/notes', protect, adminOrSuper, adminController.addMembershipNote);

// 5. Fundraisers
router.get('/fundraisers', protect, adminOrSuperOrViewer, adminController.getFundraisers);
router.put('/fundraisers/:id', protect, adminOrSuper, adminController.updateFundraiser);
router.patch('/fundraisers/:id/approve', protect, adminOrSuper, adminController.approveFundraiser);
router.patch('/fundraisers/:id/reject', protect, adminOrSuper, adminController.rejectFundraiser);
router.patch('/fundraisers/:id/status', protect, adminOrSuper, adminController.updateFundraiserStatus);
router.patch('/fundraisers/:id/feature', protect, adminOrSuper, adminController.featureFundraiser);
router.delete('/fundraisers/:id', protect, adminOrSuper, adminController.deleteFundraiser);

// 6. Complaints
router.get('/complaints', protect, adminOrSuperOrViewer, adminController.getComplaints);
router.patch('/complaints/:id/status', protect, adminOrSuper, adminController.updateComplaintStatus);
router.patch('/complaints/:id/assign', protect, adminOrSuper, adminController.assignComplaint);
router.post('/complaints/:id/notes', protect, adminOrSuper, adminController.addComplaintNote);
router.delete('/complaints/:id', protect, adminOrSuper, adminController.deleteComplaint);

// 7. CSR Enquiries
router.get('/csr-enquiries', protect, adminOrSuperOrViewer, adminController.getCsrEnquiries);
router.patch('/csr-enquiries/:id/status', protect, adminOrSuper, adminController.updateCsrStatus);
router.post('/csr-enquiries/:id/notes', protect, adminOrSuper, adminController.addCsrNote);
router.delete('/csr-enquiries/:id', protect, adminOrSuper, adminController.deleteCsrEnquiry);

// 8. Contact Enquiries
router.get('/contact-enquiries', protect, adminOrSuperOrViewer, adminController.getContactEnquiries);
router.patch('/contact-enquiries/:id/status', protect, adminOrSuper, adminController.updateContactStatus);
router.post('/contact-enquiries/:id/notes', protect, adminOrSuper, adminController.addContactNote);
router.delete('/contact-enquiries/:id', protect, adminOrSuper, adminController.deleteContactEnquiry);

// 9. Newsletter
router.get('/newsletter/subscribers', protect, adminOrSuperOrViewer, adminController.getNewsletterSubscribers);
router.get('/newsletter/export', protect, adminOrSuperOrViewer, adminController.getNewsletterSubscribers); // handled by exportCsv=true
router.patch('/newsletter/subscribers/:id/status', protect, adminOrSuper, adminController.updateNewsletterStatus);
router.delete('/newsletter/subscribers/:id', protect, adminOrSuper, adminController.deleteNewsletterSubscriber);

// 10. Site Content Management
router.get('/content', protect, adminOrSuperOrViewer, adminController.getContentSections);
router.post('/content', protect, adminOrSuper, adminController.updateContentSection); // handles update/create section

// 11. Reports
router.get('/reports', protect, adminOrSuperOrViewer, adminController.getReports);

// 12. Admin Users Management (Superadmin Only)
router.get('/users', protect, superadminOnly, adminController.getAdminUsers);
router.post('/users', protect, superadminOnly, adminController.createAdminUser);
router.put('/users/:id', protect, superadminOnly, adminController.updateAdminUser);
router.patch('/users/:id/status', protect, superadminOnly, adminController.updateAdminUser);
router.patch('/users/:id/role', protect, superadminOnly, adminController.updateAdminUser);
router.post('/users/:id/reset-password', protect, superadminOnly, adminController.updateAdminUser); // handled in updateAdminUser with body.password

// 13. Audit Logs
router.get('/audit-logs', protect, adminOrSuperOrViewer, adminController.getAuditLogs);

module.exports = router;
