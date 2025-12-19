const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const processImage = async (filePath, useCloudinary = true) => {
  try {
    const outputPath = path.join(
      path.dirname(filePath),
      'processed-' + path.basename(filePath)
    );

    await sharp(filePath)
      .resize(450, 350, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    if (useCloudinary && process.env.CLOUDINARY_CLOUD_NAME) {
      const result = await cloudinary.uploader.upload(outputPath, {
        folder: 'mern-app',
        transformation: [
          { width: 450, height: 350, crop: 'fill', quality: 'auto' },
        ],
      });

      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);

      return result.secure_url;
    }

    fs.unlinkSync(filePath);
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const imageUrl = `${backendUrl}/uploads/${path.basename(outputPath)}`;
    return imageUrl;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error(`Image processing failed: ${error.message}`);
  }
};

module.exports = { processImage };

