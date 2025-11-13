import React from 'react';
import { Lead } from '../types';
import LeadsViewer from './LeadsViewer';

interface AdminDashboardProps {
    leads: Lead[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ leads }) => {
    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Lead Management Dashboard</h2>
                <p className="max-w-2xl mx-auto text-gray-400">
                    View and export all leads captured from your website. Content (articles, resources, courses) would be managed via your external CMS (e.g., Strapi).
                </p>
            </div>
            <LeadsViewer leads={leads} />
        </section>
    );
};

export default AdminDashboard;