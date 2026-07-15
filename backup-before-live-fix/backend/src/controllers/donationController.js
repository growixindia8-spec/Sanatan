const Donation = require('../models/Donation');
const { generateReceiptPdf, uploadPdfToCloudinary } = require('../utils/generatePdf');
const { sendEmail } = require('../utils/sendEmail');
const razorpay = require('../config/razorpay');
const crypto = require('crypto');
const mongoose = require('mongoose');

const mockDonations = [];

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

// Create Razorpay order
exports.createRazorpayOrder = async (req, res, next) => {
  const { amount, fullName, email, mobile, projectFor, contributionType, claim80G, panNumber, festivalId, festivalName, campaign, sourceType } = req.body;

  if (!fullName || !email || !mobile || !amount || !projectFor || !contributionType) {
    return res.status(400).json({ success: false, message: 'Please specify all required fields (fullName, email, mobile, amount, projectFor, contributionType)' });
  }

  // Validate amount is numeric and greater than zero
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Amount must be a numeric value greater than zero' });
  }

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ 
      success: false, 
      message: 'Payment gateway configuration is missing on the server' 
    });
  }

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(numericAmount * 100), // paise
      currency: "INR",
      receipt: `don_${Date.now()}`.slice(0, 40), // Ensure receipt length limit under 40 chars
    });

    let normalizedType = (contributionType || '').toLowerCase().trim();
    if (normalizedType === 'one time') normalizedType = 'one-time';
    if (!['one-time', 'monthly', 'quarterly', 'yearly'].includes(normalizedType)) {
      normalizedType = 'one-time';
    }

    const isDbConnected = mongoose.connection.readyState === 1;
    let donation;

    if (isDbConnected) {
      donation = await Donation.create({
        fullName,
        email,
        mobile,
        amount: numericAmount,
        projectFor,
        contributionType: normalizedType,
        paymentMode: "razorpay",
        razorpayOrderId: order.id,
        paymentStatus: "pending",
        want80G: claim80G === 'true' || claim80G === true || claim80G === 'yes',
        panNumber,
        festivalId,
        festivalName,
        campaign,
        sourceType: sourceType || 'direct'
      });
    } else {
      console.warn("MongoDB is offline. Saving donation in-memory.");
      donation = {
        _id: 'mock_don_' + Date.now(),
        fullName,
        email,
        mobile,
        amount: numericAmount,
        projectFor,
        contributionType: normalizedType,
        paymentMode: "razorpay",
        razorpayOrderId: order.id,
        paymentStatus: "pending",
        want80G: claim80G === 'true' || claim80G === true || claim80G === 'yes',
        panNumber,
        festivalId,
        festivalName,
        campaign,
        sourceType: sourceType || 'direct',
        save: async function() { return this; }
      };
      mockDonations.push(donation);
    }

    return res.json({ 
      success: true,
      orderId: order.id, 
      amount: order.amount, 
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID, 
      donationId: donation._id 
    });
  } catch (err) {
    next(err);
  }
};

// Verify Razorpay payment
exports.verifyRazorpayPayment = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !donationId) {
    return res.status(400).json({ success: false, message: 'Missing required signature verification fields' });
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ success: false, message: 'Payment secret is missing on the server' });
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
    let donation;

    if (isDbConnected) {
      donation = await Donation.findById(donationId);
    } else {
      donation = mockDonations.find(d => String(d._id) === String(donationId));
    }

    if (!donation) {
      return res.status(404).json({ success: false, message: "Donation record not found" });
    }

    // Check that the order ID matches the pending record
    if (donation.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({ success: false, message: "Payment verification failed: Order ID mismatch" });
    }

    // Prevent duplicate processing
    if (donation.paymentStatus === 'verified') {
      return res.json({ success: true, donation, message: "Donation already processed successfully" });
    }

    donation.paymentStatus = 'verified';
    donation.razorpayPaymentId = razorpay_payment_id;

    if (isDbConnected) {
      // Generate 80G receipt if applicable
      if (donation.want80G) {
        console.log('Generating 80G receipt PDF...');
        try {
          const pdfBuffer = await generateReceiptPdf(donation);
          const pdfUrl = await uploadPdfToCloudinary(pdfBuffer, `receipt_${donation._id.toString()}`);
          donation.receiptUrl = pdfUrl;
        } catch (pdfErr) {
          console.error('Error generating/uploading PDF receipt:', pdfErr);
        }
      }
      await donation.save();
    } else {
      donation.receiptUrl = 'https://res.cloudinary.com/dummy/receipt_mock.pdf';
    }

    // Send confirmation email to Donor
    try {
      await sendEmail({
        to: donation.email,
        subject: '🙏 Thank You for your donation - Verified Status',
        text: `Dear ${donation.fullName}, we have successfully verified your contribution of INR ${donation.amount}. Thank you for your support.`,
        html: `<h3>Dear ${donation.fullName},</h3><p>We have successfully verified your contribution of <strong>INR ${donation.amount}</strong> to ${donation.projectFor}.</p>${donation.receiptUrl ? `<p>You can download your 80G donation receipt here: <a href="${donation.receiptUrl}">Download Receipt</a></p>` : ''}<p>Regards,<br/>Sanatan Dharm Manav Kalyan Foundation</p>`
      });
    } catch (emailErr) {
      console.error('Error sending confirmation email:', emailErr);
    }

    return res.json({ success: true, donation });
  } catch (err) {
    next(err);
  }
};

exports.verifyTransaction = async (req, res, next) => {
  const { utr } = req.query;

  if (!utr) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a transaction UTR code to verify.'
    });
  }

  try {
    const donation = await Donation.findOne({
      $or: [
        { transactionRef: utr },
        { razorpayPaymentId: utr },
        { razorpayOrderId: utr }
      ]
    });

    if (!donation) {
      return res.status(200).json({
        success: true,
        valid: false,
        message: 'No registered records match the transaction reference provided.'
      });
    }

    return res.status(200).json({
      success: true,
      valid: true,
      name: donation.fullName,
      status: donation.paymentStatus,
      amount: donation.amount,
      projectFor: donation.projectFor,
      date: new Date(donation.createdAt).toLocaleDateString('hi-IN')
    });
  } catch (err) {
    next(err);
  }
};
