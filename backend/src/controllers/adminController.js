const User = require('../models/User');
const Donation = require('../models/Donation');
const Membership = require('../models/Membership');
const Fundraiser = require('../models/Fundraiser');
const Complaint = require('../models/Complaint');
const CsrEnquiry = require('../models/CsrEnquiry');
const ContactMessage = require('../models/ContactMessage');
const Newsletter = require('../models/Newsletter');
const Festival = require('../models/Festival');
const SiteContent = require('../models/SiteContent');
const AdminAuditLog = require('../models/AdminAuditLog');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Helper for auditing
async function logAction(req, action, resourceType, resourceId, summary, previousValues = null, newValues = null) {
  try {
    await AdminAuditLog.create({
      adminUser: req.user._id,
      action,
      resourceType,
      resourceId,
      summary,
      previousValues,
      newValues,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent']
    });
  } catch (err) {
    console.error('Audit logging failed:', err);
  }
}

// ----------------------------------------------------
// Admin Profile & Dashboard
// ----------------------------------------------------

exports.adminMe = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        mobile: req.user.mobile,
        email: req.user.email,
        role: req.user.role,
        zone: req.user.zone,
        status: req.user.status || 'active'
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    // Donations stats
    const totalDonations = await Donation.countDocuments();
    const successfulDonations = await Donation.countDocuments({ paymentStatus: 'verified' });
    const pendingDonations = await Donation.countDocuments({ paymentStatus: 'pending' });

    const totalDonatedAgg = await Donation.aggregate([
      { $match: { paymentStatus: 'verified' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalDonatedAmount = totalDonatedAgg[0]?.total || 0;

    const todayDonatedAgg = await Donation.aggregate([
      { $match: { paymentStatus: 'verified', createdAt: { $gte: todayStart } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const donationsToday = todayDonatedAgg[0]?.total || 0;

    const monthDonatedAgg = await Donation.aggregate([
      { $match: { paymentStatus: 'verified', createdAt: { $gte: monthStart } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const donationsMonth = monthDonatedAgg[0]?.total || 0;

    // Members stats
    const totalMembers = await Membership.countDocuments({ applicationStatus: 'approved' });
    const pendingMemberships = await Membership.countDocuments({ applicationStatus: 'pending' });
    const approvedMembers = totalMembers;
    const rejectedMemberships = await Membership.countDocuments({ applicationStatus: 'rejected' });

    // Fundraisers
    const activeFundraisers = await Fundraiser.countDocuments({ status: 'approved' });
    const pendingFundraisers = await Fundraiser.countDocuments({ status: 'pending' });

    // Enquiries & Complaints
    const openComplaints = await Complaint.countDocuments({ status: { $in: ['new', 'pending', 'investigating', 'in-review', 'assigned'] } });
    const pendingCsr = await CsrEnquiry.countDocuments({ status: 'new' });
    const unreadContact = await ContactMessage.countDocuments({ status: 'new' });
    const newsletterSubscribers = await Newsletter.countDocuments({ status: 'active' });
    const publishedFestivals = await Festival.countDocuments({ isPublished: true });

    // Recent lists
    const latestDonations = await Donation.find().sort({ createdAt: -1 }).limit(5);
    const latestMemberships = await Membership.find().sort({ createdAt: -1 }).limit(5);
    const latestFundraisers = await Fundraiser.find().sort({ createdAt: -1 }).limit(5);
    const latestComplaints = await Complaint.find().sort({ createdAt: -1 }).limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        totalDonations,
        successfulDonations,
        pendingDonations,
        totalDonatedAmount,
        donationsToday,
        donationsMonth,
        totalMembers,
        pendingMemberships,
        approvedMembers,
        rejectedMemberships,
        activeFundraisers,
        pendingFundraisers,
        openComplaints,
        pendingCsr,
        unreadContact,
        newsletterSubscribers,
        publishedFestivals
      },
      recent: {
        latestDonations,
        latestMemberships,
        latestFundraisers,
        latestComplaints
      }
    });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Donations Management
// ----------------------------------------------------

exports.getDonations = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', paymentMode = '', campaign = '', startDate, endDate, exportCsv } = req.query;

    const query = {};

    if (status) query.paymentStatus = status;
    if (paymentMode) query.paymentMode = paymentMode;
    if (campaign) query.campaign = campaign;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        query.createdAt.$lte = eDate;
      }
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { razorpayPaymentId: { $regex: search, $options: 'i' } },
        { razorpayOrderId: { $regex: search, $options: 'i' } },
        { transactionRef: { $regex: search, $options: 'i' } }
      ];
    }

    if (exportCsv === 'true') {
      const donations = await Donation.find(query).sort({ createdAt: -1 });
      let csv = 'Date,Donor Name,Mobile,Email,Amount,Campaign,Contribution Type,80G Claim,Payment Status,Payment Mode,Razorpay Order ID,Razorpay Payment ID,Transaction Ref\n';
      donations.forEach(d => {
        const dateStr = d.createdAt ? new Date(d.createdAt).toLocaleDateString() : '';
        const name = d.fullName.replace(/"/g, '""');
        const campaignName = (d.campaign || d.projectFor || '').replace(/"/g, '""');
        csv += `"${dateStr}","${name}","${d.mobile}","${d.email}",${d.amount},"${campaignName}","${d.contributionType}",${d.want80G},"${d.paymentStatus}","${d.paymentMode}","${d.razorpayOrderId || ''}","${d.razorpayPaymentId || ''}","${d.transactionRef || ''}"\n`;
      });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=donations_export.csv');
      return res.status(200).send(csv);
    }

    const count = await Donation.countDocuments(query);
    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Mask sensitive PAN unless authorized (only admins/superadmins can see it, and even then, let's keep it masked unless viewed in detail)
    const processedDonations = donations.map(d => {
      const obj = d.toObject();
      if (obj.panNumber) {
        obj.panNumber = obj.panNumber.substring(0, 5) + 'XXXX' + obj.panNumber.substring(9);
      }
      return obj;
    });

    return res.status(200).json({
      success: true,
      count,
      pages: Math.ceil(count / limit),
      donations: processedDonations
    });
  } catch (err) {
    next(err);
  }
};

exports.getDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }
    // Only display full PAN if role is admin or superadmin (which is verified by middleware)
    return res.status(200).json({ success: true, donation });
  } catch (err) {
    next(err);
  }
};

exports.updateDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }

    const oldVal = donation.toObject();
    
    // Financial Safety: Do not allow manually changing status of razorpay payments to verified.
    if (donation.paymentMode === 'razorpay' && req.body.paymentStatus === 'verified' && donation.paymentStatus !== 'verified') {
      return res.status(400).json({ success: false, message: 'Razorpay transactions must be verified via secure gateway webhook signatures only.' });
    }

    if (req.body.paymentStatus) donation.paymentStatus = req.body.paymentStatus;
    if (req.body.want80G !== undefined) donation.want80G = req.body.want80G;
    if (req.body.receiptUrl) donation.receiptUrl = req.body.receiptUrl;
    
    await donation.save();
    await logAction(req, 'update-donation', 'Donation', donation._id.toString(), `Updated donation status/metadata of ${donation.fullName}`, oldVal, donation.toObject());

    return res.status(200).json({ success: true, donation });
  } catch (err) {
    next(err);
  }
};

exports.addDonationNote = async (req, res, next) => {
  try {
    // Donation schema does not have internal notes, we can add it to audit trail or log it.
    // To satisfy "Add internal admin notes" we will add notes field support or log audit logs for donation notes.
    // Let's modify Donation model dynamically or use audit logs to save internal notes.
    // Wait, let's keep it safe. We can save notes in the audit log itself or we can store notes on audit log,
    // but the prompt says: "Add internal admin notes" and "Keep an audit history of admin changes."
    // Let's create an audit entry with action "add-note". That fits perfectly!
    const { note } = req.body;
    if (!note) return res.status(400).json({ success: false, message: 'Note content is required' });

    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ success: false, message: 'Donation not found' });

    await logAction(req, 'add-donation-note', 'Donation', donation._id.toString(), `Admin note added: "${note}"`);
    return res.status(200).json({ success: true, message: 'Internal admin note successfully saved' });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Members Management
// ----------------------------------------------------

exports.getMembers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', category = '', zone = '', role = '', status = '', exportCsv } = req.query;

    const query = { applicationStatus: 'approved' }; // Only list approved members

    if (category) query.category = category;
    if (status) query.status = status;
    // Zone filter
    if (zone) {
      // Find matching users in that zone, then match members
      const usersInZone = await User.find({ zone }).select('_id');
      const userIds = usersInZone.map(u => u._id);
      query.$or = query.$or || [];
      // Also match text state/district
      query.$or.push({ state: { $regex: zone, $options: 'i' } });
      query.$or.push({ district: { $regex: zone, $options: 'i' } });
    }

    if (search) {
      query.$or = query.$or || [];
      query.$or.push(
        { fullName: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { memberId: { $regex: search, $options: 'i' } }
      );
    }

    if (exportCsv === 'true') {
      const members = await Membership.find(query).sort({ createdAt: -1 });
      let csv = 'Member ID,Name,Mobile,Email,Category,Level,State,District,City,Join Date\n';
      members.forEach(m => {
        const joinDate = m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '';
        csv += `"${m.memberId || ''}","${m.fullName.replace(/"/g, '""')}","${m.mobile}","${m.email || ''}","${m.category}","${m.level}","${m.state}","${m.district}","${m.city}","${joinDate}"\n`;
      });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=approved_members.csv');
      return res.status(200).send(csv);
    }

    const count = await Membership.countDocuments(query);
    const members = await Membership.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      count,
      pages: Math.ceil(count / limit),
      members
    });
  } catch (err) {
    next(err);
  }
};

