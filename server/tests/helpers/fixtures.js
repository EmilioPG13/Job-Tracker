// Test data fixtures
const validUserData = {
    email: 'valid@example.com',
    password: 'ValidPassword123!'
};

const invalidUserData = [
    {
        name: 'missing email',
        data: { password: 'ValidPassword123!' },
        expectedError: 'Email and password are required'
    },
    {
        name: 'invalid email format',
        data: { email: 'invalid-email', password: 'ValidPassword123!' },
        expectedError: 'Please provide a valid email'
    },
    {
        name: 'weak password',
        data: { email: 'test@example.com', password: '123' },
        expectedError: 'Password must be between 8 and 128 characters'
    }
];

const validApplicationData = {
    company_name: 'Tech Corp',
    job_title: 'Full Stack Developer',
    status: 'applied',
    notes: 'Excited about this opportunity'
};

const invalidApplicationData = [
    {
        name: 'missing company name',
        data: { job_title: 'Developer' },
        expectedError: 'Company name is required'
    },
    {
        name: 'missing job title',
        data: { company_name: 'Tech Corp' },
        expectedError: 'Job title is required'
    },
    {
        name: 'invalid status',
        data: {
            company_name: 'Tech Corp',
            job_title: 'Developer',
            status: 'invalid_status'
        },
        expectedError: 'Status must be one of: applied, interviewing, offer, rejected'
    }
];

module.exports = {
    validUserData,
    invalidUserData,
    validApplicationData,
    invalidApplicationData
};