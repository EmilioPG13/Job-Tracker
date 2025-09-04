/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            // Include default colors
            transparent: 'transparent',
            current: 'currentColor',
            white: '#ffffff',
            black: '#000000',
            // Add your custom colors
            primary: '#4A90E2',
            background: '#F4F7FA',
            card: '#C1DFF0',
            header: '#B3D7EA',
            'text-dark': '#333333',
            'text-medium': '#555555',
            // Status colors
            'status-applied': '#4A90E2',
            'status-interviewing': '#50E3C2',
            'status-offer': '#F5A623',
            'status-rejected': '#CC3E3E',
            // Include some default colors you might need
            gray: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
            },
            blue: {
                500: '#3b82f6',
                600: '#2563eb',
            },
            slate: {
                50: '#f8fafc',
                600: '#475569',
                800: '#1e293b',
            }
        },
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
        },
        borderRadius: {
            'card': '8px',
            'lg': '0.5rem',
            'xl': '0.75rem',
            'full': '9999px',
        }
    },
    plugins: [],
}