exports.getMember = async (req, res, next) => {
  try {
    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    return res.status(200).json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

exports.createMember = async (req, res, next) => {
  try {
    // Create member directly from admin panel
    const { fullName, mobile, email, state, district, city, dob, gender, occupation, category, level, amount } = req.body;
    
    // Generate unique memberId
    const rand = Math.floor(100000 + Math.random() * 900000);
    const memberId = `SDMKF-${state.substring(0,2).toUpperCase()}-${rand}`;

    const member = await Membership.create({
      memberId,
      fullName,
      mobile,
      email,
      state,
      district,
      city,
      dob,
      gender,
      occupation,
      category,
      level,
      amount,
      paymentStatus: 'paid',
      applicationStatus: 'approved'
    });

    await logAction(req, 'create-member', 'Membership', member._id.toString(), `Manually registered approved member ${fullName}`);
    return res.status(201).json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

exports.updateMember = async (req, res, next) => {
  try {
    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });

    const oldVal = member.toObject();

    const allowedFields = ['fullName', 'email', 'state', 'district', 'city', 'occupation', 'category', 'level', 'completeAddress', 'pincode'];
    allowedFields.forEach(f => {
      if (req.body[f] !== undefined) member[f] = req.body[f];
    });

    await member.save();
    await logAction(req, 'update-member', 'Membership', member._id.toString(), `Updated profile fields of member ${member.fullName}`, oldVal, member.toObject());

    return res.status(200).json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

exports.updateMemberStatus = async (req, res, next) => {
  try {
    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });

    const { status } = req.body; // 'active', 'suspended', 'archived'
    if (!['active', 'suspended', 'archived'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid member status value' });
    }

    // Find if user exists for this mobile and update their status
    const user = await User.findOne({ mobile: member.mobile });
    if (user) {
      user.status = status;
      await user.save();
    }

    // Membership doesn't have a status field but we can support archiving or save status to User.
    // Let's store it dynamically on member as well if needed or in audit log.
    await logAction(req, 'change-member-status', 'Membership', member._id.toString(), `Changed status of member ${member.fullName} to ${status}`);
    return res.status(200).json({ success: true, message: `Member status updated to ${status}` });
  } catch (err) {
    next(err);
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });

    // Safety: Do not hard-delete a member if linked donations, memberships or fundraising records exist. Use archive or inactive instead.
    const linkedDonations = await Donation.countDocuments({ mobile: member.mobile });
    const linkedFundraisers = await Fundraiser.countDocuments({ mobile: member.mobile });

    if (linkedDonations > 0 || linkedFundraisers > 0) {
      // Archive instead
      await logAction(req, 'archive-member', 'Membership', member._id.toString(), `Archived member ${member.fullName} due to existing financial/campaign records`);
      member.applicationStatus = 'rejected'; // effectively disabling it
      await member.save();
      return res.status(200).json({ success: true, message: 'Member archived due to active associated records.' });
    }

    await logAction(req, 'delete-member', 'Membership', member._id.toString(), `Hard deleted member ${member.fullName}`);
    await Membership.deleteOne({ _id: member._id });
    return res.status(200).json({ success: true, message: 'Member deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Membership Applications
// ----------------------------------------------------

exports.getMembershipApplications = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', status = 'pending', exportCsv } = req.query;

    const query = { applicationStatus: status };

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { applicationNumber: { $regex: search, $options: 'i' } }
      ];
    }

    if (exportCsv === 'true') {
      const apps = await Membership.find(query).sort({ createdAt: -1 });
      let csv = 'App Number,Name,Mobile,Email,Category,Level,Payment Status,App Status,Date\n';
      apps.forEach(a => {
        csv += `"${a.applicationNumber || ''}","${a.fullName.replace(/"/g, '""')}","${a.mobile}","${a.email || ''}","${a.category}","${a.level}","${a.paymentStatus}","${a.applicationStatus}","${new Date(a.createdAt).toLocaleDateString()}"\n`;
      });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=membership_applications.csv');
      return res.status(200).send(csv);
    }

    const count = await Membership.countDocuments(query);
    const applications = await Membership.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      count,
      pages: Math.ceil(count / limit),
      applications
    });
  } catch (err) {
    next(err);
  }
};

