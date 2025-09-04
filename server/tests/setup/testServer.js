const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: '.env.test' });

const authRoutes = require('../../routes/auth');
const applicationRoutes = require('../../routes/applications');

const createTestApp = () => {
    const app = express();

    // Basic middleware for testing
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/applications', applicationRoutes);

    // Health check
    app.get('/api/health', (req, res) => {
        res.json({ message: 'Test server running' });
    });

    // Error handling
    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            message: err.message || 'Internal server error'
        });
    });

    return app;
};

module.exports = { createTestApp };