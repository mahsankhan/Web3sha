import React, { useState, useMemo } from 'react';
import { Content, Resource, Lead } from '../types';
import { Theme } from '../App';
import Gate from './Gate';
import { DownloadIcon, LightbulbIcon, SparklesIcon, CloseIcon, SearchIcon } from './Icons';
import { getAIAnswerFromHub, getAILearningPath } from '../services/geminiService';
import MintNFTDemo from './demos/MintNFTDemo';
import DaoVotingDemo from './demos/DaoVotingDemo';
import ContentDetail from './ContentDetail';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import TokenSwapDemo from './demos/TokenSwapDemo';
import SkeletonLoader from './skeletons/SkeletonLoader';


const markdownToHtml = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/<\/strong><br \/>/g, '</strong>') 
    .replace(/^\s*-\s*(.*)/gm, '<li>$1</li>')
    .replace(/^\s*\d\.\s*(.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ol class="list-decimal list-inside space-y-2">$1</ol>')
    .replace(/<\/ol>\s*<ol class="list-decimal list-inside space-y-2">/g, '')
    .replace(/\n/g, '<br />')
    .replace(/<\/li><br \/>/g, '</li>');
};

const ContentCard: React.FC<{ contentItem: Content, onCardClick: (id: string) => void, style?: React.CSSProperties }> = ({ contentItem, onCardClick, style }) => (
  <div 
    className="bg-white dark:bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] flex flex-col cursor-pointer group animate-card-enter opacity-0"
    style={style}
    onClick={() => onCardClick(contentItem.id)}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => { if (e.key === 'Enter') onCardClick(contentItem.id) }}
  >
    <div className="overflow-hidden">
        <img src={contentItem.imageUrl} alt={contentItem.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-primary text-sm font-semibold mb-2">{contentItem.category}</p>
      <h3 className="text-xl font-bold mb-3 flex-grow">{contentItem.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-base mb-4">{contentItem.description}</p>
      <span className="mt-auto w-full text-primary font-semibold py-2 text-center flex items-center justify-center gap-2">
        {contentItem.type === 'demo' && <SparklesIcon />}
        {contentItem.type === 'demo' ? 'View Interactive Demo' : 'Read Full Article'}
    </span>
    </div>
  </div>
);


const FeaturedResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => (
    <div className="bg-white dark:bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] flex flex-col md:flex-row border border-primary/50 animate-card-enter opacity-0">
        <img src={resource.imageUrl} alt={resource.title} className="w-full md:w-2/5 h-64 md:h-auto object-cover" />
        <div className="p-8 flex flex-col flex-grow">
            <p className="text-primary text-sm font-semibold mb-2 uppercase tracking-wider">{resource.type}</p>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-dark dark:text-light">{resource.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-base flex-grow mb-6">{resource.description}</p>
            <button className="mt-4 w-full md:w-auto md:self-start bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-transform transform hover:scale-105 duration-300">
                <DownloadIcon />
                Download My Playbook
            </button>
        </div>
    </div>
);

const ResourceCard: React.FC<{ resource: Resource, style?: React.CSSProperties }> = ({ resource, style }) => (
  <div 
    className="bg-white dark:bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.03] flex flex-col animate-card-enter opacity-0"
    style={style}
  >
    <img src={resource.imageUrl} alt={resource.title} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <p className="text-primary text-sm font-semibold mb-2">{resource.type}</p>
      <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-base flex-grow">{resource.description}</p>
      <button className="mt-4 w-full bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/40 text-primary font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300">
          <DownloadIcon />
          Download
      </button>
    </div>
  </div>
);

const AIHubAssistant: React.FC<{ learnContent: Content[] }> = ({ learnContent }) => {
    const [activeTool, setActiveTool] = useState<'qa' | 'path'>('qa');
    const [query, setQuery] = useState('');
    const [pathGoal, setPathGoal] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');

    const handleClear = () => {
        setQuery('');
        setPathGoal('');
        setAiResponse('');
        setIsLoading(false);
    };

    const handleQASubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsLoading(true);
        setAiResponse('');
        const response = await getAIAnswerFromHub(query, learnContent);
        setAiResponse(response);
        setIsLoading(false);
    };

    const handlePathSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!pathGoal.trim()) return;
        setIsLoading(true);
        setAiResponse('');
        const response = await getAILearningPath(pathGoal, learnContent);
        setAiResponse(response);
        setIsLoading(false);
    };

    return (
        <div className="bg-gray-100/70 dark:bg-card/70 rounded-lg p-6 md:p-8 mb-16 border border-primary/20 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
                 <LightbulbIcon />
                <h3 className="text-2xl font-bold">My AI Knowledge Assistant</h3>
            </div>
            <div className="flex gap-2 border-b border-gray-200 dark:border-card mb-6">
                <button onClick={() => { setActiveTool('qa'); setAiResponse(''); }} className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${activeTool === 'qa' ? 'border-b-2 border-primary text-dark dark:text-light' : 'text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-light'}`}>Ask My Knowledge Base</button>
                <button onClick={() => { setActiveTool('path'); setAiResponse(''); }} className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ${activeTool === 'path' ? 'border-b-2 border-primary text-dark dark:text-light' : 'text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-light'}`}>Generate Learning Path</button>
            </div>

            {activeTool === 'qa' && (
                <form onSubmit={handleQASubmit}>
                    <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">Get an AI-powered answer synthesized from my entire knowledge base.</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g., How do I secure my crypto wallet?" className="w-full bg-light dark:bg-background border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                        <button type="submit" disabled={isLoading} className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 disabled:bg-gray-500">
                           <SparklesIcon /> {isLoading ? 'Analyzing...' : 'Get Answer'}
                        </button>
                    </div>
                </form>
            )}

            {activeTool === 'path' && (
                <form onSubmit={handlePathSubmit}>
                    <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">Describe your learning goal, and my AI will generate a custom learning path from my articles.</p>
                     <div className="flex flex-col sm:flex-row gap-2">
                        <input type="text" value={pathGoal} onChange={e => setPathGoal(e.target.value)} placeholder="e.g., I want to launch an NFT project" className="w-full bg-light dark:bg-background border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                        <button type="submit" disabled={isLoading} className="bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 disabled:bg-gray-500">
                           <SparklesIcon /> {isLoading ? 'Generating...' : 'Create Path'}
                        </button>
                    </div>
                </form>
            )}

            {(isLoading || aiResponse) && (
                <div className="mt-6 bg-white/50 dark:bg-background/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    {isLoading ? (
                        <div className="space-y-3">
                            <SkeletonLoader className="h-4 w-full" />
                            <SkeletonLoader className="h-4 w-5/6" />
                            <SkeletonLoader className="h-4 w-3/4" />
                        </div>
                    ) : (
                       <>
                            <div className="prose-ai-response" dangerouslySetInnerHTML={{ __html: markdownToHtml(aiResponse) }} />
                            <div className="text-right mt-4 pt-4 border-t border-gray-300/50 dark:border-gray-700/50">
                                 <button 
                                    onClick={handleClear} 
                                    className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary transition-colors duration-200"
                                >
                                    Clear & Start New Query
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
             <style>{`
                .prose-ai-response strong { color: black; }
                .dark .prose-ai-response strong { color: white; }
                .prose-ai-response ol { padding-left: 1.25rem; }
                .prose-ai-response li { margin: 0.5rem 0; line-height: 1.6; }
            `}</style>
        </div>
    );
}