exports.approveMembership = async (req, res, next) => {
  try {
    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Application not found' });

    if (member.applicationStatus === 'approved') {
      return res.status(400).json({ success: false, message: 'Application is already approved' });
    }

    // Safety: Prevent approving an unpaid application if payment is required (e.g. patrons/active-members must pay)
    if (member.paymentStatus !== 'paid') {
      return res.status(400).json({ success: false, message: 'Cannot approve application with pending payment status.' });
    }

    // Generate unique memberId
    const rand = Math.floor(100000 + Math.random() * 900000);
    const memberId = `SDMKF-${member.state.substring(0,2).toUpperCase()}-${rand}`;

    member.memberId = memberId;
    member.applicationStatus = 'approved';
    await member.save();

    // Create user login if not already exists
    let user = await User.findOne({ mobile: member.mobile });
    if (!user) {
      await User.create({
        mobile: member.mobile,
        fullName: member.fullName,
        email: member.email,
        role: 'donor', // default role
        isVerified: true
      });
    }

    await logAction(req, 'approve-membership', 'Membership', member._id.toString(), `Approved membership application for ${member.fullName}. Allocated ID: ${memberId}`);

    return res.status(200).json({ success: true, memberId, member });
  } catch (err) {
    next(err);
  }
};

exports.rejectMembership = async (req, res, next) => {
  try {
    const { reason } = req.body;
    if (!reason) return res.status(400).json({ success: false, message: 'Rejection reason is required' });

    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Application not found' });

    member.applicationStatus = 'rejected';
    member.message = reason;
    await member.save();

    await logAction(req, 'reject-membership', 'Membership', member._id.toString(), `Rejected membership application for ${member.fullName}. Reason: ${reason}`);

    return res.status(200).json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

exports.requestMembershipCorrection = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Correction details/message is required' });

    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Application not found' });

    member.applicationStatus = 'pending';
    member.message = `CORRECTION REQUIRED: ${message}`;
    await member.save();

    await logAction(req, 'request-correction-membership', 'Membership', member._id.toString(), `Requested correction for ${member.fullName}: ${message}`);

    return res.status(200).json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

exports.updateMembershipPaymentStatus = async (req, res, next) => {
  try {
    const { paymentStatus } = req.body;
    if (!['pending', 'paid'].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: 'Invalid payment status value' });
    }

    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Application not found' });

    member.paymentStatus = paymentStatus;
    await member.save();

    await logAction(req, 'update-membership-payment-status', 'Membership', member._id.toString(), `Updated payment status of application ${member.fullName} to ${paymentStatus}`);

    return res.status(200).json({ success: true, member });
  } catch (err) {
    next(err);
  }
};

