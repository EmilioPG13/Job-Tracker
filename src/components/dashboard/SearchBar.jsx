import React from 'react';
import searchIcon from '../../assets/icons/search-interface-symbol.svg';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg pl-12 pr-4 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary w-64 shadow-sm"
            />
            {/* Search icon with white background */}
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 bg-white rounded">
                <img 
                    src={searchIcon} 
                    alt="Search" 
                    className="w-4 h-4 text-text-medium"
                />
            </div>
        </div>
    );
};

export default SearchBar;