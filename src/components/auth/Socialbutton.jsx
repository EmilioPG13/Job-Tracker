import React from 'react';

const SocialButton = ({ iconSrc, provider }) => (
    <button
        aria-label={`Continue with ${provider}`}
        className="w-16 h-12 bg-white rounded-lg flex items-center justify-center p-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
    >
        <img src={iconSrc} alt={`${provider} logo`} className="h-full w-full object-contain" />
    </button>
);

export default SocialButton;