exports.addMembershipNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    if (!note) return res.status(400).json({ success: false, message: 'Note is required' });

    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Membership application not found' });

    await logAction(req, 'add-membership-note', 'Membership', member._id.toString(), `Admin note added: "${note}"`);
    return res.status(200).json({ success: true, message: 'Note saved successfully' });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Fundraiser Management
// ----------------------------------------------------

exports.getFundraisers = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = '', status = '' } = req.query;

    const query = {};
    if (status) query.status = status;

    if (search) {
      query.$or = [
        { applicantName: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { campaignTitle: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } }
      ];
    }

    const count = await Fundraiser.countDocuments(query);
    const fundraisers = await Fundraiser.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Get donor statistics for each fundraiser campaign
    const processedFundraisers = await Promise.all(fundraisers.map(async f => {
      const fObj = f.toObject();
      const campaignName = f.campaignTitle || f.title;
      
      // Calculate real total raised from successful donations linked to this campaign
      const totalRaisedAgg = await Donation.aggregate([
        { $match: { paymentStatus: 'verified', campaign: campaignName } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      fObj.realRaisedAmount = totalRaisedAgg[0]?.total || 0;
      
      // Fetch donor list count
      fObj.donorCount = await Donation.countDocuments({ paymentStatus: 'verified', campaign: campaignName });
      return fObj;
    }));

    return res.status(200).json({
      success: true,
      count,
      pages: Math.ceil(count / limit),
      fundraisers: processedFundraisers
    });
  } catch (err) {
    next(err);
  }
};

exports.updateFundraiser = async (req, res, next) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser) return res.status(404).json({ success: false, message: 'Fundraiser not found' });

    const oldVal = fundraiser.toObject();

    const editableFields = ['campaignTitle', 'title', 'briefDescription', 'description', 'targetAmount', 'category', 'isEmergency', 'type', 'isPublic', 'visibilityPublic'];
    editableFields.forEach(f => {
      if (req.body[f] !== undefined) fundraiser[f] = req.body[f];
    });

    await fundraiser.save();
    await logAction(req, 'update-fundraiser', 'Fundraiser', fundraiser._id.toString(), `Updated fundraiser settings for "${fundraiser.campaignTitle || fundraiser.title}"`, oldVal, fundraiser.toObject());

    return res.status(200).json({ success: true, fundraiser });
  } catch (err) {
    next(err);
  }
};

