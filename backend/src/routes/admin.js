const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { uploadSingle } = require('../middlewares/imageUpload');
const {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
  addClient,
  getClients,
  updateClient,
  deleteClient,
  getContacts,
  getNewsletters,
} = require('../controllers/adminController');

router.use(protect);

// Projects
router.post('/projects', uploadSingle('image'), addProject);
router.get('/projects', getProjects);
router.put('/projects/:id', uploadSingle('image'), updateProject);
router.delete('/projects/:id', deleteProject);

// Clients
router.post('/clients', uploadSingle('image'), addClient);
router.get('/clients', getClients);
router.put('/clients/:id', uploadSingle('image'), updateClient);
router.delete('/clients/:id', deleteClient);

router.get('/contacts', getContacts);
router.get('/newsletters', getNewsletters);

module.exports = router;



