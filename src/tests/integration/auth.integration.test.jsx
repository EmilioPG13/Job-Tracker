import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithProviders } from '../setup/testUtils';
import { setupMockApi, resetMockApi } from '../setup/mockApi';

describe('Auth Integration Tests', () => {
    beforeEach(() => {
        setupMockApi();
    });

    afterEach(() => {
        resetMockApi();
    });

    it('complete login flow works correctly', async () => {
        const user = userEvent.setup();

        renderWithProviders(<App />, { route: '/login' });

        // Should be on login page
        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

        // Fill in login form
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole('button', { name: /login/i });

        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');
        await user.click(loginButton);

        // Should redirect to dashboard after successful login
        await waitFor(() => {
            expect(screen.getByText(/welcome/i)).toBeInTheDocument();
        });

        // Should show user info in header
        expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    });

    it('logout flow works correctly', async () => {
        const user = userEvent.setup();

        // Start with authenticated user
        renderWithProviders(<App />, {
            route: '/dashboard',
            initialAuthState: {
                user: { email: 'test@example.com' },
                token: 'mock-token',
                loading: false,
            },
        });

        // Should be on dashboard
        expect(screen.getByText(/welcome/i)).toBeInTheDocument();

        // Click logout
        const logoutButton = screen.getByRole('button', { name: /logout/i });
        await user.click(logoutButton);

        // Should redirect to login page
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
        });
    });

    it('protected routes redirect to login when not authenticated', () => {
        renderWithProviders(<App />, { route: '/dashboard' });

        // Should redirect to login
        expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    });
});