const { Pool } = require('pg');
require('dotenv').config({ path: '.env.test' });

// Create pool instance
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const createTestTables = async () => {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

    const createApplicationsTable = `
    CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        company_name VARCHAR(255) NOT NULL,
        job_title VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'applied',
        date_applied DATE DEFAULT CURRENT_DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

    try {
        await pool.query(createUsersTable);
        await pool.query(createApplicationsTable);
        console.log('✅ Test tables created successfully');
    } catch (error) {
        console.error('❌ Error creating test tables:', error.message);
    }
};

const clearTestTables = async () => {
    try {
        await pool.query('TRUNCATE TABLE applications RESTART IDENTITY CASCADE');
        await pool.query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
    } catch (error) {
        console.error('Error clearing test tables:', error.message);
    }
};

// Jest setup hooks
beforeAll(async () => {
    console.log('🧪 Setting up test database...');
    await createTestTables();
});

beforeEach(async () => {
    await clearTestTables();
});

afterAll(async () => {
    console.log('🧪 Closing test database connection...');
    await pool.end();
});

// Export pool for use in tests
module.exports = { pool, clearTestTables };