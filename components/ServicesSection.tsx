import React, { useState } from 'react';
import { ServiceTier } from '../types';
import { SparklesIcon } from './Icons';
import { getMembershipRecommendation } from '../services/geminiService';
import SkeletonLoader from './skeletons/SkeletonLoader';


const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ServiceTierCard: React.FC<{ tier: ServiceTier }> = ({ tier }) => (
    <div className={`bg-white dark:bg-card rounded-lg p-8 shadow-lg transition-all duration-300 transform ${tier.isFeatured ? 'border-2 border-primary scale-105' : 'border border-gray-200 dark:border-gray-700 hover:-translate-y-2'}`}>
        {tier.isFeatured && (
            <div className="text-center mb-4">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Most Popular</span>
            </div>
        )}
        <h3 className="text-2xl font-bold text-center mb-2">{tier.name}</h3>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6 h-16">{tier.description}</p>
        <p className="text-4xl font-bold text-center mb-6">
            {tier.price}
        </p>
        <ul className="space-y-4 mb-8">
            {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                    <CheckIcon />
                    <span className="ml-3 text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
            ))}
        </ul>
        <a 
            href={tier.gumroadLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`block w-full text-center font-semibold py-3 px-6 rounded-lg transition-colors duration-300 ${tier.isFeatured ? 'bg-primary hover:bg-blue-600 text-white' : 'bg-gray-100 dark:bg-background hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-dark dark:text-light'}`}
        >
            Join The Inner Circle
        </a>
    </div>
);

const GOAL_OPTIONS = [
    "Master Web3 Fundamentals",
    "Build a Web3 Project",
    "Stay on the Cutting Edge",
    "Access Expert Frameworks",
    "Get My Personal Advice",
];

const AIAdvisor: React.FC = () => {
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
    const [recommendation, setRecommendation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleGoal = (goal: string) => {
        setSelectedGoals(prev => 
            prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
        );
    };

    const handleGetRecommendation = async () => {
        if (selectedGoals.length === 0) return;
        setIsLoading(true);
        setRecommendation('');
        const result = await getMembershipRecommendation(selectedGoals);
        setRecommendation(result);
        setIsLoading(false);
    };

    return (
        <div className="bg-gray-100/70 dark:bg-card/70 rounded-lg p-6 md:p-8 mt-16 border border-primary/20 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
                 <SparklesIcon />
                <h3 className="text-2xl font-bold">My AI Membership Advisor</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Select your primary goals, and my AI—trained on my frameworks—will recommend the perfect membership tier for you.</p>
            
            <div className="flex flex-wrap gap-3 mb-6">
                {GOAL_OPTIONS.map(goal => (
                    <button
                        key={goal}
                        onClick={() => toggleGoal(goal)}
                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                            selectedGoals.includes(goal)
                                ? 'bg-primary text-white'
                                : 'bg-white dark:bg-background hover:bg-gray-200 dark:hover:bg-card/70 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        {goal}
                    </button>
                ))}
            </div>

            <button
                onClick={handleGetRecommendation}
                disabled={selectedGoals.length === 0 || isLoading}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Analyzing...' : 'Get My Recommendation'}
            </button>

            {(isLoading || recommendation) && (
                 <div className="mt-6 bg-white/50 dark:bg-background/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    {isLoading ? (
                        <div className="space-y-3">
                            <SkeletonLoader className="h-5 w-3/4" />
                            <SkeletonLoader className="h-5 w-full" />
                            <SkeletonLoader className="h-5 w-1/2" />
                        </div>
                    ) : (
                        <p className="text-lg text-dark dark:text-light" dangerouslySetInnerHTML={{ __html: recommendation.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>') }} />
                    )}
                </div>
            )}
        </div>
    );
};


interface ServicesSectionProps {
    tiers: ServiceTier[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ tiers }) => {
    return (
        <section>
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join My Inner Circle</h2>
                <p className="max-w-3xl mx-auto text-gray-500 dark:text-gray-400">
                    Information is a commodity. Actionable intelligence, proprietary frameworks, and an elite network are what create leaders. My memberships are your induction into an inner circle of Web3 strategists I've personally curated. This is your decisive advantage.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                {tiers.map((tier) => (
                    <ServiceTierCard key={tier.name} tier={tier} />
                ))}
            </div>
            <AIAdvisor />
        </section>
    );
};

export default ServicesSection;