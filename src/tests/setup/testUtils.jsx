import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, expect } from 'vitest'; // ADD expect HERE
// import { AuthProvider } from '../../contexts/AuthContext';
// import { ApplicationProvider } from '../../contexts/ApplicationContext';

// Mock user data
export const mockUser = {
    id: 1,
    email: 'test@example.com',
    token: 'mock-jwt-token',
};

// Mock application data
export const mockApplications = [
    {
        id: 1,
        company_name: 'Tech Corp',
        job_title: 'Frontend Developer',
        status: 'applied',
        date_applied: '2024-01-15',
        notes: 'Great company culture',
        created_at: '2024-01-15T10:00:00Z',
    },
    {
        id: 2,
        company_name: 'StartupXYZ',
        job_title: 'Full Stack Developer',
        status: 'interviewing',
        date_applied: '2024-01-10',
        notes: 'Technical interview scheduled',
        created_at: '2024-01-10T10:00:00Z',
    },
];

// Simple mock providers (since you don't have the actual context files yet)
const MockAuthProvider = ({ children, value }) => {
    return <div data-testid="auth-provider">{children}</div>;
};

const MockApplicationProvider = ({ children, value }) => {
    return <div data-testid="app-provider">{children}</div>;
};

// Custom render function with providers
export const renderWithProviders = (
    component,
    {
        initialAuthState = { user: null, token: null, loading: false },
        initialAppState = { applications: [], loading: false },
        route = '/',
    } = {}
) => {
    // Mock auth context value
    const mockAuthValue = {
        ...initialAuthState,
        login: vi.fn(),
        logout: vi.fn(),
        register: vi.fn(),
    };

    // Mock application context value
    const mockAppValue = {
        ...initialAppState,
        fetchApplications: vi.fn(),
        createApplication: vi.fn(),
        updateApplication: vi.fn(),
        deleteApplication: vi.fn(),
    };

    const AllTheProviders = ({ children }) => {
        return (
            <BrowserRouter>
                <MockAuthProvider value={mockAuthValue}>
                    <MockApplicationProvider value={mockAppValue}>
                        {children}
                    </MockApplicationProvider>
                </MockAuthProvider>
            </BrowserRouter>
        );
    };

    // Set initial route
    window.history.pushState({}, 'Test page', route);

    return {
        ...render(component, { wrapper: AllTheProviders }),
        mockAuthValue,
        mockAppValue,
    };
};

// Helper to render with authenticated user
export const renderWithAuth = (component, options = {}) => {
    return renderWithProviders(component, {
        initialAuthState: {
            user: mockUser,
            token: mockUser.token,
            loading: false,
        },
        ...options,
    });
};

// Custom matchers
export const expectElementToBeVisible = (element) => {
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
};

export const expectElementToHaveText = (element, text) => {
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(text);
};