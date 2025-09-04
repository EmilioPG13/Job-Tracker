import React, { useState } from 'react';
import editIcon from '../../assets/icons/edit.svg';
import trashIcon from '../../assets/icons/trash.svg';

const JobApplicationCard = ({ application, onDelete, onEdit }) => {
    const [isNoteExpanded, setIsNoteExpanded] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case 'applied':
                return 'bg-status-applied';
            case 'interviewing':
                return 'bg-status-interviewing';
            case 'offer':
                return 'bg-status-offer';
            case 'rejected':
                return 'bg-status-rejected';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusText = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    const truncateText = (text, maxLength = 120) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <>
            <div className="bg-card p-10 px-20 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                {/* 3-Column Grid Layout */}
                <div className="grid grid-cols-3 gap-6 items-start">

                    {/* LEFT SECTION: Job Info */}
                    <div className="flex flex-col justify-between h-full">
                        {/* Top: Job title and company */}
                        <div>
                            <h3 className="text-xl font-bold text-text-dark mb-1">
                                {application.position}
                            </h3>
                            <p className="text-text-medium font-medium">
                                {application.company}
                            </p>
                        </div>

                        {/* Bottom: Application date (aligned with status badge) */}
                        <div className="mt-4">
                            <p className="text-sm text-text-medium">
                                Applied: {application.appliedDate}
                            </p>
                        </div>
                    </div>

                    {/* MIDDLE SECTION: Notes */}
                    <div className="flex items-center">
                        {application.notes ? (
                            <div
                                className="bg-yellow-200 p-4 rounded-lg h-min w-2/3 ml-20 overflow-hidden cursor-pointer hover:shadow-sm transition-all"
                                onClick={() => setIsNoteExpanded(true)}
                            >
                                <h4 className="font-semibold text-text-dark text-sm mb-2">Notes:</h4>
                                <p className="text-sm text-text-dark leading-relaxed">
                                    {truncateText(application.notes)}
                                </p>
                            </div>
                        ) : (
                            <div className="h-20 w-full"></div> // Empty space to maintain layout
                        )}
                    </div>

                    {/* RIGHT SECTION: Action Buttons and Status */}
                    <div className="flex flex-col items-end justify-between h-full">
                        {/* Top: Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => onDelete(application.id)}
                                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
                            >
                                <img src={trashIcon} alt="Delete" className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onEdit(application)}
                                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
                            >
                                <img src={editIcon} alt="Edit" className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Bottom: Status Badge */}
                        <div className="mt-4">
                            <span className={`inline-block px-8 py-2 rounded-lg text-gray-800 font-medium text-sm min-w-32 text-center ${getStatusColor(application.status)}`}>
                                {getStatusText(application.status)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded Note Modal - Post-it Style */}
            {isNoteExpanded && (
                <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="relative">
                        {/* Post-it Note */}
                        <div className="bg-yellow-300 rounded-lg p-6 max-w-md w-80 shadow-2xl transform rotate-1 relative border-l-4 border-yellow-400">
                            {/* Post-it tape effect at top */}
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-yellow-400 rounded-sm opacity-80 shadow-sm"></div>

                            {/* Close button */}
                            <button
                                onClick={() => setIsNoteExpanded(false)}
                                className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center text-lg font-bold leading-relaxed"
                            >
                                ×
                            </button>

                            {/* Post-it content */}
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes:</h3>
                                <div className="max-h-64 overflow-y-auto">
                                    <p className="text-gray-800 leading-relaxed text-base whitespace-pre-wrap">
                                        {application.notes}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom shadow for depth */}
                            <div className="absolute inset-0 bg-yellow-400 rounded-lg -z-10 transform translate-x-1 translate-y-1 opacity-30"></div>

                            {/* Side shadow */}
                            <div className="absolute inset-0 bg-yellow-500 rounded-lg -z-20 transform translate-x-2 translate-y-2 opacity-20"></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default JobApplicationCard;