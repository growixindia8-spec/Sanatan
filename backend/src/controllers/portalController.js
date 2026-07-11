const FinancialReport = require('../models/FinancialReport');
const Member = require('../models/Member');

exports.uploadFinancialReport = async (req, res, next) => {
  const { reportTitle, fiscalYear, categoryTag } = req.body;

  if (!reportTitle || !fiscalYear || !categoryTag || !req.file) {
    return res.status(400).json({ success: false, message: 'Please provide all report specifications and a PDF file' });
  }

  try {
    const fileUrl = req.file.path; // Cloudinary URL

    const report = await FinancialReport.create({
      reportTitle,
      fiscalYear,
      categoryTag,
      fileUrl,
      uploadedBy: req.user._id
    });

    return res.status(200).json({
      success: true,
      message: 'Financial statement uploaded and published successfully',
      report
    });

  } catch (err) {
    next(err);
  }
};

exports.getDashboardStats = async (req, res, next) => {
  try {
    const activeMembersCount = await Member.countDocuments({ applicationStatus: 'approved' });
    const pendingVerifications = await Member.countDocuments({ applicationStatus: 'pending' });
    const reportsCount = await FinancialReport.countDocuments();
    
    return res.status(200).json({
      success: true,
      data: {
        activeMembersCount,
        pendingVerifications,
        reportsThisMonth: reportsCount,
        upcomingMissions: 3,
        zoneName: 'Central Zone (Maharashtra)'
      }
    });

  } catch (err) {
    next(err);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const mockNotifications = [
      { id: 1, title: 'Annual General Assembly meeting scheduled on 15th August', priority: 'high', date: new Date() },
      { id: 2, title: 'Central database credentials update cycle starting tomorrow', priority: 'medium', date: new Date() },
      { id: 3, title: 'Monsoon distribution drive checklist ready for download', priority: 'low', date: new Date() }
    ];

    return res.status(200).json({ success: true, count: mockNotifications.length, notifications: mockNotifications });
  } catch (err) {
    next(err);
  }
};
