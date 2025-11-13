import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './Icons';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up the event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-24 bg-white dark:bg-card text-dark dark:text-light w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110 z-50 animate-fade-in-up"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;