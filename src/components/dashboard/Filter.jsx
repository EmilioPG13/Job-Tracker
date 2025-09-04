import React, { useState } from 'react';
import rowIcon from '../../assets/icons/row.svg';
import gridIcon from '../../assets/icons/grid_menu.svg';

const FilterDropdown = ({ selectedStatus, onStatusChange, viewMode, onViewToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const statusOptions = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected'];

    const handleStatusChange = (status) => {
        onStatusChange(status);
        setIsOpen(false);
    };

    return (
        <div className="flex items-center gap-3">
            {/* View Toggle Button */}
            <button 
                onClick={onViewToggle}
                className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all"
            >
                <img 
                    src={viewMode === 'column' ? rowIcon : gridIcon} 
                    alt={viewMode === 'column' ? 'Switch to Grid' : 'Switch to Columns'} 
                    className="w-4 h-4" 
                />
            </button>
            
            {/* Custom Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary shadow-sm min-w-48 hover:shadow-md transition-all"
                >
                    <span>Filter by Status: {selectedStatus}</span>
                    <svg 
                        className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        {statusOptions.map((option, index) => (
                            <button
                                key={option}
                                onClick={() => handleStatusChange(option)}
                                className={`block w-full text-left px-4 py-2 text-sm text-text-dark hover:bg-gray-50 transition-colors ${
                                    index === 0 ? 'rounded-t-lg' : ''
                                } ${
                                    index === statusOptions.length - 1 ? 'rounded-b-lg' : ''
                                } ${
                                    selectedStatus === option ? 'bg-gray-100 font-medium' : ''
                                }`}
                            >
                                Filter by Status: {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterDropdown;