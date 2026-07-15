const Membership = require('../models/Membership');
const Certificate = require('../models/Certificate');
const { generateMemberId } = require('../utils/generateMemberId');
const { generateQrCode } = require('../utils/generateQrCode');
const { generateMemberIdCardPdf, uploadPdfToCloudinary, generateMembershipReceiptPdf } = require('../utils/generatePdf');
const { sendEmail } = require('../utils/sendEmail');
const razorpay = require('../config/razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');

const mockMemberships = [];

const categoryCodeMap = {
  "sanatani-sena": "SS",
  "active-member": "AM",
  "vigilance": "VD",
  "seva-network": "SN",
  "patron": "PM",
};

async function generateApplicationNumber(Membership, category) {
  const code = categoryCodeMap[category] || "GN";
  const count = await Membership.countDocuments({ category });
  const seq = String(count + 1).padStart(6, "0");
  return `APP-${code}-${seq}`;
}

exports.registerMember = async (req, res, next) => {
  const { 
    fullName, mobile, email, state, district, city, 
    dob, gender, occupation, category, level, amount, 
    professionalCategory, message, completeAddress, pincode,
    optionalDonation, identityVerificationSkipped
  } = req.body;

  if (!fullName || !mobile || !state || !district || !city || !dob || !gender || !category || !level || !amount) {
    return res.status(400).json({ success: false, message: 'Please specify all required profile variables' });
  }

  try {
    const photoUrl = req.files && req.files.photo ? req.files.photo[0].path : null;
    const idProofUrl = req.files && req.files.idProof ? req.files.idProof[0].path : null;
    const aadhaarFrontUrl = req.files && req.files.aadhaarFront ? req.files.aadhaarFront[0].path : null;
    const aadhaarBackUrl = req.files && req.files.aadhaarBack ? req.files.aadhaarBack[0].path : null;
    const selfieUrl = req.files && req.files.selfie ? req.files.selfie[0].path : null;

    const isSkipped = identityVerificationSkipped === 'true' || identityVerificationSkipped === true;
    const isDbConnected = mongoose.connection.readyState === 1;

    let appNo;
    if (isDbConnected) {
      appNo = await generateApplicationNumber(Membership, category);
    } else {
      const code = categoryCodeMap[category] || "GN";
      const count = mockMemberships.length;
      const seq = String(count + 1).padStart(6, "0");
      appNo = `APP-${code}-${seq}`;
    }

    const baseAmount = parseFloat(amount || 0);
    const donation = parseFloat(optionalDonation || 0);
    const total = baseAmount + donation;

    let newMember;
    if (isDbConnected) {
      newMember = await Membership.create({
        fullName,
        mobile,
        email: email || '',
        state,
        district,
        city,
        dob: new Date(dob),
        gender,
        occupation: occupation || 'Volunteer',
        category,
        level,
        amount: baseAmount,
        professionalCategory,
        photoUrl: selfieUrl || photoUrl,
        idProofUrl: aadhaarFrontUrl || idProofUrl,
        completeAddress,
        pincode,
        identityVerification: {
          aadhaarFrontUrl,
          aadhaarBackUrl,
          selfieUrl,
          status: isSkipped ? 'skipped' : 'pending'
        },
        optionalDonation: donation,
        totalAmountPaid: total,
        applicationNumber: appNo,
        message,
        paymentStatus: 'pending',
        applicationStatus: 'pending'
      });
    } else {
      console.warn("MongoDB is offline. Saving membership application in-memory.");
      newMember = {
        _id: 'mock_mem_' + Date.now(),
        fullName,
        mobile,
        email: email || '',
        state,
        district,
        city,
        dob: new Date(dob),
        gender,
        occupation: occupation || 'Volunteer',
        category,
        level,
        amount: baseAmount,
        professionalCategory,
        photoUrl: selfieUrl || photoUrl,
        idProofUrl: aadhaarFrontUrl || idProofUrl,
        completeAddress,
        pincode,
        identityVerification: {
          aadhaarFrontUrl,
          aadhaarBackUrl,
          selfieUrl,
          status: isSkipped ? 'skipped' : 'pending'
        },
        optionalDonation: donation,
        totalAmountPaid: total,
        applicationNumber: appNo,
        message,
        paymentStatus: 'pending',
        applicationStatus: 'pending',
        save: async function() { return this; }
      };
      mockMemberships.push(newMember);
    }

    return res.status(200).json({
      success: true,
      message: 'Membership registration submitted successfully. Please proceed to payment step.',
      memberId: null,
      id: newMember._id,
      membershipId: newMember._id,
      amount: newMember.amount,
      applicationNumber: newMember.applicationNumber,
      totalAmountPaid: newMember.totalAmountPaid
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

// DEV ONLY / UNUSED: Mark paid test flow
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

exports.getReceiptPdf = async (req, res, next) => {
  const { id } = req.params;
  try {
    const member = await Membership.findById(id);
    if (!member) {
      return res.status(404).json({ success: false, message: 'Membership record not found' });
    }

    const pdfBuffer = await generateMembershipReceiptPdf(member);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Receipt-${member.applicationNumber || member._id}.pdf`);
    return res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};

// Create Razorpay order for a submitted membership application
exports.createMembershipOrder = async (req, res, next) => {
  const { membershipId } = req.body;

  if (!membershipId) {
    return res.status(400).json({ success: false, message: "Membership ID is required" });
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ 
      success: false, 
      message: 'Payment gateway configuration is missing on the server' 
    });
  }
  
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    let membership;

    if (isDbConnected) {
      membership = await Membership.findById(membershipId);
    } else {
      membership = mockMemberships.find(m => String(m._id) === String(membershipId));
    }

    if (!membership) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    if (membership.paymentStatus === 'paid') {
      return res.status(400).json({ success: false, message: "Application has already been paid" });
    }

    const totalAmount = membership.totalAmountPaid || membership.amount;
    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid membership amount calculated on backend" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100),
      currency: "INR",
      receipt: `mem_${membershipId}`.slice(0, 40),
    });

    // Save order ID and set status to pending
    membership.razorpayOrderId = order.id;
    if (isDbConnected) {
      await membership.save();
    }

    return res.json({ 
      success: true,
      orderId: order.id, 
      amount: order.amount, 
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID, 
      membershipId 
    });
  } catch (err) {
    next(err);
  }
};

// Verify membership payment
exports.verifyMembershipPayment = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, membershipId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !membershipId) {
    return res.status(400).json({ success: false, message: "Missing required signature verification fields" });
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ success: false, message: "Payment secret is missing on the server" });
  }
  
  try {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const expectedBuf = Buffer.from(expectedSignature);
    const actualBuf = Buffer.from(razorpay_signature);

    let signatureMatch = false;
    if (expectedBuf.length === actualBuf.length) {
      signatureMatch = crypto.timingSafeEqual(expectedBuf, actualBuf);
    }

    if (!signatureMatch) {
      return res.status(400).json({ success: false, message: "Payment verification failed: Signature mismatch" });
    }

    const isDbConnected = mongoose.connection.readyState === 1;
    let membership;

    if (isDbConnected) {
      membership = await Membership.findById(membershipId);
    } else {
      membership = mockMemberships.find(m => String(m._id) === String(membershipId));
    }

    if (!membership) {
      return res.status(404).json({ success: false, message: "Membership application not found" });
    }

    if (membership.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ success: false, message: "Payment verification failed: Order ID mismatch" });
    }

    if (membership.paymentStatus === 'paid') {
      return res.json({ success: true, membership, message: "Payment already verified successfully" });
    }

    membership.paymentStatus = 'paid';
    membership.razorpayPaymentId = razorpay_payment_id;
    if (isDbConnected) {
      await membership.save();
    }

    return res.json({ success: true, membership });
  } catch (err) {
    next(err);
  }
};

