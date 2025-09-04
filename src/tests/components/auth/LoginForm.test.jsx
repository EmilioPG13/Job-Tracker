import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../../components/auth/LoginForm.jsx';
import { renderWithProviders } from '../../setup/testUtils.jsx';
import { setupMockApi, resetMockApi } from '../../setup/mockApi.js';

describe('LoginForm Component', () => {
    beforeEach(() => {
        setupMockApi();
    });

    afterEach(() => {
        resetMockApi();
    });

    it('renders login form with all fields', () => {
        renderWithProviders(<LoginForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        const user = userEvent.setup();
        renderWithProviders(<LoginForm />);

        const submitButton = screen.getByRole('button', { name: /login/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
    });

    it('shows error for invalid email format', async () => {
        const user = userEvent.setup();
        renderWithProviders(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const submitButton = screen.getByRole('button', { name: /login/i });

        await user.type(emailInput, 'invalid-email');
        await user.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
        });
    });
});