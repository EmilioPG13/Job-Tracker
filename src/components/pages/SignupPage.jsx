import React from 'react';
import Header from '../layout/Header';
import SignupForm from '../auth/SignupForm';
import stock from '../../assets/img/stock-photo.jpg'; // Same image as LoginPage

const SignupPage = () => {
    return (
        <div className="relative min-h-screen font-sans">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${stock})` }}
            >
                {/* Overlay for blur effect */}
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Header />
                <div className="flex items-center justify-center pt-20 px-4">
                    <SignupForm />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;