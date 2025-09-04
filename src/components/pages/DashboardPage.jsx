import React, { useState } from 'react';
import Header from '../layout/Header';
import ApplicationList from '../dashboard/ApplicationList';
import FilterDropdown from '../dashboard/Filter';
import SearchBar from '../dashboard/SearchBar';
import AddApplicationForm from '../dashboard/AddApplicationForm';

// Mock data for applications
const mockApplications = [
    {
        id: 1,
        position: 'Senior Frontend Developer',
        company: 'Google',
        appliedDate: 'Aug 10, 2025',
        status: 'interviewing',
        notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
        id: 2,
        position: 'UX/UI Designer',
        company: 'Figma',
        appliedDate: 'Aug 18, 2025',
        status: 'rejected',
        notes: 'Great company culture, looking forward to the interview process.'
    },
    {
        id: 3,
        position: 'Game Developer',
        company: 'EA Games',
        appliedDate: 'Aug 10, 2025',
        status: 'applied',
        notes: ''
    },
    {
        id: 4,
        position: 'Software Developer',
        company: 'Apple',
        appliedDate: 'Aug 1, 2025',
        status: 'offer',
        notes: 'Exciting opportunity to work on innovative products.'
    }
];

const DashboardPage = () => {
    const [applications, setApplications] = useState(mockApplications);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingApplication, setEditingApplication] = useState(null);
    const [viewMode, setViewMode] = useState('column'); // 'column' or 'grid'

    // Filter applications based on status and search term
    const filteredApplications = applications.filter(app => {
        const matchesStatus = filterStatus === 'All' || app.status === filterStatus.toLowerCase();
        const matchesSearch = app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            app.company.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const handleDeleteApplication = (id) => {
        setApplications(applications.filter(app => app.id !== id));
    };

    const handleAddApplication = (newAppData) => {
        const newApplication = {
            id: Date.now(),
            position: newAppData.position,
            company: newAppData.company,
            appliedDate: new Date(newAppData.appliedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            status: newAppData.status,
            notes: newAppData.notes
        };
        setApplications([...applications, newApplication]);
    };

    const handleEditApplication = (application) => {
        setEditingApplication(application);
        setShowAddForm(true);
    };

    const handleUpdateApplication = (updatedData) => {
        setApplications(applications.map(app => 
            app.id === editingApplication.id 
                ? { 
                    ...app, 
                    position: updatedData.position,
                    company: updatedData.company,
                    appliedDate: new Date(updatedData.appliedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }),
                    status: updatedData.status,
                    notes: updatedData.notes
                }
                : app
        ));
        setEditingApplication(null);
    };

    const handleViewToggle = () => {
        setViewMode(viewMode === 'column' ? 'grid' : 'column');
    };

    return (
        <div className="min-h-screen bg-background">
            <Header onAddApplication={() => setShowAddForm(true)} />
            
            <main className="container mx-auto px-8 md:px-16 py-8">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-text-dark mb-8">My applications</h1>
                
                {/* Controls Section */}
                <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <FilterDropdown 
                            selectedStatus={filterStatus}
                            onStatusChange={setFilterStatus}
                            viewMode={viewMode}
                            onViewToggle={handleViewToggle}
                        />
                        <SearchBar 
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                        />
                    </div>
                </div>

                {/* Applications List - Using ApplicationList component */}
                <ApplicationList
                    applications={filteredApplications}
                    viewMode={viewMode}
                    onDelete={handleDeleteApplication}
                    onEdit={handleEditApplication}
                />
            </main>

            {/* Add/Edit Application Modal */}
            <AddApplicationForm
                isOpen={showAddForm}
                onClose={() => {
                    setShowAddForm(false);
                    setEditingApplication(null);
                }}
                onSave={editingApplication ? handleUpdateApplication : handleAddApplication}
                editData={editingApplication}
            />
        </div>
    );
};

export default DashboardPage;