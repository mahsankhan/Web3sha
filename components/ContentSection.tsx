import React, { useState, useMemo } from 'react';
// FIX: Imported Lead type to be used in onUnlock prop.
import { Content, Lead } from '../types';
import Gate from './Gate';

const ContentCard: React.FC<{ title: string; description: string; category: string; imageUrl: string }> = ({ title, description, category, imageUrl }) => (
  <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-2">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <p className="text-primary text-sm font-semibold mb-2">{category}</p>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-base">{description}</p>
    </div>
  </div>
);

interface ContentSectionProps {
    content: Content[];
    isUnlocked: boolean;
    // FIX: Updated onUnlock prop to match the signature expected by the Gate component.
    onUnlock: (lead: Omit<Lead, 'id' | 'capturedAt'>) => Promise<void>;
}

const ContentSection: React.FC<ContentSectionProps> = ({ content, isUnlocked, onUnlock }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(content.map(item => item.category))], [content]);

  const filteredContent = useMemo(() => {
    if (selectedCategory === 'All') {
      return content;
    }
    return content.filter(item => item.category === selectedCategory);
  }, [content, selectedCategory]);
  
  if (!isUnlocked) {
    return <Gate 
      onUnlock={onUnlock}
      title="Unlock Your Learning Journey"
      description="Get exclusive access to our full library of articles, guides, and tutorials. Enter your details to start learning from an expert."
    />;
  }
  
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Free Learning Resources</h2>
        <p className="max-w-2xl mx-auto text-gray-400">
          Your unlocked library. Start your Web3 journey with our curated collection of articles and tutorials.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-3 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-card hover:bg-card/70 text-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContent.length > 0 ? (
          filteredContent.map((item) => (
            <ContentCard key={item.id} {...item} />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full py-8">No content found for this category.</p>
        )}
      </div>
    </section>
  );
};

export default ContentSection;