interface LearningHubSectionProps {
    learnContent: Content[];
    resourcesContent: Resource[];
    isUnlocked: boolean;
    onUnlock: (lead: Omit<Lead, 'id' | 'capturedAt'>) => Promise<void>;
    theme: Theme;
}

type DemoComponentType = Content['demoComponent'];

const CHART_COLORS = ['#0D6EFD', '#17a2b8', '#6f42c1', '#d63384', '#fd7e14', '#ffc107'];

const LearningHubSection: React.FC<LearningHubSectionProps> = ({ learnContent, resourcesContent, isUnlocked, onUnlock, theme }) => {
    const [activeDemo, setActiveDemo] = useState<DemoComponentType | null>(null);
    const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('All');
    const learnCategories = useMemo(() => ['All', ...new Set(learnContent.map(item => item.category))], [learnContent]);
    
    const filteredLearnContent = useMemo(() => {
        let content = learnContent;
        if (selectedCategory !== 'All') {
            content = content.filter(item => item.category === selectedCategory);
        }
        if (searchQuery.trim() !== '') {
            const lowercasedQuery = searchQuery.toLowerCase();
            content = content.filter(item =>
                item.title.toLowerCase().includes(lowercasedQuery) ||
                item.description.toLowerCase().includes(lowercasedQuery)
            );
        }
        return content;
    }, [learnContent, selectedCategory, searchQuery]);
    
    const chartData = useMemo(() => {
        const categoryCounts = learnContent.reduce((acc, item) => {
            if (item.type === 'article') {
                acc[item.category] = (acc[item.category] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(categoryCounts).map(([name, value]) => ({ name, value }));
    }, [learnContent]);
    
    const selectedContent = useMemo(() => 
        learnContent.find(c => c.id === selectedContentId), 
        [learnContent, selectedContentId]
    );

    if (!isUnlocked) {
        return <Gate 
            onUnlock={onUnlock}
            title="Get My Free Web3 Leader's Playbook"
            description="Enter your details to instantly download my foundational E-book and unlock the entire Intelligence Core—my complete library of expert articles, demos, and strategic frameworks."
        />;
    }
    
    if (selectedContent) {
        return <ContentDetail 
                    content={selectedContent} 
                    onBack={() => setSelectedContentId(null)} 
                    onLaunchDemo={setActiveDemo} 
                />;
    }
    
    const renderDemo = () => {
        switch(activeDemo) {
            case 'MintNFTDemo': return <MintNFTDemo />;
            case 'DaoVotingDemo': return <DaoVotingDemo />;
            case 'TokenSwapDemo': return <TokenSwapDemo />;
            default: return null;
        }
    };

    return (
        <section>
             {activeDemo && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setActiveDemo(null)}>
                    <div className="bg-white dark:bg-card w-full max-w-2xl max-h-[90vh] rounded-lg shadow-2xl p-6 relative overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setActiveDemo(null)} className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-dark dark:hover:text-white">
                            <CloseIcon />
                        </button>
                        {renderDemo()}
                    </div>
                </div>
            )}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">My Intelligence Core</h2>
                <p className="max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
                    You have unlocked my definitive intelligence archive. This is your central hub for the frameworks, analysis, and strategic tools that I use to architect the decentralized future.
                </p>
            </div>
            
            {resourcesContent.length > 0 && 
                <div className="mb-16">
                    <FeaturedResourceCard resource={resourcesContent[0]} />
                </div>
            }

            <AIHubAssistant learnContent={learnContent} />

            <div>
                <div className="text-center border-t border-gray-200 dark:border-card pt-16 mb-12">
                    <h3 className="text-2xl font-bold mb-8">My Unlocked Briefings & Frameworks</h3>
                </div>

                <div className="max-w-xl mx-auto mb-8">
                    <label htmlFor="hub-search" className="sr-only">Search My Intelligence Core</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            id="hub-search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search briefings and demos by keyword..."
                            className="w-full bg-light dark:bg-background border border-gray-300 dark:border-gray-600 rounded-full py-3 pl-10 pr-4 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="flex justify-center flex-wrap gap-3 mb-12">
                    {learnCategories.map(category => (
                        <button key={category} onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                                selectedCategory === category ? 'bg-primary text-white' : 'bg-white dark:bg-card hover:bg-gray-200/70 dark:hover:bg-card/70 text-gray-700 dark:text-gray-300'
                            }`}>{category}</button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredLearnContent.length > 0 ? (
                        filteredLearnContent.map((item, index) => <ContentCard key={item.id} contentItem={item} onCardClick={setSelectedContentId} style={{ animationDelay: `${index * 50}ms` }} />)
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full py-8">No content found. Try adjusting your search or filters.</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                     {resourcesContent.slice(1).map((resource, index) => <ResourceCard key={resource.id} resource={resource} style={{ animationDelay: `${(filteredLearnContent.length + index) * 50}ms` }} />)}
                </div>

                <div className="bg-gray-100/70 dark:bg-card/70 rounded-lg p-6 md:p-8 mt-16 border border-gray-200 dark:border-gray-800">
                    <h3 className="text-2xl font-bold text-center mb-6">My Content Distribution</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#ffffff20' : '#00000020'} />
                                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} tick={{ fontSize: 12 }} />
                                <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} allowDecimals={false} tick={{ fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: theme === 'dark' ? '#ffffff10' : '#00000010' }}
                                    contentStyle={theme === 'dark' ? {
                                        backgroundColor: '#161b33',
                                        border: '1px solid #ffffff30',
                                        borderRadius: '0.5rem'
                                    } : {
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '0.5rem'
                                    }}
                                    labelStyle={theme === 'dark' ? { color: '#ffffff' } : { color: '#1a1a2e' }}
                                />
                                <Bar dataKey="value" name="Articles">
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearningHubSection;