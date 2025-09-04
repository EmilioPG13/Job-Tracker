const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import security middleware
const { apiLimiter, securityHeaders } = require('./middleware/security');

// Import routes
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware (order matters!)
app.use(securityHeaders); // Security headers first
app.use(apiLimiter); // Rate limiting

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        message: 'Job Tracker API is running securely!', 
        timestamp: new Date().toISOString(),
        security: 'Enhanced'
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    res.status(err.status || 500).json({
        message: isDevelopment ? err.message : 'Internal server error',
        ...(isDevelopment && { stack: err.stack }),
        code: err.code || 'SERVER_ERROR'
    });
});

app.use('*', (req, res) => {
    res.status(404).json({ 
        message: 'Route not found',
        code: 'ROUTE_NOT_FOUND'
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running securely on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔒 Security features enabled`);
});