const { describe, test, expect } = require('@jest/globals');
const request = require('supertest');
const { createTestApp } = require('../setup/testServer');
const { validUserData, invalidUserData } = require('../helpers/fixtures');
const { createTestUser, getAuthHeader } = require('../helpers/testHelpers');

const app = createTestApp();

describe('Auth Integration Tests', () => {
    describe('POST /api/auth/register', () => {
        test('should register new user with valid data', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(validUserData)
                .expect(201);

            expect(response.body.message).toBe('User registered successfully');
            expect(response.body.user).toBeDefined();
            expect(response.body.user.email).toBe(validUserData.email);
            expect(response.body.token).toBeDefined();
            expect(response.body.user.password_hash).toBeUndefined(); // Should not return password
        });

        test('should reject duplicate email', async () => {
            // Create user first
            await createTestUser(validUserData);

            // Try to register same email again
            const response = await request(app)
                .post('/api/auth/register')
                .send(validUserData)
                .expect(400);

            expect(response.body.message).toBe('User already exists');
        });

        invalidUserData.forEach(({ name, data, expectedError }) => {
            test(`should reject ${name}`, async () => {
                const response = await request(app)
                    .post('/api/auth/register')
                    .send(data)
                    .expect(400);

                expect(response.body.message).toContain('Validation failed');
            });
        });
    });

    describe('POST /api/auth/login', () => {
        test('should login with valid credentials', async () => {
            const { password } = await createTestUser(validUserData);

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: validUserData.email,
                    password: password
                })
                .expect(200);

            expect(response.body.message).toBe('Login successful');
            expect(response.body.user).toBeDefined();
            expect(response.body.token).toBeDefined();
        });

        test('should reject invalid email', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'password123'
                })
                .expect(401);

            expect(response.body.message).toBe('Invalid credentials');
        });

        test('should reject invalid password', async () => {
            await createTestUser(validUserData);

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: validUserData.email,
                    password: 'wrongpassword'
                })
                .expect(401);

            expect(response.body.message).toBe('Invalid credentials');
        });
    });

    describe('GET /api/auth/profile', () => {
        test('should get profile with valid token', async () => {
            const { user, token } = await createTestUser();

            const response = await request(app)
                .get('/api/auth/profile')
                .set(getAuthHeader(token))
                .expect(200);

            expect(response.body.message).toBeDefined();
        });

        test('should reject request without token', async () => {
            const response = await request(app)
                .get('/api/auth/profile')
                .expect(401);

            expect(response.body.message).toBe('Access denied. No token provided.');
        });
    });
});