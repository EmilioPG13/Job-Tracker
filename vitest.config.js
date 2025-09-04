import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/tests/setup/setupTests.js'],
        css: true,
        globals: true,
        include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
        exclude: [
            'node_modules/**',
            'server/**',
            'dist/**',
        ],
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/tests/', 
                'src/main.jsx',
                '**/*.d.ts',
                'server/**', 
            ],
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});