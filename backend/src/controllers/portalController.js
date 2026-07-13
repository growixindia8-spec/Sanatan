const FinancialReport = require('../models/FinancialReport');
const Membership = require('../models/Membership');
const User = require('../models/User');
const Notification = require('../models/Notification');
const Fundraiser = require('../models/Fundraiser');
const Complaint = require('../models/Complaint');
const { generateMemberId } = require('../utils/generateMemberId');

// @desc    Get dashboard stats (coordinator sees zone stats, admin sees all)
// @route   GET /api/portal/dashboard-stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    const userZone = req.user.zone;
    let memberFilter = { applicationStatus: 'approved' };
    
    // Scoping to zone if role is coordinator and zone is set
    if (req.user.role === 'coordinator' && userZone) {
      memberFilter.state = userZone;
    }

    const activeMembersInZone = await Membership.countDocuments(memberFilter);
    const pendingVerifications = await Membership.countDocuments({ applicationStatus: 'pending' });

    // Reports created in current month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const reportsThisMonth = await FinancialReport.countDocuments({ createdAt: { $gte: startOfMonth } });

    const pendingFundraisers = await Fundraiser.countDocuments({ status: 'pending' });
    
    // Count active complaints (pending, open, or investigating)
    const pendingComplaints = await Complaint.countDocuments({ status: { $in: ['pending', 'open', 'investigating'] } });

    return res.status(200).json({
      success: true,
      data: {
        activeMembersInZone,
        pendingVerifications,
        reportsThisMonth,
        pendingFundraisers,
        pendingComplaints
      }
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Get current user profile
// @route   GET /api/portal/profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Fetch membership applications matching user's mobile number
    const membershipApplications = await Membership.find({ mobile: user.mobile }).sort({ createdAt: -1 });

    return res.status(200).json({ 
      success: true, 
      user,
      membershipApplications
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update profile fields (fullName, email, zone only)
// @route   PUT /api/portal/profile
exports.updateProfile = async (req, res, next) => {
  const { fullName, email, zone } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (email !== undefined) user.email = email;
    if (zone !== undefined) user.zone = zone;

    await user.save();

    user.passwordHash = undefined;
    return res.status(200).json({ 
      success: true, 
      message: 'Profile updated successfully', 
      user 
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Verify/search membership records (internal tool)
// @route   GET /api/portal/verify-membership
exports.verifyMembership = async (req, res, next) => {
  const { query } = req.query;
  if (!query) {
    return res.status(200).json({ success: true, data: [] });
  }
  try {
    const searchRegex = new RegExp(query, 'i');
    const results = await Membership.find({
      $or: [
        { fullName: searchRegex },
        { mobile: searchRegex },
        { memberId: query }
      ]
    });
    return res.status(200).json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};

// @desc    Get notifications relevant to user
// @route   GET /api/portal/notifications
exports.getNotifications = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user.role === 'coordinator') {
      const zone = req.user.zone;
      filter = {
        $or: [
          { zone: { $exists: false } },
          { zone: null },
          { zone: '' },
          { zone }
        ]
      };
    }
    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, notifications });
  } catch (err) {
    next(err);
  }
};

// @desc    Mark a notification as read
// @route   PATCH /api/portal/notifications/:id/read
exports.markNotificationRead = async (req, res, next) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found' });
    }

    if (!notification.isReadBy.includes(req.user.id)) {
      notification.isReadBy.push(req.user.id);
      await notification.save();
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Notification marked as read', 
      notification 
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Create a new notification (Admin only)
// @route   POST /api/portal/notifications
exports.createNotification = async (req, res, next) => {
  const { title, message, zone, type } = req.body;
  if (!title || !message) {
    return res.status(400).json({ success: false, message: 'Please specify title and message' });
  }
  try {
    const notification = await Notification.create({
      title,
      message,
      zone: zone || null,
      type: type || 'info'
    });
    return res.status(201).json({ 
      success: true, 
      message: 'Notification created successfully', 
      notification 
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Upload financial report (Admin only)
// @route   POST /api/portal/financial-reports
exports.uploadFinancialReport = async (req, res, next) => {
  const { title, fiscalYear, category } = req.body;
  if (!title || !fiscalYear || !category || !req.file) {
    return res.status(400).json({ success: false, message: 'Please specify title, fiscalYear, category, and upload a file' });
  }
  try {
    // Local uploads path. Serving locally for testing.
    // TODO: switch to Cloudinary once API keys are available
    const fileUrl = `/uploads/reports/${req.file.filename}`;

    const report = await FinancialReport.create({
      reportTitle: title,
      fiscalYear,
      categoryTag: category,
      fileUrl,
      uploadedBy: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: 'Financial statement uploaded and published successfully (Saved locally)',
      report
    });

  } catch (err) {
    next(err);
  }
};

// @desc    List all financial reports
// @route   GET /api/portal/financial-reports
exports.getFinancialReports = async (req, res, next) => {
  const { fiscalYear } = req.query;
  try {
    let filter = {};
    if (fiscalYear) {
      filter.fiscalYear = fiscalYear;
    }
    const reports = await FinancialReport.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, reports });
  } catch (err) {
    next(err);
  }
};

// @desc    List memberships (Coordinator / Admin only)
// @route   GET /api/portal/memberships
exports.getMemberships = async (req, res, next) => {
  const { status } = req.query;
  try {
    let filter = {};
    if (status) {
      filter.applicationStatus = status;
    }
    const memberships = await Membership.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, memberships });
  } catch (err) {
    next(err);
  }
};

// @desc    Approve membership and allocate custom ID
// @route   PATCH /api/portal/memberships/:id/approve
exports.approveMembership = async (req, res, next) => {
  const { id } = req.params;
  try {
    const membership = await Membership.findById(id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership application not found' });
    }

    if (membership.applicationStatus === 'approved') {
      return res.status(400).json({ success: false, message: 'Membership application is already approved' });
    }

    // Allocate sequential ID
    const memberId = await generateMemberId(membership.state, Membership);
    membership.memberId = memberId;
    membership.applicationStatus = 'approved';
    await membership.save();

    return res.status(200).json({
      success: true,
      message: `Membership approved successfully. Allocated ID: ${memberId}`,
      data: membership
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Reject membership
// @route   PATCH /api/portal/memberships/:id/reject
exports.rejectMembership = async (req, res, next) => {
  const { id } = req.params;
  try {
    const membership = await Membership.findById(id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership application not found' });
    }

    membership.applicationStatus = 'rejected';
    await membership.save();

    return res.status(200).json({ 
      success: true, 
      message: 'Membership application rejected successfully', 
      data: membership 
    });

  } catch (err) {
    next(err);
  }
};

// @desc    List fundraiser applications
// @route   GET /api/portal/fundraisers
exports.getFundraisers = async (req, res, next) => {
  const { status } = req.query;
  try {
    let filter = {};
    if (status) {
      filter.status = status;
    }
    const fundraisers = await Fundraiser.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, fundraisers });
  } catch (err) {
    next(err);
  }
};

// @desc    Approve fundraiser and generate slug
// @route   PATCH /api/portal/fundraisers/:id/approve
exports.approveFundraiser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fundraiser = await Fundraiser.findById(id);
    if (!fundraiser) {
      return res.status(404).json({ success: false, message: 'Fundraiser not found' });
    }

    fundraiser.status = 'approved';
    const baseTitle = fundraiser.title || fundraiser.campaignTitle || 'fundraiser';
    const slug = baseTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    fundraiser.slug = slug;

    await fundraiser.save();

    return res.status(200).json({ 
      success: true, 
      message: 'Fundraiser approved successfully', 
      data: fundraiser 
    });

  } catch (err) {
    next(err);
  }
};

// @desc    Reject fundraiser
// @route   PATCH /api/portal/fundraisers/:id/reject
exports.rejectFundraiser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fundraiser = await Fundraiser.findById(id);
    if (!fundraiser) {
      return res.status(404).json({ success: false, message: 'Fundraiser not found' });
    }

    fundraiser.status = 'rejected';
    await fundraiser.save();

    return res.status(200).json({ 
      success: true, 
      message: 'Fundraiser rejected successfully', 
      data: fundraiser 
    });

  } catch (err) {
    next(err);
  }
};
