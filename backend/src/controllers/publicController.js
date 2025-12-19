const asyncHandler = require('../middlewares/asyncHandler');
const Project = require('../models/Project');
const Client = require('../models/Client');
const Contact = require('../models/Contact');
const Newsletter = require('../models/Newsletter');

exports.getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: projects,
  });
});

exports.getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: clients,
  });
});

exports.submitContact = asyncHandler(async (req, res) => {
  const { fullName, email, mobile, city, message } = req.body;

  if (!fullName || !email || !mobile || !city || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide all required fields',
    });
  }

  const contact = await Contact.create({
    fullName,
    email,
    mobile,
    city,
    message,
  });

  res.status(201).json({
    success: true,
    message: 'Contact form submitted successfully',
    data: contact,
  });
});

exports.subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an email address',
    });
  }

  try {
    const subscriber = await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscriber,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Email already subscribed',
      });
    }
    throw error;
  }
});


