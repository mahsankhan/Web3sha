import React, { useState } from 'react';
import { View } from '../types';
import { getAIRoadmap } from '../services/geminiService';
import { SparklesIcon } from './Icons';
import SkeletonLoader from './skeletons/SkeletonLoader';

interface HeroProps {
  setView: (view: View) => void;
}

const Hero: React.FC<HeroProps> = ({ setView }) => {
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roadmap, setRoadmap] = useState('');

  const handleGenerateRoadmap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    setIsLoading(true);
    setRoadmap('');
    const result = await getAIRoadmap(goal);
    setRoadmap(result);
    setIsLoading(false);
  };

  const getActionForRoadmap = (roadmapText: string) => {
    if (roadmapText.includes('Playbook') || roadmapText.includes('Guide') || roadmapText.includes('Intelligence Core')) return () => setView('hub');
    if (roadmapText.includes('Mastery Tracks') || roadmapText.includes('Courses')) return () => setView('courses');
    if (roadmapText.includes('Inner Circle') || roadmapText.includes('Memberships')) return () => setView('services');
    if (roadmapText.includes('Strategy Session')) return () => setView('book');
    return () => setView('hub');
  };

  return (
    <div className="text-center py-16 md:py-20">
       <img 
          src="https://picsum.photos/seed/m-ahsan-khan-pro/200/200" 
          alt="Muhammad Ahsan Khan"
          className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white dark:border-card shadow-lg"
        />
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-dark dark:text-light mb-4 bg-clip-text text-transparent bg-gradient-to-r from-dark to-gray-600 dark:from-light dark:to-gray-400">
        Architecting the Future of Web3.
      </h1>
      <p className="text-2xl text-primary font-semibold mb-6">I turn complexity into your strategic advantage.</p>
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
        As a Web3 strategist, advisor, and R&D expert, I help visionary founders and enterprises build category-defining ventures. State your critical challenge, and my AI—trained on my frameworks—will architect your first step.
      </p>
      
      <div className="max-w-2xl mx-auto bg-white dark:bg-card shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleGenerateRoadmap}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., 'Design a token model for a DeFi protocol'"
              className="w-full bg-light dark:bg-background border border-gray-300 dark:border-gray-600 rounded-md py-3 px-4 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-primary text-white font-semibold uppercase tracking-wider py-3 px-8 rounded-lg transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-primary"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <SparklesIcon />
              )}
              <span className="ml-2">{isLoading ? 'Generating...' : 'Get Your AI-Driven Roadmap'}</span>
            </button>
          </div>
        </form>
        
        {isLoading && (
          <div className="mt-6 p-4 bg-gray-100/50 dark:bg-background/50 rounded-lg text-center">
              <SkeletonLoader className="h-5 w-3/4 mx-auto mb-4" />
              <SkeletonLoader className="h-5 w-1/2 mx-auto mb-6" />
              <SkeletonLoader className="h-9 w-28 mx-auto" />
          </div>
        )}

        {roadmap && !isLoading && (
          <div className="mt-6 p-4 bg-gray-100/50 dark:bg-background/50 rounded-lg text-center animate-fade-in">
            <p className="text-lg text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: roadmap.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>') }} />
            <button
              onClick={getActionForRoadmap(roadmap)}
              className="mt-4 bg-white dark:bg-card hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-dark dark:text-light font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              Let's Go
            </button>
          </div>
        )}
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;