import React from 'react';
import { LinkedInIcon, TwitterIcon } from './Icons';
import { AboutMeData } from '../types';

interface AboutMeProps {
  data: AboutMeData;
}

const AboutMe: React.FC<AboutMeProps> = ({ data }) => {
  return (
    <div className="py-16 md:py-24 bg-gray-50 dark:bg-card/20 border-y border-gray-200 dark:border-card/50 mt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-1 flex justify-center">
            <img 
              src={data.imageUrl}
              alt="Muhammad Ahsan Khan"
              className="w-48 h-64 md:w-full md:h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="md:col-span-2 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">{data.headline}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {data.bio1}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {data.bio2}
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                <LinkedInIcon />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;