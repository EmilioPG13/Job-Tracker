const { describe, test, expect } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { auth } = require('../../middleware/auth');
const { createTestUser } = require('../helpers/testHelpers');

describe('Auth Middleware', () => {
    test('should authenticate valid token', async () => {
        const { user, token } = await createTestUser();

        const req = {
            header: jest.fn().mockReturnValue(`Bearer ${token}`)
        };
        const res = {};
        const next = jest.fn();

        await auth(req, res, next);

        expect(req.user).toBeDefined();
        expect(req.user.userId).toBe(user.id);
        expect(next).toHaveBeenCalled();
    });

    test('should reject request without token', async () => {
        const req = {
            header: jest.fn().mockReturnValue(null)
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await auth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Access denied. No token provided.',
            code: 'NO_TOKEN'
        });
        expect(next).not.toHaveBeenCalled();
    });

    test('should reject invalid token format', async () => {
        const req = {
            header: jest.fn().mockReturnValue('InvalidFormat token123')
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await auth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Access denied. Invalid token format.',
            code: 'INVALID_FORMAT'
        });
    });

    test('should reject expired token', async () => {
        const { user } = await createTestUser();
        const expiredToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '-1h' });

        const req = {
            header: jest.fn().mockReturnValue(`Bearer ${expiredToken}`)
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await auth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Access denied. Token expired.',
            code: 'TOKEN_EXPIRED'
        });
    });
});