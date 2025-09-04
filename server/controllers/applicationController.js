const pool = require('../config/database');

const getApplications = async (req, res) => {
    res.json({ message: 'Get applications working' });
};

const getApplication = async (req, res) => {
    res.json({ message: `Get application ${req.params.id} working` });
};

const createApplication = async (req, res) => {
    res.json({ message: 'Create application working' });
};

const updateApplication = async (req, res) => {
    res.json({ message: `Update application ${req.params.id} working` });
};

const deleteApplication = async (req, res) => {
    res.json({ message: `Delete application ${req.params.id} working` });
};

module.exports = {
    getApplications,
    getApplication,
    createApplication,
    updateApplication,
    deleteApplication
};