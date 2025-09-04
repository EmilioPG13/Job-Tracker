import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialButton from './SocialButton';
import hideIcon from '../../assets/icons/hide.svg';

// Social Icons
import facebookIcon from '../../assets/icons/SocialNetworks/facebook.svg';
import googleIcon from '../../assets/icons/SocialNetworks/google.svg';
import appleIcon from '../../assets/icons/SocialNetworks/apple-logo.svg';
import xIcon from '../../assets/icons/SocialNetworks/twitter.svg';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Mock login function
    const handleLogin = (e) => {
        e.preventDefault();
        
        // Simple validation (you can make this more sophisticated)
        if (email && password) {
            // Simulate successful login and redirect to dashboard
            console.log('Mock login successful for:', email);
            navigate('/dashboard');
        } else {
            // Show error message (you can implement proper error handling later)
            alert('Please enter both email and password');
        }
    };

    return (
        <div className="bg-card p-14 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-4xl font-bold text-text-dark">Login</h2>
            <p className="text-text-medium mt-3 mb-6">
                Please enter your login details to sign in
            </p>

            <form onSubmit={handleLogin}>
                {/* Email field with floating label */}
                <div className="mb-4 relative">
                    <input
                        className="shadow-md appearance-none bg-white rounded-lg w-full py-4 px-4 pt-6 text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary peer"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" "
                    />
                    <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${email ? 'top-2 text-xs text-text-medium' : 'top-4 text-base text-text-medium peer-focus:top-2 peer-focus:text-xs'
                            }`}
                        htmlFor="email"
                    >
                        Email Address
                    </label>
                </div>

                {/* Password field with floating label */}
                <div className="mb-4 relative">
                    <input
                        className="shadow-md appearance-none bg-white rounded-lg w-full py-4 px-4 pt-6 pr-12 text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary peer"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=" "
                    />
                    <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${password ? 'top-2 text-xs text-text-medium' : 'top-4 text-base text-text-medium peer-focus:top-2 peer-focus:text-xs'
                            }`}
                        htmlFor="password"
                    >
                        Password
                    </label>
                    {/* Eye/Hide icon button */}
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-medium hover:text-text-dark transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <img
                            src={hideIcon}
                            alt={showPassword ? "Hide password" : "Show password"}
                            className="w-5 h-5 mr-2"
                        />
                    </button>
                </div>

                                <div className="flex items-center justify-between mb-6 mt-10">
                    <label className="flex items-center text-text-medium">
                        <input 
                            type="checkbox" 
                            className="h-4 w-4 appearance-none bg-white rounded border-0 shadow-inner focus:ring-2 focus:ring-primary checked:bg-primary checked:shadow-inner relative" 
                        />
                        <span className="ml-2 text-sm">Keep me logged in</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:brightness-90">
                        Forgot password?
                    </Link>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold shadow-md py-3 px-4 rounded-lg hover:brightness-95 focus:outline-none focus:shadow-outline transition-all"
                >
                    Log in
                </button>

                <div className="my-4">
                    <p className="text-sm text-text-medium">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-bold text-primary hover:brightness-90">
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className="flex items-center my-6 mt-12">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-text-medium text-sm">or continue with</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>

                <div className="flex justify-center space-x-4">
                    <SocialButton provider="Facebook" iconSrc={facebookIcon} />
                    <SocialButton provider="Google" iconSrc={googleIcon} />
                    <SocialButton provider="Apple" iconSrc={appleIcon} />
                    <SocialButton provider="X" iconSrc={xIcon} />
                </div>
            </form>
        </div>
    );
};

export default LoginForm;