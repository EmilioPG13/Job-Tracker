import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../layout/Header';
import stock from '../../assets/img/stock-photo.jpg';

// A simple SVG for the logo. You can replace this with your own SVG or image component.
const Logo = () => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block mr-2"
    >
        <path
            d="M10 17a7 7 0 100-14 7 7 0 000 14zm6.32-1.68l4.39 4.39-1.42 1.42-4.39-4.39 1.42-1.42z"
            fill="#4A90E2" // Using your primary color
        />
        <path
            d="M8.5 11.5l2 2 4-4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />

            {/* Main Content */}
            <main className="container mx-auto flex-grow px-8 md:px-16 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text Content */}
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-dark leading-tight">
                            Welcome to the <br />
                            <span className="text-primary">Job Track!</span>
                        </h2>
                        <p className="mt-4 text-lg text-text-medium">
                            Follow all your job applications easily!
                        </p>
                        <Link 
                            to="/login"
                            className="mt-8 inline-block bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:brightness-95 transition-all duration-300 transform hover:scale-105"
                        >
                            Log In / Sign In
                        </Link>
                    </div>

                    {/* Right Column: Image */}
                    <div>
                        <img
                            src={stock}
                            alt="Person writing on documents at a desk"
                            className="rounded-xl shadow-2xl w-full h-auto"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;