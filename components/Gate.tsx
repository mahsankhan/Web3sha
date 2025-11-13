import React, { useState } from 'react';
import { Lead } from '../types';

interface GateProps {
    onUnlock: (lead: Omit<Lead, 'id' | 'capturedAt'>) => Promise<void>;
    title: string;
    description: string;
}

const Gate: React.FC<GateProps> = ({ onUnlock, title, description }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onUnlock({ name, email, phone });
            // The parent component will handle unmounting this component upon success.
        } catch (error) {
            console.error("Submission failed:", error);
            // In case of an error, allow the user to try again.
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
            <p className="max-w-2xl mx-auto text-gray-400 mb-8">
                {description}
            </p>
            <div className="max-w-md mx-auto">
                 <form onSubmit={handleSubmit} className="bg-card shadow-lg rounded-lg p-8 space-y-6">
                    <div>
                        <label htmlFor="gate-name" className="sr-only">Full Name</label>
                        <input type="text" id="gate-name" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required className="w-full bg-background border border-gray-600 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                    <div>
                        <label htmlFor="gate-email" className="sr-only">Email Address</label>
                        <input type="email" id="gate-email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" required className="w-full bg-background border border-gray-600 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                    <div>
                        <label htmlFor="gate-phone" className="sr-only">Phone Number</label>
                        <input type="tel" id="gate-phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" required className="w-full bg-background border border-gray-600 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center">
                            {isSubmitting && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>}
                            {isSubmitting ? 'Unlocking...' : 'Get My Free Playbook'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Gate;