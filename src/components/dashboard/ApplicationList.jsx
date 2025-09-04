import React from 'react';
import JobApplicationCard from './ApplicationCard';
import JobApplicationCardGrid from './ApplicationCardGrid';

const ApplicationList = ({ 
    applications, 
    viewMode, 
    onDelete, 
    onEdit 
}) => {
    if (applications.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-text-medium text-lg">No applications found</p>
            </div>
        );
    }

    return (
        <div className={viewMode === 'column' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'}>
            {applications.map(application => (
                viewMode === 'column' ? (
                    <JobApplicationCard
                        key={application.id}
                        application={application}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ) : (
                    <JobApplicationCardGrid
                        key={application.id}
                        application={application}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                )
            ))}
        </div>
    );
};

export default ApplicationList;