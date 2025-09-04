import React, { useState } from 'react';
import editIcon from '../../assets/icons/edit.svg';
import trashIcon from '../../assets/icons/trash.svg';
import stickyNoteIcon from '../../assets/icons/sticky-note.svg';

const JobApplicationCardGrid = ({ application, onDelete, onEdit }) => {
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

    return (
        <>
            <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-64 flex flex-col">
                {/* Header with Job Info */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-text-dark mb-1">
                        {application.position}
                    </h3>
                    <p className="text-text-medium font-medium mb-4">
                        {application.company}
                    </p>
                    
                    {/* Application Date */}
                    <p className="text-sm text-text-medium">
                        Applied: {application.appliedDate}
                    </p>
                </div>

                {/* Footer with Actions and Status */}
                <div className="flex items-center justify-between mt-4">
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        {/* Sticky Note Icon (if notes exist) */}
                        {application.notes && (
                            <button
                                onClick={() => setIsNoteExpanded(true)}
                                className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-200"
                            >
                                <img src={stickyNoteIcon} alt="Notes" className="w-4 h-4" />
                            </button>
                        )}
                        
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

                    {/* Status Badge */}
                    <span className={`inline-block px-4 py-1 rounded-lg text-white font-medium text-xs text-center ${getStatusColor(application.status)}`}>
                        {getStatusText(application.status)}
                    </span>
                </div>
            </div>

            {/* Expanded Note Modal - Post-it Style (Same as ApplicationCard) */}
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

export default JobApplicationCardGrid;