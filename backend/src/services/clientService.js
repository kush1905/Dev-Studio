const Client = require('../models/Client');
const { processImage } = require('../utils/imageProcessor');

exports.createClient = async (data, imagePath) => {
  let imageUrl = data.image;

  if (imagePath) {
    imageUrl = await processImage(imagePath, true);
  }

  const client = await Client.create({
    name: data.name,
    description: data.description,
    designation: data.designation,
    image: imageUrl,
  });

  return client;
};

exports.getAllClients = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const clients = await Client.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Client.countDocuments();

  return {
    clients,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

exports.updateClient = async (id, data, imagePath) => {
  let updateData = {
    name: data.name,
    description: data.description,
    designation: data.designation,
  };

  if (imagePath) {
    updateData.image = await processImage(imagePath, true);
  } else if (data.image) {
    updateData.image = data.image;
  }

  const client = await Client.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return client;
};

exports.deleteClient = async (id) => {
  const client = await Client.findByIdAndDelete(id);
  return client;
};


