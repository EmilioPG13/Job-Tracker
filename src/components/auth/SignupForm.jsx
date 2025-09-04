import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialButton from './SocialButton';
import hideIcon from '../../assets/icons/hide.svg';
import { useNavigate } from 'react-router-dom';

// Social Icons
import facebookIcon from '../../assets/icons/SocialNetworks/facebook.svg';
import googleIcon from '../../assets/icons/SocialNetworks/google.svg';
import appleIcon from '../../assets/icons/SocialNetworks/apple-logo.svg';
import xIcon from '../../assets/icons/SocialNetworks/twitter.svg';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        
        if (email && password && repeatPassword && agreeToTerms) {
            if (password === repeatPassword) {
                console.log('Mock signup successful for:', email);
                navigate('/dashboard');
            } else {
                alert('Passwords do not match');
            }
        } else {
            alert('Please fill in all fields and agree to terms');
        }
    };

    return (
        <div className="bg-card p-14 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-4xl font-bold text-text-dark">Sign in</h2>
            <p className="text-text-medium mt-3 mb-6">
                Create your account in seconds
            </p>

            <form onSubmit={handleSignup}>
                {/* Email field with floating label */}
                <div className="mb-4 relative">
                    <input
                        className="shadow-md appearance-none bg-white rounded-lg w-full py-4 px-4 pt-6 text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary peer"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder=" "
                        required
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
                        required
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
                            className="w-5 h-5"
                        />
                    </button>
                </div>

                {/* Repeat Password field with floating label */}
                <div className="mb-4 relative">
                    <input
                        className="shadow-md appearance-none bg-white rounded-lg w-full py-4 px-4 pt-6 pr-12 text-text-dark leading-tight focus:outline-none focus:ring-2 focus:ring-primary peer"
                        id="repeatPassword"
                        type={showRepeatPassword ? "text" : "password"}
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        placeholder=" "
                        required
                    />
                    <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${repeatPassword ? 'top-2 text-xs text-text-medium' : 'top-4 text-base text-text-medium peer-focus:top-2 peer-focus:text-xs'
                            }`}
                        htmlFor="repeatPassword"
                    >
                        Repeat password
                    </label>
                    {/* Eye/Hide icon button */}
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-medium hover:text-text-dark transition-colors"
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                    >
                        <img
                            src={hideIcon}
                            alt={showRepeatPassword ? "Hide password" : "Show password"}
                            className="w-5 h-5"
                        />
                    </button>
                </div>

                {/* Terms and Privacy Policy checkbox */}
                <div className="flex items-start mb-6 mt-6">
                    <input 
                        type="checkbox" 
                        id="agreeToTerms"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="h-4 w-4 mt-1 appearance-none bg-white rounded border-0 shadow-inner focus:ring-2 focus:ring-primary checked:bg-primary checked:shadow-inner relative" 
                    />
                    <label htmlFor="agreeToTerms" className="ml-2 text-sm text-text-medium">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:brightness-90">
                            Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-primary hover:brightness-90">
                            Privacy Policy
                        </Link>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white font-bold shadow-md py-3 px-4 rounded-lg hover:brightness-95 focus:outline-none focus:shadow-outline transition-all"
                >
                    Create an account
                </button>

                <div className="my-4">
                    <p className="text-sm text-text-medium">
                        Already a member?{' '}
                        <Link to="/login" className="font-bold text-primary hover:brightness-90">
                            Log in
                        </Link>
                    </p>
                </div>

                <div className="flex items-center my-6 mt-8">
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

export default SignupForm;