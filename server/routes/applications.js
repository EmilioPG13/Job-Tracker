const express = require('express');
const router = express.Router();
const { 
    getApplications, 
    getApplication, 
    createApplication, 
    updateApplication, 
    deleteApplication 
} = require('../controllers/applicationController');
const { auth } = require('../middleware/auth');
const { 
    validateApplication, 
    validateApplicationUpdate, 
    validateId 
} = require('../middleware/validation');

// ALL application routes require authentication
router.use(auth);

router.get('/', getApplications);
router.get('/:id', validateId, getApplication);
router.post('/', validateApplication, createApplication);
router.put('/:id', validateId, validateApplicationUpdate, updateApplication);
router.delete('/:id', validateId, deleteApplication);

module.exports = router;