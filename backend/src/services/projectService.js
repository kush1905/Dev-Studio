const Project = require('../models/Project');
const { processImage } = require('../utils/imageProcessor');

exports.createProject = async (data, imagePath) => {
  let imageUrl = data.image;

  if (imagePath) {
    imageUrl = await processImage(imagePath, true);
  }

  const project = await Project.create({
    name: data.name,
    description: data.description,
    image: imageUrl,
  });

  return project;
};

exports.getAllProjects = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const projects = await Project.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments();

  return {
    projects,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

exports.updateProject = async (id, data, imagePath) => {
  let updateData = {
    name: data.name,
    description: data.description,
  };

  if (imagePath) {
    updateData.image = await processImage(imagePath, true);
  } else if (data.image) {
    // If passing a direct URL or blob logic handled elsewhere, though typically we expect imagePath from new uploads
    updateData.image = data.image;
  }

  const project = await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return project;
};

exports.deleteProject = async (id) => {
  const project = await Project.findByIdAndDelete(id);
  return project;
};



