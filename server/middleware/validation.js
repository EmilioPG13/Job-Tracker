const { body, param, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array().map(error => ({
                field: error.path,
                message: error.msg,
                value: error.value
            }))
        });
    }
    next();
};

// User registration validation
const validateRegistration = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email')
        .isLength({ max: 255 })
        .withMessage('Email must be less than 255 characters'),
    
    body('password')
        .isLength({ min: 8, max: 128 })
        .withMessage('Password must be between 8 and 128 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    
    handleValidationErrors
];

// User login validation
const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    
    handleValidationErrors
];

// Application creation validation
const validateApplication = [
    body('company_name')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('Company name is required and must be less than 255 characters')
        .escape(), // Prevent HTML injection
    
    body('job_title')
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('Job title is required and must be less than 255 characters')
        .escape(),
    
    body('status')
        .optional()
        .isIn(['applied', 'interviewing', 'offer', 'rejected'])
        .withMessage('Status must be one of: applied, interviewing, offer, rejected'),
    
    body('date_applied')
        .optional()
        .isISO8601()
        .withMessage('Date must be in valid ISO format (YYYY-MM-DD)')
        .toDate(),
    
    body('notes')
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Notes must be less than 2000 characters')
        .trim(),
    
    handleValidationErrors
];

// Application update validation (all fields optional)
const validateApplicationUpdate = [
    body('company_name')
        .optional()
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('Company name must be less than 255 characters')
        .escape(),
    
    body('job_title')
        .optional()
        .trim()
        .isLength({ min: 1, max: 255 })
        .withMessage('Job title must be less than 255 characters')
        .escape(),
    
    body('status')
        .optional()
        .isIn(['applied', 'interviewing', 'offer', 'rejected'])
        .withMessage('Status must be one of: applied, interviewing, offer, rejected'),
    
    body('date_applied')
        .optional()
        .isISO8601()
        .withMessage('Date must be in valid ISO format')
        .toDate(),
    
    body('notes')
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Notes must be less than 2000 characters')
        .trim(),
    
    handleValidationErrors
];

// ID parameter validation
const validateId = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID must be a positive integer'),
    
    handleValidationErrors
];

module.exports = {
    validateRegistration,
    validateLogin,
    validateApplication,
    validateApplicationUpdate,
    validateId,
    handleValidationErrors
};