import React from 'react';
import Header from '../layout/Header';
import LoginForm from '../auth/LoginForm';
import stock from '../../assets/img/stock-photo.jpg'; // Re-using the image from the landing page

const LoginPage = () => {
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
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;