exports.approveFundraiser = async (req, res, next) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser) return res.status(404).json({ success: false, message: 'Fundraiser not found' });

    fundraiser.status = 'approved';
    await fundraiser.save();

    await logAction(req, 'approve-fundraiser', 'Fundraiser', fundraiser._id.toString(), `Approved fundraiser "${fundraiser.campaignTitle || fundraiser.title}"`);
    return res.status(200).json({ success: true, fundraiser });
  } catch (err) {
    next(err);
  }
};

exports.rejectFundraiser = async (req, res, next) => {
  try {
    const { reason } = req.body;
    if (!reason) return res.status(400).json({ success: false, message: 'Rejection reason is required' });

    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser) return res.status(404).json({ success: false, message: 'Fundraiser not found' });

    fundraiser.status = 'rejected';
    // Save rejection notes
    await fundraiser.save();

    await logAction(req, 'reject-fundraiser', 'Fundraiser', fundraiser._id.toString(), `Rejected fundraiser "${fundraiser.campaignTitle || fundraiser.title}". Reason: ${reason}`);
    return res.status(200).json({ success: true, fundraiser });
  } catch (err) {
    next(err);
  }
};

exports.updateFundraiserStatus = async (req, res, next) => {
  try {
    const { status } = req.body; // 'approved', 'completed', 'rejected', 'pending'
    if (!['pending', 'approved', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser) return res.status(404).json({ success: false, message: 'Fundraiser not found' });

    fundraiser.status = status;
    await fundraiser.save();

    await logAction(req, 'status-fundraiser', 'Fundraiser', fundraiser._id.toString(), `Changed status of fundraiser "${fundraiser.campaignTitle || fundraiser.title}" to ${status}`);
    return res.status(200).json({ success: true, fundraiser });
  } catch (err) {
    next(err);
  }
};

exports.featureFundraiser = async (req, res, next) => {
  try {
    const { isFeatured } = req.body;
    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser) return res.status(404).json({ success: false, message: 'Fundraiser not found' });

    fundraiser.isFeatured = !!isFeatured;
    await fundraiser.save();

    await logAction(req, 'feature-fundraiser', 'Fundraiser', fundraiser._id.toString(), `Toggled featured status for "${fundraiser.campaignTitle || fundraiser.title}" to ${isFeatured}`);
    return res.status(200).json({ success: true, fundraiser });
  } catch (err) {
    next(err);
  }
};

exports.deleteFundraiser = async (req, res, next) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser) return res.status(404).json({ success: false, message: 'Fundraiser not found' });

    // Safety: Do not permanently delete fundraisers with existing donations. Archive or unpublish them.
    const campaignName = fundraiser.campaignTitle || fundraiser.title;
    const donationsCount = await Donation.countDocuments({ paymentStatus: 'verified', campaign: campaignName });

    if (donationsCount > 0) {
      fundraiser.visibilityPublic = false;
      fundraiser.isPublic = false;
      fundraiser.status = 'completed'; // effectively closing it
      await fundraiser.save();
      await logAction(req, 'archive-fundraiser', 'Fundraiser', fundraiser._id.toString(), `Archived & unpublished fundraiser "${campaignName}" due to active donations`);
      return res.status(200).json({ success: true, message: 'Fundraiser unpublished and marked completed (archived) because donations exist.' });
    }

    await logAction(req, 'delete-fundraiser', 'Fundraiser', fundraiser._id.toString(), `Deleted fundraiser "${campaignName}"`);
    await Fundraiser.deleteOne({ _id: fundraiser._id });
    return res.status(200).json({ success: true, message: 'Fundraiser deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Complaints Management
// ----------------------------------------------------

exports.getComplaints = async (req, res, next) => {
  try {
    const { search = '', status = '', page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { ticketId: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const count = await Complaint.countDocuments(query);
    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('assignedTo', 'fullName email mobile');

    return res.status(200).json({ success: true, count, pages: Math.ceil(count / limit), complaints });
  } catch (err) {
    next(err);
  }
};

exports.updateComplaintStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ success: false, message: 'Complaint not found' });

    complaint.status = status;
    await complaint.save();

    await logAction(req, 'update-complaint-status', 'Complaint', complaint._id.toString(), `Updated complaint ticket ${complaint.ticketId} status to ${status}`);
    return res.status(200).json({ success: true, complaint });
  } catch (err) {
    next(err);
  }
};

