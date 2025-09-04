import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { beforeEach, afterEach, vi } from 'vitest';

// Mock environment variables
vi.mock('../../config/api', () => ({
    API_BASE_URL: 'http://localhost:5000/api',
}));

// Mock localStorage
const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
globalThis.localStorage = localStorageMock; 

// Mock sessionStorage
const sessionStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};
globalThis.sessionStorage = sessionStorageMock;
// Mock window.location
delete window.location;
window.location = {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
    replace: vi.fn(),
    assign: vi.fn(),
    reload: vi.fn(),
};

// Mock console methods to reduce noise in tests
globalThis.console = {
    ...console,
    log: vi.fn(),
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
};

// Cleanup after each test
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
    localStorageMock.clear();
    sessionStorageMock.clear();
});

// Setup before each test
beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
});