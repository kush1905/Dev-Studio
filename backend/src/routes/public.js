const express = require('express');
const router = express.Router();
const {
  getProjects,
  getClients,
  submitContact,
  subscribeNewsletter,
} = require('../controllers/publicController');

router.get('/projects', getProjects);
router.get('/clients', getClients);
router.post('/contact', submitContact);
router.post('/newsletter', subscribeNewsletter);

module.exports = router;


