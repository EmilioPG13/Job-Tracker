const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Import pool from the correct location
let pool;
try {
    // Try to get pool from setup if it exists
    const setupDb = require('../setup/testDb');
    pool = setupDb.pool;
} catch (error) {
    // Fallback: create pool directly
    const { Pool } = require('pg');
    require('dotenv').config({ path: '.env.test' });

    pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
}

// Create a test user and return user data + token
const createTestUser = async (userData = {}) => {
    const defaultUser = {
        email: 'test@example.com',
        password: 'TestPassword123!'
    };

    const user = { ...defaultUser, ...userData };
    const hashedPassword = await bcrypt.hash(user.password, 12);

    const result = await pool.query(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
        [user.email, hashedPassword]
    );

    const createdUser = result.rows[0];
    const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
        user: createdUser,
        token,
        password: user.password // Return original password for testing
    };
};

// Create a test application
const createTestApplication = async (userId, applicationData = {}) => {
    const defaultApplication = {
        company_name: 'Test Company',
        job_title: 'Software Developer',
        status: 'applied',
        notes: 'Test application notes'
    };

    const application = { ...defaultApplication, ...applicationData };

    const result = await pool.query(
        'INSERT INTO applications (user_id, company_name, job_title, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, application.company_name, application.job_title, application.status, application.notes]
    );

    return result.rows[0];
};

// Generate auth header for requests
const getAuthHeader = (token) => {
    return { Authorization: `Bearer ${token}` };
};

module.exports = {
    createTestUser,
    createTestApplication,
    getAuthHeader,
    pool
};