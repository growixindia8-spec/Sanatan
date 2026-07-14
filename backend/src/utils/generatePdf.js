const PDFDocument = require('pdfkit');
const cloudinary = require('../config/cloudinary');

function generateReceiptPdf(donation) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', err => reject(err));

    // Draw header
    doc.fillColor('#FF6600').fontSize(22).text('Sanatan Dharm Manav Kalyan Foundation', { align: 'center' });
    doc.fillColor('#444444').fontSize(10).text('CIN: U88900MR2026NPL47439 | Registered Section 8 NGO', { align: 'center' });
    doc.moveDown(2);

    // Title
    doc.fontSize(16).fillColor('#FF6600').text('DONATION RECEIPT (UNDER SECTION 80G)', { align: 'center', underline: true });
    doc.moveDown(2);

    // Grid layout values
    doc.fontSize(12).fillColor('#333333');
    doc.text(`Receipt Reference: SDMKF-REC-${donation._id.toString().slice(-6).toUpperCase()}`);
    doc.text(`Donor Name: ${donation.fullName}`);
    doc.text(`Mobile Number: ${donation.mobile}`);
    doc.text(`Email: ${donation.email}`);
    doc.text(`PAN Card Number: ${donation.panNumber || 'N/A'}`);
    doc.text(`Donation Project: ${donation.projectFor}`);
    doc.text(`Payment Mode: ${donation.paymentMode.toUpperCase()}`);
    doc.text(`Transaction Reference: ${donation.transactionRef || 'N/A'}`);
    doc.moveDown(1.5);

    // Amount box
    doc.rect(50, doc.y, 500, 40).fill('#FFE5D9');
    doc.fillColor('#FF6600').fontSize(14).text(`Donation Amount: INR ${donation.amount}/-`, 65, doc.y + 12, { bold: true });
    doc.moveDown(3);

    // Footer signature
    doc.fontSize(10).fillColor('#888888').text('This is a computer-generated donation receipt. No physical signature is required under section 80G of the Income Tax Act.', { align: 'center', italic: true });

    doc.end();
  });
}

function generateMemberIdCardPdf(member) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: [240, 380], margin: 15 });
    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', err => reject(err));

    // Design layout card
    doc.rect(0, 0, 240, 380).fill('#1A0B10');
    doc.rect(0, 0, 240, 50).fill('#FF6600');

    // Title
    doc.fillColor('#FFFFFF').fontSize(12).text('Sanatan Dharm Foundation', 15, 12, { bold: true });
    doc.fontSize(7).text('Manav Kalyan Foundation', 15, 26);

    // Label Details
    doc.fillColor('#FF9933').fontSize(9).text('OFFICIAL IDENTITY CARD', 15, 65, { bold: true });
    doc.moveDown(1.5);

    doc.fillColor('#FFFFFF').fontSize(8);
    doc.text(`Name: ${member.fullName}`);
    doc.text(`ID: ${member.memberId}`);
    doc.text(`Category: ${member.category.toUpperCase()}`);
    doc.text(`Level: ${member.level}`);
    doc.text(`Valid Area: ${member.city}, ${member.state}`);
    doc.text(`Joined: ${new Date(member.createdAt).toLocaleDateString()}`);

    doc.moveDown(2);
    doc.fontSize(6).fillColor('#888888').text('This card is properties of SDMKF for verification purpose only.', { align: 'center' });

    doc.end();
  });
}

function uploadPdfToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'receipts_and_idcards', public_id: filename, resource_type: 'raw' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
}

function generateMembershipReceiptPdf(member) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const chunks = [];
    doc.on('data', chunk => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', err => reject(err));

    // Draw header
    doc.fillColor('#FF6600').fontSize(22).text('Sanatan Dharm Manav Kalyan Foundation', { align: 'center' });
    doc.fillColor('#444444').fontSize(10).text('CIN: U88900MR2026NPL47439 | Registered Section 8 NGO', { align: 'center' });
    doc.moveDown(2);

    // Title
    doc.fontSize(16).fillColor('#FF6600').text('MEMBERSHIP REGISTRATION RECEIPT', { align: 'center', underline: true });
    doc.moveDown(2);

    // Grid layout values
    doc.fontSize(12).fillColor('#333333');
    doc.text(`Application Number: ${member.applicationNumber || 'N/A'}`);
    doc.text(`Applicant Name: ${member.fullName}`);
    doc.text(`Mobile Number: ${member.mobile}`);
    doc.text(`Email: ${member.email || 'N/A'}`);
    doc.text(`Category: ${member.category.toUpperCase()}`);
    doc.text(`Level: ${member.level}`);
    doc.text(`State: ${member.state}`);
    doc.text(`District: ${member.district}`);
    doc.text(`City: ${member.city}`);
    doc.text(`Payment Status: ${member.paymentStatus.toUpperCase()}`);
    doc.text(`Date of Submission: ${new Date(member.createdAt).toLocaleDateString()}`);
    doc.moveDown(1.5);

    // Amount box
    const currentY = doc.y;
    doc.rect(50, currentY, 500, 60).fill('#FFE5D9');
    doc.fillColor('#FF6600').fontSize(11);
    doc.text(`Registration Fee: INR ${member.amount}/-`, 65, currentY + 10);
    doc.text(`Optional Donation: INR ${member.optionalDonation || 0}/-`, 65, currentY + 25);
    doc.text(`Total Amount Paid: INR ${member.totalAmountPaid || member.amount}/-`, 65, currentY + 40, { bold: true });
    doc.y = currentY + 75; // resume relative positioning below box
    doc.moveDown(2);

    // Footer signature
    doc.fontSize(10).fillColor('#888888').text('This is a system-generated receipt. No physical signature is required.', { align: 'center', italic: true });

    doc.end();
  });
}

module.exports = {
  generateReceiptPdf,
  generateMemberIdCardPdf,
  uploadPdfToCloudinary,
  generateMembershipReceiptPdf
};
