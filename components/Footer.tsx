import React from 'react';
import { LinkedInIcon, TwitterIcon } from './Icons';

interface FooterProps {
  onShowTerms: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShowTerms }) => {
  return (
    <footer className="bg-gray-100 dark:bg-card/50">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
        <div className="flex justify-center gap-6 mb-4">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
              <LinkedInIcon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
              <TwitterIcon />
            </a>
        </div>
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} Muhammad Ahsan Khan. All rights reserved.</p>
          <div className="mt-2">
            <button onClick={onShowTerms} className="hover:text-primary transition-colors underline">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;