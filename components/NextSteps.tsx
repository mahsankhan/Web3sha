import React from 'react';
import { Course, View } from '../types';
import { RocketIcon, UsersIcon, BriefcaseIcon } from './Icons';

interface NextStepsProps {
    setView: (view: View) => void;
    courses: Course[];
    currentCourse: Course;
}

const NextSteps: React.FC<NextStepsProps> = ({ setView, courses, currentCourse }) => {
    const recommendedCourse = courses.find(c => c.id === currentCourse.nextSteps?.recommendedCourseId);

    return (
        <div className="bg-light dark:bg-background/50 rounded-lg p-6 w-full">
            <h3 className="text-xl font-bold text-center mb-6">Your Next Steps to Mastery</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {/* Option 1: Upsell to a paid course */}
                {recommendedCourse && (
                    <div className="bg-white dark:bg-card p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center">
                        <RocketIcon />
                        <h4 className="font-bold my-3">Go Deeper</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">
                            Apply your new knowledge in an advanced setting. I recommend the "{recommendedCourse.title}" course.
                        </p>
                        <button 
                            onClick={() => setView('courses')}
                            className="w-full mt-auto bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/40 text-primary font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                            View Paid Courses
                        </button>
                    </div>
                )}
                
                {/* Option 2: Upsell to Memberships */}
                <div className="bg-white dark:bg-card p-6 rounded-lg border border-primary/50 flex flex-col items-center ring-2 ring-primary/30">
                     <UsersIcon />
                    <h4 className="font-bold my-3">Join The Inner Circle</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">
                        Gain ongoing access to exclusive content, live sessions, and our strategic community.
                    </p>
                    <button 
                        onClick={() => setView('services')}
                        className="w-full mt-auto bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        Explore Memberships
                    </button>
                </div>

                {/* Option 3: Upsell to Consultation */}
                <div className="bg-white dark:bg-card p-6 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center">
                    <BriefcaseIcon />
                    <h4 className="font-bold my-3">Get a Custom Roadmap</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow">
                        Book a one-on-one strategy session for personalized guidance on your project.
                    </p>
                    <button 
                        onClick={() => setView('book')}
                        className="w-full mt-auto bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/40 text-primary font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                        Book a Session
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NextSteps;