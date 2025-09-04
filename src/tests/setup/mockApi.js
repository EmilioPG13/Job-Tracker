import { vi } from 'vitest';
import { mockUser, mockApplications } from './testUtils';

// Mock successful API responses
export const mockApiResponses = {
    auth: {
        login: {
            message: 'Login successful',
            user: mockUser,
            token: mockUser.token,
        },
        register: {
            message: 'User registered successfully',
            user: mockUser,
            token: mockUser.token,
        },
        profile: {
            user: mockUser,
        },
    },
    applications: {
        getAll: mockApplications,
        getOne: mockApplications[0],
        create: {
            message: 'Application created successfully',
            application: mockApplications[0],
        },
        update: {
            message: 'Application updated successfully',
            application: { ...mockApplications[0], status: 'updated' },
        },
        delete: {
            message: 'Application deleted successfully',
        },
    },
};

// Mock API error responses
export const mockApiErrors = {
    auth: {
        loginInvalidCredentials: {
            message: 'Invalid credentials',
            code: 'INVALID_CREDENTIALS',
        },
        registerUserExists: {
            message: 'User already exists',
            code: 'USER_EXISTS',
        },
        unauthorized: {
            message: 'Access denied. No token provided.',
            code: 'NO_TOKEN',
        },
    },
    applications: {
        notFound: {
            message: 'Application not found',
            code: 'NOT_FOUND',
        },
        unauthorized: {
            message: 'Access denied. No token provided.',
            code: 'NO_TOKEN',
        },
    },
    validation: {
        message: 'Validation failed',
        errors: [
            { field: 'email', message: 'Please provide a valid email' },
            { field: 'password', message: 'Password must be at least 8 characters' },
        ],
    },
};

// Mock fetch globally
export const setupMockApi = () => {
    globalThis.fetch = vi.fn();

    // Setup default successful responses
    globalThis.fetch.mockImplementation((url, options) => {
        const method = options?.method || 'GET';
        const body = options?.body ? JSON.parse(options.body) : {};

        // Auth endpoints
        if (url.includes('/api/auth/login')) {
            if (body.email === 'test@example.com' && body.password === 'password123') {
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve(mockApiResponses.auth.login),
                });
            } else {
                return Promise.resolve({
                    ok: false,
                    status: 401,
                    json: () => Promise.resolve(mockApiErrors.auth.loginInvalidCredentials),
                });
            }
        }

        if (url.includes('/api/auth/register')) {
            return Promise.resolve({
                ok: true,
                status: 201,
                json: () => Promise.resolve(mockApiResponses.auth.register),
            });
        }

        if (url.includes('/api/auth/profile')) {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockApiResponses.auth.profile),
            });
        }

        // Application endpoints
        if (url.includes('/api/applications') && method === 'GET') {
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(mockApiResponses.applications.getAll),
            });
        }

        if (url.includes('/api/applications') && method === 'POST') {
            return Promise.resolve({
                ok: true,
                status: 201,
                json: () => Promise.resolve(mockApiResponses.applications.create),
            });
        }

        // Default fallback
        return Promise.resolve({
            ok: false,
            status: 404,
            json: () => Promise.resolve({ message: 'Not found' }),
        });
    });
};

// Reset mocks
export const resetMockApi = () => {
    if (globalThis.fetch && globalThis.fetch.mockClear) {
        globalThis.fetch.mockClear();
    }
};

// Helper to mock specific API responses
export const mockApiCall = (endpoint, method = 'GET', response, status = 200) => {
    globalThis.fetch.mockImplementationOnce((url, options) => { 
        if (url.includes(endpoint) && (options?.method || 'GET') === method) {
            return Promise.resolve({
                ok: status >= 200 && status < 300,
                status,
                json: () => Promise.resolve(response),
            });
        }
        return globalThis.fetch(url, options); 
    });
};