const Newsletter = require('../models/Newsletter');

exports.getAllSubscribers = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const subscribers = await Newsletter.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Newsletter.countDocuments();

  return {
    subscribers,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};


