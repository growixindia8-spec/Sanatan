const Membership = require('../models/Membership');
const Certificate = require('../models/Certificate');
const { generateMemberId } = require('../utils/generateMemberId');
const { generateQrCode } = require('../utils/generateQrCode');
const { generateMemberIdCardPdf, uploadPdfToCloudinary } = require('../utils/generatePdf');
const { sendEmail } = require('../utils/sendEmail');

exports.registerMember = async (req, res, next) => {
  const { 
    fullName, mobile, email, state, district, city, 
    dob, gender, occupation, category, level, amount, 
    professionalCategory, message 
  } = req.body;

  if (!fullName || !mobile || !email || !state || !district || !city || !dob || !gender || !occupation || !category || !level || !amount) {
    return res.status(400).json({ success: false, message: 'Please specify all required profile variables' });
  }

  try {
    const photoUrl = req.files && req.files.photo ? req.files.photo[0].path : null;
    const idProofUrl = req.files && req.files.idProof ? req.files.idProof[0].path : null;

    const newMember = await Membership.create({
      fullName,
      mobile,
      email,
      state,
      district,
      city,
      dob: new Date(dob),
      gender,
      occupation,
      category,
      level,
      amount: parseFloat(amount),
      professionalCategory,
      photoUrl,
      idProofUrl,
      message,
      paymentStatus: 'pending',
      applicationStatus: 'pending'
    });

    return res.status(200).json({
      success: true,
      message: 'Membership registration submitted successfully. Please proceed to payment step.',
      memberId: null,
      id: newMember._id,
      membershipId: newMember._id,
      amount: newMember.amount
    });

  } catch (err) {
    next(err);
  }
};

exports.confirmPayment = async (req, res, next) => {
  const { id } = req.params;
  const { transactionRef } = req.body;

  if (!transactionRef) {
    return res.status(400).json({ success: false, message: 'Please specify payment transaction reference UTR code' });
  }

  try {
    const member = await Membership.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Membership record not found' });
    }

    const screenshotUrl = req.file ? req.file.path : null;

    member.paymentStatus = 'paid';
    member.message = `Paid via bank UTR ${transactionRef}. Screenshot: ${screenshotUrl || 'none'}. ${member.message || ''}`;
    await member.save();

    return res.status(200).json({
      success: true,
      message: 'Payment details linked successfully. Registration is pending admin review.'
    });

  } catch (err) {
    next(err);
  }
};

exports.approveMember = async (req, res, next) => {
  const { id } = req.params;

  try {
    const member = await Membership.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Membership record not found' });
    }

    // Allocate ID
    const memberId = await generateMemberId(member.state, Membership);
    member.memberId = memberId;

    // Generate QR
    const qrDataText = `Name: ${member.fullName}\nID: ${memberId}\nCategory: ${member.category}\nStatus: Active\nNGO: SDMKF`;
    const qrCodeUrl = await generateQrCode(qrDataText);
    member.qrCodeUrl = qrCodeUrl;

    // Generate PDF Card
    const idCardBuffer = await generateMemberIdCardPdf(member);
    const idCardUrl = await uploadPdfToCloudinary(idCardBuffer, `idcard_${memberId}`);
    member.idCardUrl = idCardUrl;

    member.applicationStatus = 'approved';
    await member.save();

    // Index document in Certificate search library
    await Certificate.create({
      documentType: member.category === 'patron' ? 'member-certificate' : 'volunteer-id',
      credentialNumber: memberId,
      recipientName: member.fullName,
      status: 'Active'
    });

    // Send email notification to user
    await sendEmail({
      to: member.email,
      subject: `🚩 Welcome to Sanatan Dharm Foundation - Approved Membership ID: ${memberId}`,
      text: `Dear ${member.fullName}, your registration application has been verified and approved. Your membership ID is ${memberId}. Download your card here: ${idCardUrl}`,
      html: `<h3>Dear ${member.fullName},</h3><p>Your application is approved. Welcome to <strong>Sanatan Dharm Manav Kalyan Foundation</strong>.</p><p>Member ID: <strong>${memberId}</strong></p><p><a href="${idCardUrl}">Download ID Card PDF</a></p>`
    });

    return res.status(200).json({
      success: true,
      message: 'Membership approved. ID Card compiled and dispatch notification sent successfully.',
      member
    });

  } catch (err) {
    next(err);
  }
};

exports.rejectMember = async (req, res, next) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const member = await Membership.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Membership record not found' });
    }

    member.applicationStatus = 'rejected';
    member.message = `Rejected reason: ${reason || 'Does not match criteria'}. ${member.message || ''}`;
    await member.save();

    return res.status(200).json({ success: true, message: 'Membership registration rejected' });

  } catch (err) {
    next(err);
  }
};

exports.verifyPublicMember = async (req, res, next) => {
  const { memberId } = req.params;

  try {
    const member = await Membership.findOne({ memberId });
    if (!member) {
      return res.status(404).json({ success: false, message: 'No registered member matches the provided ID' });
    }

    return res.status(200).json({
      success: true,
      data: {
        name: member.fullName,
        category: member.category,
        level: member.level,
        status: member.applicationStatus === 'approved' ? 'Active' : 'Pending Verification',
        joiningDate: new Date(member.createdAt).toLocaleDateString('hi-IN')
      }
    });

  } catch (err) {
    next(err);
  }
};

exports.getMyApplications = async (req, res, next) => {
  try {
    const mobile = req.user.mobile;
    const applications = await Membership.find({ mobile }).sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      applications
    });
  } catch (err) {
    next(err);
  }
};

exports.markPaidTest = async (req, res, next) => {
  const { id } = req.params;
  try {
    const member = await Membership.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Membership record not found' });
    }
    member.paymentStatus = 'paid';
    await member.save();
    return res.status(200).json({
      success: true,
      message: 'Test payment marked paid successfully'
    });
  } catch (err) {
    next(err);
  }
};

