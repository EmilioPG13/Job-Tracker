module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/tests/setup/testDb.js'],
    testMatch: [
        '<rootDir>/tests/**/*.test.js'
    ],
    collectCoverageFrom: [
        'controllers/**/*.js',
        'middleware/**/*.js',
        'routes/**/*.js',
        '!**/node_modules/**',
        '!**/tests/**'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    runInBand: true,  // Run tests sequentially (important for DB tests)
    detectOpenHandles: true  // Detect memory leaks
};