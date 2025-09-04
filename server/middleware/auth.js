const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.header('Authorization');
        
        if (!authHeader) {
            return res.status(401).json({ 
                message: 'Access denied. No token provided.',
                code: 'NO_TOKEN'
            });
        }

        // Check if token starts with 'Bearer '
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                message: 'Access denied. Invalid token format.',
                code: 'INVALID_FORMAT'
            });
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.substring(7);

        if (!token) {
            return res.status(401).json({ 
                message: 'Access denied. No token provided.',
                code: 'NO_TOKEN'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Optional: Check if user still exists in database
        const user = await pool.query(
            'SELECT id, email FROM users WHERE id = $1',
            [decoded.userId]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ 
                message: 'Access denied. User no longer exists.',
                code: 'USER_NOT_FOUND'
            });
        }

        // Add user info to request object
        req.user = {
            userId: decoded.userId,
            email: user.rows[0].email
        };
        
        next(); // Continue to the next middleware/route handler

    } catch (error) {
        console.error('Auth middleware error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                message: 'Access denied. Invalid token.',
                code: 'INVALID_TOKEN'
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Access denied. Token expired.',
                code: 'TOKEN_EXPIRED'
            });
        }
        
        res.status(500).json({ 
            message: 'Server error during authentication.',
            code: 'SERVER_ERROR'
        });
    }
};

module.exports = { auth };