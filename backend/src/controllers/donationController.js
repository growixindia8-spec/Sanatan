const Donation = require('../models/Donation');
const { generateReceiptPdf, uploadPdfToCloudinary } = require('../utils/generatePdf');
const { sendEmail } = require('../utils/sendEmail');

exports.bankTransfer = async (req, res, next) => {
  const { fullName, email, mobile, amount, contributionType, projectFor, transactionRef, want80G, panNumber } = req.body;

  if (!fullName || !email || !mobile || !amount || !contributionType || !projectFor || !transactionRef) {
    return res.status(400).json({ success: false, message: 'Please provide all required transaction fields' });
  }

  try {
    const paymentScreenshotUrl = req.file ? req.file.path : null;

    const donation = await Donation.create({
      fullName,
      email,
      mobile,
      amount: parseFloat(amount),
      contributionType,
      projectFor,
      paymentMode: 'bank-transfer',
      transactionRef,
      paymentScreenshotUrl,
      want80G: want80G === 'true' || want80G === true,
      panNumber
    });

    // Notify Administrator via email
    await sendEmail({
      to: process.env.SMTP_USER,
      subject: `🚨 NEW BANK TRANSFER DONATION PENDING VERIFICATION - INR ${amount}`,
      text: `Hello Admin, a new bank transfer donation of INR ${amount} has been submitted by ${fullName} (PAN: ${panNumber || 'N/A'}). Transaction UTR: ${transactionRef}. Screenshot: ${paymentScreenshotUrl || 'None'}. Please verify at Coordinator Desk.`,
      html: `<p>Hello Admin,</p><p>A new bank transfer donation of <strong>INR ${amount}</strong> has been submitted by ${fullName}.</p><p>Transaction UTR: ${transactionRef}</p><p>Please review and verify on Admin Portal.</p>`
    });

    return res.status(200).json({
      success: true,
      message: 'Donation confirmation received. Pending verification by administration team.',
      donationId: donation._id
    });

  } catch (err) {
    next(err);
  }
};

exports.getDonationById = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }
    return res.status(200).json({ success: true, donation });
  } catch (err) {
    next(err);
  }
};

exports.verifyDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }

    donation.paymentStatus = 'verified';

    // Generate 80G receipt if applicable
    if (donation.want80G) {
      console.log('Generating 80G receipt PDF...');
      const pdfBuffer = await generateReceiptPdf(donation);
      const pdfUrl = await uploadPdfToCloudinary(pdfBuffer, `receipt_${donation._id.toString()}`);
      donation.receiptUrl = pdfUrl;
    }

    await donation.save();

    // Send confirmation email to Donor
    await sendEmail({
      to: donation.email,
      subject: '🙏 Thank You for your donation - Verified Status',
      text: `Dear ${donation.fullName}, we have successfully verified your contribution of INR ${donation.amount}. Thank you for your support.`,
      html: `<h3>Dear ${donation.fullName},</h3><p>We have successfully verified your contribution of <strong>INR ${donation.amount}</strong> to ${donation.projectFor}.</p>${donation.receiptUrl ? `<p>You can download your 80G donation receipt here: <a href="${donation.receiptUrl}">Download Receipt</a></p>` : ''}<p>Regards,<br/>Sanatan Dharm Manav Kalyan Foundation</p>`
    });

    return res.status(200).json({
      success: true,
      message: 'Donation verified successfully. Notification dispatch complete.',
      donation
    });

  } catch (err) {
    next(err);
  }
};

// Razorpay Order Creation Placeholder
exports.createRazorpayOrder = async (req, res) => {
  return res.status(200).json({
    success: false,
    message: 'Online payment gateway integration coming soon. Please use Bank Transfer or QR Code for now.'
  });
};

// Razorpay webhook/verification placeholder
exports.verifyRazorpayPayment = async (req, res) => {
  // Webhook integration endpoint
  return res.status(200).json({
    success: true,
    message: 'Razorpay webhook placeholder received'
  });
};
