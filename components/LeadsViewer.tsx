import React from 'react';
import { Lead } from '../types';
import { DownloadCloudIcon } from './Icons';

interface LeadsViewerProps {
    leads: Lead[];
}

const LeadsViewer: React.FC<LeadsViewerProps> = ({ leads }) => {

    const downloadCSV = () => {
        const headers = ['ID', 'Name', 'Email', 'Phone', 'Captured At'];
        const csvRows = [
            headers.join(','),
            ...leads.map(lead => [
                lead.id,
                `"${lead.name.replace(/"/g, '""')}"`,
                `"${lead.email.replace(/"/g, '""')}"`,
                `"${lead.phone.replace(/"/g, '""')}"`,
                lead.capturedAt,
            ].join(','))
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'web3hub_leads.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white dark:bg-card rounded-lg shadow-lg">
            <div className="p-4 sm:p-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Captured Leads ({leads.length})</h3>
                <button 
                    onClick={downloadCSV} 
                    disabled={leads.length === 0}
                    className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 flex items-center gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <DownloadCloudIcon />
                    Download as CSV
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                    <thead className="bg-gray-50 dark:bg-background/50 text-xs text-gray-500 dark:text-gray-400 uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Date Captured</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.length > 0 ? (
                            leads.map(lead => (
                                <tr key={lead.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-card/50">
                                    <th scope="row" className="px-6 py-4 font-medium text-dark dark:text-light whitespace-nowrap">{lead.name}</th>
                                    <td className="px-6 py-4">{lead.email}</td>
                                    <td className="px-6 py-4">{lead.phone}</td>
                                    <td className="px-6 py-4">{new Date(lead.capturedAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-8 text-gray-500 dark:text-gray-400">No leads have been captured yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeadsViewer;