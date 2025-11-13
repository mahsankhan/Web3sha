import React from 'react';
import { NAV_LINKS } from '../constants';
import { View } from '../types';
import { Theme } from '../App';
import { LogoIcon, MoonIcon, SunIcon } from './Icons';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 bg-light/80 dark:bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-card">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setView('home')}
          >
            <LogoIcon />
            <div>
              <div className="text-xl font-bold leading-tight text-dark dark:text-light">Muhammad Ahsan Khan</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-tight">Web3 Strategist & Visionary</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.view}
                  onClick={() => setView(link.view)}
                  className={`text-base font-medium transition-colors duration-300 ${
                    currentView === link.view
                      ? 'text-primary'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-card"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button className="md:hidden text-dark dark:text-light">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;