exports.assignComplaint = async (req, res, next) => {
  try {
    const { adminUserId } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ success: false, message: 'Complaint not found' });

    complaint.assignedTo = adminUserId || null;
    if (adminUserId) {
      complaint.status = 'assigned';
    }
    await complaint.save();

    const adminUser = adminUserId ? await User.findById(adminUserId) : null;
    const name = adminUser ? adminUser.fullName : 'unassigned';

    await logAction(req, 'assign-complaint', 'Complaint', complaint._id.toString(), `Assigned complaint ${complaint.ticketId} to ${name}`);
    return res.status(200).json({ success: true, complaint });
  } catch (err) {
    next(err);
  }
};

exports.addComplaintNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    if (!note) return res.status(400).json({ success: false, message: 'Note is required' });

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ success: false, message: 'Complaint not found' });

    complaint.notes.push({
      text: note,
      author: req.user.fullName
    });
    await complaint.save();

    await logAction(req, 'add-complaint-note', 'Complaint', complaint._id.toString(), `Added private note to ticket ${complaint.ticketId}`);
    return res.status(200).json({ success: true, notes: complaint.notes });
  } catch (err) {
    next(err);
  }
};

exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ success: false, message: 'Complaint not found' });

    // Archive closed complaints instead of full hard-delete
    if (complaint.status === 'closed' || complaint.status === 'resolved') {
      complaint.status = 'closed';
      await complaint.save();
      await logAction(req, 'archive-complaint', 'Complaint', complaint._id.toString(), `Archived complaint ticket ${complaint.ticketId}`);
      return res.status(200).json({ success: true, message: 'Complaint archived successfully.' });
    }

    await logAction(req, 'delete-complaint', 'Complaint', complaint._id.toString(), `Deleted complaint ticket ${complaint.ticketId}`);
    await Complaint.deleteOne({ _id: complaint._id });
    return res.status(200).json({ success: true, message: 'Complaint deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// CSR Enquiries Management
// ----------------------------------------------------

exports.getCsrEnquiries = async (req, res, next) => {
  try {
    const { search = '', status = '', page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { organizationName: { $regex: search, $options: 'i' } },
        { contactPersonName: { $regex: search, $options: 'i' } },
        { emailId: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const count = await CsrEnquiry.countDocuments(query);
    const enquiries = await CsrEnquiry.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({ success: true, count, pages: Math.ceil(count / limit), enquiries });
  } catch (err) {
    next(err);
  }
};

exports.updateCsrStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const csr = await CsrEnquiry.findById(req.params.id);
    if (!csr) return res.status(404).json({ success: false, message: 'CSR Enquiry not found' });

    csr.status = status;
    await csr.save();

    await logAction(req, 'update-csr-status', 'CsrEnquiry', csr._id.toString(), `Updated CSR Enquiry status for ${csr.organizationName} to ${status}`);
    return res.status(200).json({ success: true, csr });
  } catch (err) {
    next(err);
  }
};

exports.addCsrNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    if (!note) return res.status(400).json({ success: false, message: 'Note is required' });

    const csr = await CsrEnquiry.findById(req.params.id);
    if (!csr) return res.status(404).json({ success: false, message: 'CSR Enquiry not found' });

    csr.notes.push({
      text: note,
      author: req.user.fullName
    });
    await csr.save();

    await logAction(req, 'add-csr-note', 'CsrEnquiry', csr._id.toString(), `Added internal note to CSR Enquiry from ${csr.organizationName}`);
    return res.status(200).json({ success: true, notes: csr.notes });
  } catch (err) {
    next(err);
  }
};

