const asyncHandler = require('../middlewares/asyncHandler');
const projectService = require('../services/projectService');
const clientService = require('../services/clientService');
const contactService = require('../services/contactService');
const newsletterService = require('../services/newsletterService');

exports.addProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const imagePath = req.file ? req.file.path : null;

  if (!name || !description) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name and description',
    });
  }

  if (!imagePath && !req.body.image) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an image',
    });
  }

  const project = await projectService.createProject(req.body, imagePath);

  res.status(201).json({
    success: true,
    data: project,
  });
});

exports.getProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await projectService.getAllProjects(page, limit);

  res.status(200).json({
    success: true,
    ...result,
  });
});

exports.addClient = asyncHandler(async (req, res) => {
  const { name, description, designation } = req.body;
  const imagePath = req.file ? req.file.path : null;

  if (!name || !description || !designation) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name, description, and designation',
    });
  }

  if (!imagePath && !req.body.image) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an image',
    });
  }

  const client = await clientService.createClient(req.body, imagePath);

  res.status(201).json({
    success: true,
    data: client,
  });
});

exports.getClients = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await clientService.getAllClients(page, limit);

  res.status(200).json({
    success: true,
    ...result,
  });
});

exports.getContacts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await contactService.getAllContacts(page, limit);

  res.status(200).json({
    success: true,
    ...result,
  });
});

exports.getNewsletters = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await newsletterService.getAllSubscribers(page, limit);

  res.status(200).json({
    success: true,
    ...result,
  });
});

exports.updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const imagePath = req.file ? req.file.path : null;
  const project = await projectService.updateProject(id, req.body, imagePath);
  if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
  res.status(200).json({ success: true, data: project });
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await projectService.deleteProject(id);
  if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
  res.status(200).json({ success: true, data: {} });
});

exports.updateClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const imagePath = req.file ? req.file.path : null;
  const client = await clientService.updateClient(id, req.body, imagePath);
  if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
  res.status(200).json({ success: true, data: client });
});

exports.deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const client = await clientService.deleteClient(id);
  if (!client) return res.status(404).json({ success: false, error: 'Client not found' });
  res.status(200).json({ success: true, data: {} });
});



