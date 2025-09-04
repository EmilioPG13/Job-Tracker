import React, { useState, useEffect } from 'react';

const AddApplicationForm = ({ isOpen, onClose, onSave, editData }) => {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        appliedDate: '',
        status: 'applied',
        notes: ''
    });
    
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const statusOptions = ['applied', 'interviewing', 'offer', 'rejected'];

    // Populate form when editing
    useEffect(() => {
        if (editData) {
            // Convert date format from "Aug 10, 2025" to "2025-08-10" for input
            const convertToInputDate = (dateString) => {
                try {
                    const date = new Date(dateString);
                    return date.toISOString().split('T')[0];
                } catch {
                    return 'error';
                }
            };

            setFormData({
                company: editData.company || '',
                position: editData.position || '',
                appliedDate: convertToInputDate(editData.appliedDate) || '',
                status: editData.status || 'applied',
                notes: editData.notes || ''
            });
        } else {
            // Reset form for new application
            setFormData({
                company: '',
                position: '',
                appliedDate: '',
                status: 'applied',
                notes: ''
            });
        }
    }, [editData, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusChange = (status) => {
        setFormData(prev => ({
            ...prev,
            status: status
        }));
        setIsStatusDropdownOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({
            company: '',
            position: '',
            appliedDate: '',
            status: 'applied',
            notes: ''
        });
        onClose();
    };

    const handleCancel = () => {
        setFormData({
            company: '',
            position: '',
            appliedDate: '',
            status: 'applied',
            notes: ''
        });
        onClose();
    };

    const getStatusDisplayText = (status) => {
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-card rounded-xl shadow-2xl p-8 max-w-lg w-full mx-4">
                {/* Header */}
                <div className="bg-primary text-black shadow-md p-4 rounded-t-lg -mt-8 -mx-8 mb-6">
                    <h2 className="text-2xl font-extrabold">
                        {editData ? 'Edit Application' : 'Add New Application'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Company Name */}
                    <div className="mb-4">
                        <label className="block text-text-dark text-sm font-medium mb-2">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="bg-white border border-gray-200 rounded-lg w-full px-4 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:shadow-md transition-all"
                            required
                        />
                    </div>

                    {/* Job Title */}
                    <div className="mb-5">
                        <label className="block text-text-dark text-sm font-medium mb-2">
                            Job Title
                        </label>
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="bg-white border border-gray-200 rounded-lg w-full px-4 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:shadow-md transition-all"
                            required
                        />
                    </div>

                    {/* Date Applied and Status Row */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Date Applied */}
                        <div>
                            <label className="block text-text-dark text-sm font-medium mb-2">
                                Date applied
                            </label>
                            <input
                                type="date"
                                name="appliedDate"
                                value={formData.appliedDate}
                                onChange={handleInputChange}
                                className="bg-white border border-gray-200 rounded-lg w-full px-4 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:shadow-md transition-all"
                                required
                            />
                        </div>

                        {/* Status - Custom Dropdown */}
                        <div>
                            <label className="block text-text-dark text-sm font-medium mb-2">
                                Status
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary shadow-sm w-full hover:shadow-md transition-all"
                                >
                                    <span>{getStatusDisplayText(formData.status)}</span>
                                    <svg
                                        className={`w-4 h-4 ml-2 transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Status Dropdown Menu */}
                                {isStatusDropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                        {statusOptions.map((option, index) => (
                                            <button
                                                key={option}
                                                type="button"
                                                onClick={() => handleStatusChange(option)}
                                                className={`block w-full text-left px-4 py-2 text-sm text-text-dark hover:bg-gray-50 transition-colors ${
                                                    index === 0 ? 'rounded-t-lg' : ''
                                                } ${
                                                    index === statusOptions.length - 1 ? 'rounded-b-lg' : ''
                                                } ${
                                                    formData.status === option ? 'bg-gray-100 font-medium' : ''
                                                }`}
                                            >
                                                {getStatusDisplayText(option)}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-6">
                        <label className="block text-text-dark text-sm font-medium mb-2">
                            Notes
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={4}
                            className="bg-white border border-gray-200 rounded-lg w-full px-4 py-2 text-text-dark focus:outline-none focus:ring-2 focus:ring-primary shadow-sm hover:shadow-md transition-all resize-none"
                            placeholder="Add any notes about this application..."
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 shadow-lg bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 shadow-lg bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                        >
                            {editData ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddApplicationForm;