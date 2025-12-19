const Contact = require('../models/Contact');

exports.getAllContacts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  
  const contacts = await Contact.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Contact.countDocuments();

  return {
    contacts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};


