import React, { useState } from 'react';
import { getAIStrategyBrief } from '../services/geminiService';
import { SparklesIcon } from './Icons';
import SkeletonLoader from './skeletons/SkeletonLoader';

const markdownToHtml = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/<\/strong><br \/>/g, '</strong>') 
    .replace(/^\s*-\s*(.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/<\/ul>\s*<ul>/g, '')
    .replace(/\n/g, '<br />')
    .replace(/<\/li><br \/>/g, '</li>');
};


type BookingStep = 'initial' | 'analyzing' | 'summary' | 'form';

const BookingSection: React.FC = () => {
    const [step, setStep] = useState<BookingStep>('initial');
    const [objective, setObjective] = useState('');
    const [aiBrief, setAiBrief] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleAnalyze = async () => {
        if (objective.trim().length < 20) {
            setError('Please provide a more detailed description (at least 20 characters).');
            return;
        }
        setError('');
        setStep('analyzing');
        try {
            const brief = await getAIStrategyBrief(objective);
            setAiBrief(brief);
            setStep('summary');
        } catch (e) {
            console.error(e);
            // Fallback in case of AI error
            setAiBrief(objective); 
            setError('My AI assistant could not generate a brief, but you can proceed with your original description.');
            setStep('summary');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto text-center bg-card p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-4 text-green-400">Request Received!</h2>
                <p className="text-gray-300">Thank you. Your request for an Executive Strategy Session, along with your complimentary AI-powered strategy brief, has been sent directly to my team. We will be in touch shortly with next steps.</p>
            </div>
        );
    }
    
     const renderInitialStep = () => (
        <div className="bg-card shadow-lg rounded-lg p-8 space-y-6">
            <div className="flex items-center gap-3 text-primary">
                <SparklesIcon />
                <h3 className="text-xl font-semibold text-light">My AI-Powered Strategy Assistant</h3>
            </div>
            <p className="text-gray-400">To maximize our session's value, describe your primary challenge. My AI, trained on my frameworks, will instantly analyze it and prepare a complimentary strategic brief for our meeting.</p>
            <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-2">Describe your challenge or goal</label>
                <textarea 
                    id="topic" 
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    rows={5} 
                    required 
                    placeholder="e.g., 'We need to design a tokenomics model that aligns network participants and captures long-term value.'"
                    className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>
            <div>
                <button onClick={handleAnalyze} className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300 flex items-center justify-center gap-2">
                    <SparklesIcon />
                    Analyze & Prepare Brief
                </button>
            </div>
        </div>
    );

    const renderAnalyzingStep = () => (
        <div className="bg-card shadow-lg rounded-lg p-8 space-y-6 animate-fade-in">
            <h3 className="text-xl font-semibold text-light">Your Strategic Brief is Being Prepared...</h3>
            <p className="text-gray-400">My AI is preparing your brief. This will be ready in just a moment.</p>
            <div className="bg-background/50 border border-gray-600 rounded-lg p-4 space-y-4">
                <SkeletonLoader className="h-5 w-1/3 mb-4" />
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-4 w-5/6 mb-4" />
                <SkeletonLoader className="h-5 w-1/2 mb-4" />
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-4 w-full" />
                <SkeletonLoader className="h-4 w-3/4" />
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
                <SkeletonLoader className="h-10 w-36 rounded-lg" />
                <SkeletonLoader className="h-10 w-56 rounded-lg" />
            </div>
        </div>
    );

    const renderSummaryStep = () => (
        <div className="bg-card shadow-lg rounded-lg p-8 space-y-6">
            <h3 className="text-xl font-semibold text-light">Your Strategic Brief is Ready</h3>
            <p className="text-gray-400">Review the AI-generated brief below. This will serve as the foundation for our strategy session. Does this accurately capture your goals?</p>
            <div 
                className="bg-background/50 border border-gray-600 rounded-lg p-4 space-y-4 text-sm text-gray-300 prose-summary"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(aiBrief) }}
            />
            {error && <p className="text-yellow-400 text-sm mt-2">{error}</p>}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
                 <button onClick={() => { setStep('initial'); setError(''); }} className="bg-gray-700/50 hover:bg-gray-600/50 text-light font-semibold py-2 px-4 rounded-lg transition duration-300">
                    Edit My Objective
                </button>
                <button onClick={() => setStep('form')} className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300">
                    This Looks Correct, Proceed
                </button>
            </div>
             <style>{`
                .prose-summary strong { color: white; }
                .prose-summary ul { padding-left: 1.25rem; list-style-type: disc; }
                .prose-summary li { margin: 0.25rem 0; }
            `}</style>
        </div>
    );

    const renderFormStep = () => (
         <form onSubmit={handleSubmit} className="bg-card shadow-lg rounded-lg p-8 space-y-6">
            <h3 className="text-xl font-semibold text-light">Final Step: Confirm Your Details</h3>
            <p className="text-gray-400 text-sm">Fill out your information to request the session. I will personally review this brief before our call.</p>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input type="text" id="name" name="name" required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input type="email" id="email" name="email" required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
            </div>
             <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" required className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
            </div>
            <div>
                <label htmlFor="final-topic" className="block text-sm font-medium text-gray-300 mb-2">Session Brief (AI-Generated)</label>
                <textarea id="final-topic" name="topic" rows={8} readOnly value={aiBrief.replace(/\*\*/g, '').replace(/^- /gm, '')} className="w-full bg-background/50 border border-gray-600 rounded-md py-2 px-3 text-gray-400 focus:outline-none cursor-not-allowed"></textarea>
            </div>
            <div>
                <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 duration-300">
                    Request Your Strategy Session
                </button>
            </div>
        </form>
    );

    const renderStep = () => {
        switch (step) {
            case 'initial': return renderInitialStep();
            case 'analyzing': return renderAnalyzingStep();
            case 'summary': return renderSummaryStep();
            case 'form': return renderFormStep();
            default: return renderInitialStep();
        }
    };
    
    return (
        <section>
            <div className="text-center mb-12 flex flex-col items-center">
                 <img 
                    src="https://picsum.photos/seed/m-ahsan-khan-pro/200/200" 
                    alt="Muhammad Ahsan Khan"
                    className="w-24 h-24 rounded-full mb-6 border-4 border-card shadow-lg"
                />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Executive Strategy Session</h2>
                <p className="max-w-2xl mx-auto text-gray-400">
                   For leaders at critical inflection points. This confidential, high-impact session with me is designed to solve your most complex Web3 challenge and deliver a precise, actionable roadmap. This is not a consultation; it's a strategic intervention.
                </p>
            </div>
            <div className="max-w-2xl mx-auto">
                {renderStep()}
            </div>
        </section>
    );
};

export default BookingSection;