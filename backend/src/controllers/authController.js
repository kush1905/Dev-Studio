const Admin = require('../models/Admin');
const asyncHandler = require('../middlewares/asyncHandler');

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please provide username and password',
    });
  }

  const admin = await Admin.findOne({ username }).select('+password');

  if (!admin) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials',
    });
  }

  const isMatch = await admin.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials',
    });
  }

  const token = admin.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
    admin: {
      id: admin._id,
      username: admin.username,
    },
  });
});


