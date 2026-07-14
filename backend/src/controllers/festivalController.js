const Festival = require('../models/Festival');

// Helper to get start and end dates for a YYYY-MM string
const getMonthDateRange = (monthStr) => {
  const [year, month] = monthStr.split('-').map(Number);
  // Start date in UTC (will match MongoDB date ranges accurately)
  const startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
  // End date is day 0 of next month at end of day
  const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
  return { startDate, endDate };
};

// GET /api/festivals
// Supports filtering by month e.g. ?month=2026-07
exports.getFestivals = async (req, res, next) => {
  try {
    const { month } = req.query;
    let query = { isPublished: true };

    if (month && /^\d{4}-\d{2}$/.test(month)) {
      const { startDate, endDate } = getMonthDateRange(month);
      query.festivalDate = { $gte: startDate, $lte: endDate };
    }

    const festivals = await Festival.find(query)
      .sort({ festivalDate: 1, displayOrder: 1 });

    return res.status(200).json({ success: true, count: festivals.length, data: festivals });
  } catch (err) {
    next(err);
  }
};

// GET /api/festivals/upcoming
exports.getUpcomingFestivals = async (req, res, next) => {
  try {
    const now = new Date();
    const festivals = await Festival.find({
      isPublished: true,
      festivalDate: { $gte: now }
    })
      .sort({ festivalDate: 1, displayOrder: 1 });

    return res.status(200).json({ success: true, count: festivals.length, data: festivals });
  } catch (err) {
    next(err);
  }
};

// GET /api/festivals/home
exports.getHomeFestivals = async (req, res, next) => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const monthStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
    const { startDate, endDate } = getMonthDateRange(monthStr);

    let festivals = await Festival.find({
      isPublished: true,
      festivalDate: { $gte: startDate, $lte: endDate }
    }).sort({ festivalDate: 1, displayOrder: 1 });

    if (festivals.length === 0) {
      festivals = await Festival.find({
        isPublished: true,
        festivalDate: { $gte: now }
      })
        .sort({ festivalDate: 1, displayOrder: 1 })
        .limit(4);
    } else {
      festivals = festivals.slice(0, 4);
    }

    return res.status(200).json({ success: true, count: festivals.length, data: festivals });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/festivals
exports.adminGetFestivals = async (req, res, next) => {
  try {
    const festivals = await Festival.find({})
      .sort({ festivalDate: 1, displayOrder: 1 });
    return res.status(200).json({ success: true, count: festivals.length, data: festivals });
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/festivals
exports.adminCreateFestival = async (req, res, next) => {
  try {
    const { festivalName, festivalDate, associatedMission, donationCampaign, donationLink, status, isPublished, displayOrder } = req.body;

    if (!festivalName || !festivalDate || !associatedMission) {
      return res.status(400).json({ success: false, message: 'Please provide festivalName, festivalDate, and associatedMission' });
    }

    // Input sanitization / validation
    const dateObj = new Date(festivalDate);
    if (isNaN(dateObj.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid festival date provided' });
    }

    const festival = await Festival.create({
      festivalName,
      festivalDate: dateObj,
      associatedMission,
      donationCampaign,
      donationLink,
      status: status || 'active',
      isPublished: isPublished !== undefined ? isPublished : true,
      displayOrder: Number(displayOrder) || 0,
      createdBy: req.user ? req.user._id : null,
      updatedBy: req.user ? req.user._id : null
    });

    return res.status(201).json({ success: true, data: festival });
  } catch (err) {
    next(err);
  }
};

// PUT /api/admin/festivals/:id
exports.adminUpdateFestival = async (req, res, next) => {
  try {
    const { festivalName, festivalDate, associatedMission, donationCampaign, donationLink, status, isPublished, displayOrder } = req.body;

    const festival = await Festival.findById(req.params.id);
    if (!festival) {
      return res.status(404).json({ success: false, message: 'Festival not found' });
    }

    if (festivalName) festival.festivalName = festivalName;
    if (festivalDate) {
      const dateObj = new Date(festivalDate);
      if (isNaN(dateObj.getTime())) {
        return res.status(400).json({ success: false, message: 'Invalid festival date provided' });
      }
      festival.festivalDate = dateObj;
    }
    if (associatedMission) festival.associatedMission = associatedMission;
    if (donationCampaign !== undefined) festival.donationCampaign = donationCampaign;
    if (donationLink !== undefined) festival.donationLink = donationLink;
    if (status) festival.status = status;
    if (isPublished !== undefined) festival.isPublished = isPublished;
    if (displayOrder !== undefined) festival.displayOrder = Number(displayOrder) || 0;
    
    festival.updatedBy = req.user ? req.user._id : null;
    await festival.save();

    return res.status(200).json({ success: true, data: festival });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/festivals/:id
exports.adminDeleteFestival = async (req, res, next) => {
  try {
    const festival = await Festival.findByIdAndDelete(req.params.id);
    if (!festival) {
      return res.status(404).json({ success: false, message: 'Festival not found' });
    }
    return res.status(200).json({ success: true, message: 'Festival successfully deleted' });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/admin/festivals/:id/status
exports.adminPatchFestivalStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status || !['active', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Please specify status as active or completed' });
    }

    const festival = await Festival.findById(req.params.id);
    if (!festival) {
      return res.status(404).json({ success: false, message: 'Festival not found' });
    }

    festival.status = status;
    festival.updatedBy = req.user ? req.user._id : null;
    await festival.save();

    return res.status(200).json({ success: true, data: festival });
  } catch (err) {
    next(err);
  }
};