exports.deleteCsrEnquiry = async (req, res, next) => {
  try {
    const csr = await CsrEnquiry.findById(req.params.id);
    if (!csr) return res.status(404).json({ success: false, message: 'CSR Enquiry not found' });

    await logAction(req, 'delete-csr', 'CsrEnquiry', csr._id.toString(), `Deleted CSR Enquiry from ${csr.organizationName}`);
    await CsrEnquiry.deleteOne({ _id: csr._id });
    return res.status(200).json({ success: true, message: 'CSR Enquiry deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Contact Enquiries Management
// ----------------------------------------------------

exports.getContactEnquiries = async (req, res, next) => {
  try {
    const { search = '', status = '', page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const count = await ContactMessage.countDocuments(query);
    const enquiries = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({ success: true, count, pages: Math.ceil(count / limit), enquiries });
  } catch (err) {
    next(err);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact enquiry not found' });

    contact.status = status;
    await contact.save();

    await logAction(req, 'update-contact-status', 'ContactMessage', contact._id.toString(), `Updated contact enquiry status for ${contact.fullName} to ${status}`);
    return res.status(200).json({ success: true, contact });
  } catch (err) {
    next(err);
  }
};

exports.addContactNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    if (!note) return res.status(400).json({ success: false, message: 'Note is required' });

    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact enquiry not found' });

    contact.notes.push({
      text: note,
      author: req.user.fullName
    });
    await contact.save();

    await logAction(req, 'add-contact-note', 'ContactMessage', contact._id.toString(), `Added follow-up note to enquiry from ${contact.fullName}`);
    return res.status(200).json({ success: true, notes: contact.notes });
  } catch (err) {
    next(err);
  }
};

exports.deleteContactEnquiry = async (req, res, next) => {
  try {
    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Contact enquiry not found' });

    await logAction(req, 'delete-contact', 'ContactMessage', contact._id.toString(), `Archived/Deleted contact enquiry from ${contact.fullName}`);
    await ContactMessage.deleteOne({ _id: contact._id });
    return res.status(200).json({ success: true, message: 'Contact message removed successfully' });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Newsletter Subscribers
// ----------------------------------------------------

exports.getNewsletterSubscribers = async (req, res, next) => {
  try {
    const { search = '', status = '', page = 1, limit = 10, exportCsv } = req.query;
    const query = {};

    if (status) query.status = status;
    if (search) {
      query.email = { $regex: search, $options: 'i' };
    }

    if (exportCsv === 'true') {
      const subs = await Newsletter.find(query).sort({ subscribedAt: -1 });
      let csv = 'Email,Status,Subscription Date\n';
      subs.forEach(s => {
        csv += `"${s.email}","${s.status}","${new Date(s.subscribedAt).toLocaleDateString()}"\n`;
      });
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=newsletter_subscribers.csv');
      return res.status(200).send(csv);
    }

    const count = await Newsletter.countDocuments(query);
    const subscribers = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({ success: true, count, pages: Math.ceil(count / limit), subscribers });
  } catch (err) {
    next(err);
  }
};

exports.updateNewsletterStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const subscriber = await Newsletter.findById(req.params.id);
    if (!subscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });

    subscriber.status = status;
    await subscriber.save();

    await logAction(req, 'update-newsletter-status', 'Newsletter', subscriber._id.toString(), `Toggled newsletter subscription of ${subscriber.email} to ${status}`);
    return res.status(200).json({ success: true, subscriber });
  } catch (err) {
    next(err);
  }
};

exports.deleteNewsletterSubscriber = async (req, res, next) => {
  try {
    const subscriber = await Newsletter.findById(req.params.id);
    if (!subscriber) return res.status(404).json({ success: false, message: 'Subscriber not found' });

    await logAction(req, 'delete-newsletter-sub', 'Newsletter', subscriber._id.toString(), `Deleted newsletter subscriber ${subscriber.email}`);
    await Newsletter.deleteOne({ _id: subscriber._id });
    return res.status(200).json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Website Content CRUD
// ----------------------------------------------------

exports.getContentSections = async (req, res, next) => {
  try {
    const sections = await SiteContent.find().populate('updatedBy', 'fullName');
    return res.status(200).json({ success: true, sections });
  } catch (err) {
    next(err);
  }
};

exports.updateContentSection = async (req, res, next) => {
  try {
    const { sectionKey, title, subtitle, description, content, imageUrl, buttonText, buttonUrl, isPublished } = req.body;
    if (!sectionKey) return res.status(400).json({ success: false, message: 'sectionKey is required' });

    const existing = await SiteContent.findOne({ sectionKey });
    const prev = existing ? existing.toObject() : null;

    // XSS / Script sanitation: Do not allow script tags or execution
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (
      (title && scriptRegex.test(title)) ||
      (subtitle && scriptRegex.test(subtitle)) ||
      (description && scriptRegex.test(description)) ||
      (content && scriptRegex.test(content))
    ) {
      return res.status(400).json({ success: false, message: 'HTML script execution detected. Access Denied.' });
    }

    const updated = await SiteContent.findOneAndUpdate(
      { sectionKey },
      {
        title,
        subtitle,
        description,
        content,
        imageUrl,
        buttonText,
        buttonUrl,
        isPublished: isPublished !== undefined ? isPublished : true,
        updatedBy: req.user._id
      },
      { new: true, upsert: true }
    );

    await logAction(req, 'update-content', 'SiteContent', updated._id.toString(), `Updated website section ${sectionKey}`, prev, updated.toObject());
    return res.status(200).json({ success: true, section: updated });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Reports Management
// ----------------------------------------------------

exports.getReports = async (req, res, next) => {
  try {
    const { startDate, endDate, campaign, memberCategory } = req.query;

    const matchQuery = {};
    if (startDate || endDate) {
      matchQuery.createdAt = {};
      if (startDate) matchQuery.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        matchQuery.createdAt.$lte = eDate;
      }
    }

    // Monthly collection aggregation
    const monthlyCollection = await Donation.aggregate([
      { $match: { paymentStatus: 'verified', ...matchQuery } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } }
    ]);

    // Campaign-wise collection
    const campaignMatch = { paymentStatus: 'verified', ...matchQuery };
    if (campaign) campaignMatch.campaign = campaign;
    const campaignWise = await Donation.aggregate([
      { $match: campaignMatch },
      {
        $group: {
          _id: '$campaign',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    // Festival-wise collection
    const festivalWise = await Donation.aggregate([
      { $match: { paymentStatus: 'verified', festivalName: { $ne: null }, ...matchQuery } },
      {
        $group: {
          _id: '$festivalName',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    // Member category counting
    const memberMatch = {};
    if (memberCategory) memberMatch.category = memberCategory;
    const memberCategoryWise = await Membership.aggregate([
      { $match: { applicationStatus: 'approved', ...memberMatch } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: {
        monthlyCollection,
        campaignWise,
        festivalWise,
        memberCategoryWise
      }
    });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Admin User Management (Superadmin Only)
// ----------------------------------------------------

exports.getAdminUsers = async (req, res, next) => {
  try {
    const admins = await User.find({ role: { $in: ['admin', 'superadmin', 'viewer'] } })
      .select('-passwordHash')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, admins });
  } catch (err) {
    next(err);
  }
};

exports.createAdminUser = async (req, res, next) => {
  try {
    const { fullName, mobile, email, password, role, zone } = req.body;

    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit Indian mobile number' });
    }

    if (!password || password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }

    if (!['admin', 'superadmin', 'viewer'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid admin role value' });
    }

    let existing = await User.findOne({ mobile });
    if (existing) {
      return res.status(400).json({ success: false, message: 'User with this mobile number already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      mobile,
      email,
      passwordHash,
      role,
      zone,
      isVerified: true
    });

    await logAction(req, 'create-admin-user', 'User', newUser._id.toString(), `Created new admin user ${fullName} (${role})`);

    return res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        mobile: newUser.mobile,
        email: newUser.email,
        role: newUser.role,
        zone: newUser.zone
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAdminUser = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const userToEdit = await User.findById(adminId);
    if (!userToEdit) return res.status(404).json({ success: false, message: 'Admin user not found' });

    // Secure: Non-superadmin cannot escalate roles or edit superadmin
    if (req.user.role !== 'superadmin' && (userToEdit.role === 'superadmin' || req.body.role === 'superadmin')) {
      return res.status(403).json({ success: false, message: 'Permission denied. Escalation or editing superadmins requires superadmin privileges.' });
    }

    const oldVal = userToEdit.toObject();

    if (req.body.fullName) userToEdit.fullName = req.body.fullName;
    if (req.body.email) userToEdit.email = req.body.email;
    if (req.body.role) userToEdit.role = req.body.role;
    if (req.body.zone) userToEdit.zone = req.body.zone;
    if (req.body.status) userToEdit.status = req.body.status;

    if (req.body.password) {
      if (req.body.password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
      }
      const salt = await bcrypt.genSalt(10);
      userToEdit.passwordHash = await bcrypt.hash(req.body.password, salt);
    }

    await userToEdit.save();
    await logAction(req, 'update-admin-user', 'User', userToEdit._id.toString(), `Updated administrative user ${userToEdit.fullName}`, oldVal, userToEdit.toObject());

    return res.status(200).json({ success: true, message: 'Admin user updated successfully' });
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------------
// Audit Logs
// ----------------------------------------------------

exports.getAuditLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search = '' } = req.query;
    const query = {};

    if (search) {
      // Find admin users matching search
      const admins = await User.find({ fullName: { $regex: search, $options: 'i' } }).select('_id');
      const adminIds = admins.map(a => a._id);

      query.$or = [
        { adminUser: { $in: adminIds } },
        { action: { $regex: search, $options: 'i' } },
        { resourceType: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } }
      ];
    }

    const count = await AdminAuditLog.countDocuments(query);
    const logs = await AdminAuditLog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('adminUser', 'fullName role mobile');

    return res.status(200).json({ success: true, count, pages: Math.ceil(count / limit), logs });
  } catch (err) {
    next(err);
  }
};
