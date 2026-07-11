const Certificate = require('../models/Certificate');

exports.verifyDocument = async (req, res, next) => {
  const { documentType, credentialNumber } = req.params;

  try {
    const document = await Certificate.findOne({ documentType, credentialNumber });

    if (!document) {
      return res.status(200).json({ 
        success: true, 
        valid: false, 
        message: 'No registered records match the credentials provided.' 
      });
    }

    return res.status(200).json({
      success: true,
      valid: true,
      name: document.recipientName,
      status: document.status,
      issuedDate: new Date(document.issuedDate).toLocaleDateString('hi-IN')
    });

  } catch (err) {
    next(err);
  }
};
