import React from 'react';
import { View, CoursesPromoData } from '../types';
import { BookOpenIcon } from './Icons';

interface CoursesPromoProps {
  setView: (view: View) => void;
  data: CoursesPromoData;
}

const CoursesPromo: React.FC<CoursesPromoProps> = ({ setView, data }) => {
  return (
    <div className="py-16 md:py-24 bg-gray-50 dark:bg-card/20 border-y border-gray-200 dark:border-card/50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 dark:bg-primary/20 text-primary rounded-full mx-auto mb-6">
                <BookOpenIcon />
            </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.headline}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
            {data.description}
          </p>
          <button 
            onClick={() => setView('courses')}
            className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            {data.cta}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesPromo;