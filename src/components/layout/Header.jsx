import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Imported icon
import logo from '../../assets/icons/Job-tracker-logo.svg';

const Header = ({ onAddApplication }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    // Check if user is on dashboard (logged in)
    const isLoggedIn = location.pathname === '/dashboard';

    // Mock user data 
    const currentUser = {
        email: 'info@example.com',
        name: 'John Doe'
    };

    const handleLogout = () => {
        // Mock logout - redirect to landing page
        navigate('/');
        setShowUserDropdown(false);
    };

    const handleAddApplication = () => {
        if (onAddApplication) {
            onAddApplication();
        }
    };

    return (
        <header className="bg-header">
            <div className="container mx-auto px-8 md:px-16">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <span className="text-3xl font-bold text-text-dark">Job Track</span>
                        <img src={logo} alt="Job Track Logo" className="h-20 w-20" />
                    </Link>

                    {/* Right side - conditional rendering based on login status */}
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            // Logged in view - Show Add Application button and user dropdown
                            <>
                                {/* Add Application Button */}
                                <button
                                    onClick={handleAddApplication}
                                    className="bg-primary text-gray-100 rounded-full font-normal px-3 py-1.5 text-sm shadow-lg hover:brightness-95 transition-all flex items-center gap-2"
                                >
                                    <span className="">+</span>
                                    Add Application
                                </button>

                                {/* User Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                        className="flex items-center space-x-2 text-text-dark hover:text-primary transition-colors"
                                    >
                                        <span className="text-sm font-medium">{currentUser.email}</span>
                                        <svg
                                            className={`w-4 h-4 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showUserDropdown && (
                                        <div className="absolute right-0 mt-3 w-43 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <p className="text-sm font-medium text-text-dark">{currentUser.name}</p>
                                                <p className="text-xs text-text-medium">{currentUser.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm  text-text-dark hover:bg-gray-50 transition-colors"
                                                onClick={() => setShowUserDropdown(false)}
                                            >
                                                Profile Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;