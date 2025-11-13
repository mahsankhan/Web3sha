import React from 'react';
import { TermsOfServiceContent } from '../types';
import { CloseIcon } from './Icons';

interface TermsOfServiceModalProps {
  content: TermsOfServiceContent;
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ content, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-card w-full max-w-3xl max-h-[90vh] rounded-lg shadow-2xl relative flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold">{content.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated: {content.lastUpdated}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white">
            <CloseIcon />
          </button>
        </header>

        <div className="p-6 md:p-8 overflow-y-auto">
          <p className="text-gray-500 dark:text-gray-400 mb-6">{content.introduction}</p>
          <div className="space-y-6">
            {content.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-dark dark:text-light mb-2">{section.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
        
        <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 text-right">
            <button 
                onClick={onClose} 
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
            >
                Close
            </button>
        </footer>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default TermsOfServiceModal;