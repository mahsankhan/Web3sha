import React from 'react';
import { Content } from '../types';
import { ArrowLeftIcon, SparklesIcon } from './Icons';

interface ContentDetailProps {
  content: Content;
  onBack: () => void;
  onLaunchDemo: (demo: Content['demoComponent']) => void;
}

const markdownToHtml = (text: string = '') => {
  let html = text
    .replace(/\n/g, '<br />');

  // Wrap paragraphs
  html = '<p>' + html.replace(/<br \/><br \/>/g, '</p><p>') + '</p>';
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');

  return html;
};

const ContentDetail: React.FC<ContentDetailProps> = ({ content, onBack, onLaunchDemo }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-primary font-semibold transition-colors duration-300"
        >
          <ArrowLeftIcon />
          Back to Hub
        </button>
      </div>

      <article className="bg-card rounded-lg shadow-lg overflow-hidden">
        <img src={content.imageUrl} alt={content.title} className="w-full h-64 md:h-80 object-cover" />
        <div className="p-6 md:p-10">
          <p className="text-primary text-sm font-semibold mb-3">{content.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-light mb-6">{content.title}</h1>

          {content.type === 'article' && content.fullContent && (
            <div
              className="prose-content text-gray-300 leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(content.fullContent) }}
            />
          )}

          {content.type === 'demo' && (
            <div>
              <p className="text-gray-300 leading-relaxed text-lg mb-8">{content.description}</p>
              <button
                onClick={() => onLaunchDemo(content.demoComponent)}
                className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-transform transform hover:scale-105 duration-300"
              >
                <SparklesIcon />
                Launch Interactive Demo
              </button>
            </div>
          )}
        </div>
      </article>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .prose-content p {
            margin-bottom: 1.25rem;
        }
        .prose-content p:last-child {
            margin-bottom: 0;
        }
      `}</style>
    </div>
  );
};

export default ContentDetail;