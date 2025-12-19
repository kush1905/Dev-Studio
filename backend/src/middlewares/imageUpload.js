const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage (memory storage for processing with Sharp)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB limit
  }
});

// Middleware for resizing
const resizeImage = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `image-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpeg`;

  try {
    await sharp(req.file.buffer)
      .resize(450, 350, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(path.join(uploadDir, req.file.filename));

    // Add file path to req.body.image for the controller to save
    // We save the relative URL path
    req.body.image = `/uploads/${req.file.filename}`;

    next();
  } catch (error) {
    next(error);
  }
};

const uploadSingle = (fieldName) => {
  return [upload.single(fieldName), resizeImage];
};

module.exports = { uploadSingle };


