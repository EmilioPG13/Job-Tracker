const { Pool } = require('pg');
require('dotenv').config();

const testConnection = async () => {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });

    try {
        console.log('Testing database connection...');
        console.log('Host:', process.env.DB_HOST);
        console.log('Port:', process.env.DB_PORT);
        console.log('Database:', process.env.DB_NAME);
        console.log('User:', process.env.DB_USER);
        
        const client = await pool.connect();
        const result = await client.query('SELECT NOW()');
        console.log('✅ Database connected successfully!');
        console.log('Current time:', result.rows[0].now);
        client.release();
        await pool.end();
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error('Error:', error.message);
        console.error('Code:', error.code);
    }
};

testConnection();