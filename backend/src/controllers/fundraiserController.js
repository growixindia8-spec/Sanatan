const Fundraiser = require('../models/Fundraiser');

exports.submitFundraiser = async (req, res, next) => {
  try {
    const photoVideoUrl = req.files && req.files.photoVideo ? req.files.photoVideo[0].path : null;
    const idProofUrl = req.files && req.files.idProof ? req.files.idProof[0].path : null;
    
    // Support file arrays
    const supportingDocsUrls = [];
    if (req.files && req.files.supportingDocs) {
      req.files.supportingDocs.forEach(file => {
        supportingDocsUrls.push(file.path);
      });
    }

    const fundraiser = await Fundraiser.create({
      ...req.body,
      photoVideoUrl,
      idProofUrl,
      supportingDocsUrls,
      status: 'pending'
    });

    return res.status(200).json({
      success: true,
      message: 'Crowdfunding request submitted successfully. Verification review pending.',
      fundraiserId: fundraiser._id
    });

  } catch (err) {
    next(err);
  }
};

exports.approveFundraiser = async (req, res, next) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser) {
      return res.status(404).json({ success: false, message: 'Fundraiser record not found' });
    }

    fundraiser.status = 'approved';
    await fundraiser.save();

    return res.status(200).json({ success: true, message: 'Fundraiser approved and published successfully', fundraiser });
  } catch (err) {
    next(err);
  }
};

exports.getActiveFundraisers = async (req, res, next) => {
  try {
    const fundraisers = await Fundraiser.find({ status: 'approved' });
    return res.status(200).json({ success: true, count: fundraisers.length, fundraisers });
  } catch (err) {
    next(err);
  }
};

exports.updateRaisedAmount = async (req, res, next) => {
  const { amount } = req.body;

  if (amount === undefined) {
    return res.status(400).json({ success: false, message: 'Please provide contribution amount value' });
  }

  try {
    const fundraiser = await Fundraiser.findById(req.params.id);
    if (!fundraiser) {
      return res.status(404).json({ success: false, message: 'Fundraiser record not found' });
    }

    fundraiser.raisedAmount = parseFloat(amount);
    await fundraiser.save();

    return res.status(200).json({ success: true, message: 'Raised fund metrics updated successfully', fundraiser });
  } catch (err) {
    next(err);
  }
};
