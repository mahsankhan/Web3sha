import React from 'react';
import { LinkedInFeedData, LinkedInPost } from '../types';
import { VerifiedIcon, LikeIcon, CommentIcon, ShareIcon } from './Icons';

const PostCard: React.FC<{ post: LinkedInPost, index: number }> = ({ post, index }) => {
    // Simple parser to handle newlines and bold text
    const formatContent = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');
    };

    return (
        <div 
            className="bg-white dark:bg-card border border-gray-200 dark:border-gray-700/50 rounded-lg p-6 animate-card-enter opacity-0"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="flex items-center mb-4">
                <img 
                    src="https://picsum.photos/seed/m-ahsan-khan-pro/200/200" 
                    alt="Muhammad Ahsan Khan"
                    className="w-12 h-12 rounded-full mr-4 border-2 border-white dark:border-card"
                />
                <div>
                    <div className="flex items-center gap-1">
                        <h4 className="font-bold text-dark dark:text-light">Muhammad Ahsan Khan</h4>
                        <VerifiedIcon />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">@mak_web3 · {post.timestamp}</p>
                </div>
            </div>
            <div 
                className="text-gray-700 dark:text-gray-300 mb-6 prose-post"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
            />
            <div className="flex items-center gap-6 text-gray-500 dark:text-gray-500">
                <div className="flex items-center gap-2 hover:text-red-500 cursor-pointer transition-colors">
                    <LikeIcon />
                    <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-primary cursor-pointer transition-colors">
                    <CommentIcon />
                    <span className="text-sm">{post.comments}</span>
                </div>
                 <div className="flex items-center gap-2 hover:text-green-500 cursor-pointer transition-colors">
                    <ShareIcon />
                    <span className="text-sm">{post.shares}</span>
                </div>
            </div>
             <style>{`
                .prose-post strong { color: black; }
                .dark .prose-post strong { color: white; }
            `}</style>
        </div>
    );
};

interface LinkedInFeedProps {
    data: LinkedInFeedData;
    posts: LinkedInPost[];
}

const LinkedInFeed: React.FC<LinkedInFeedProps> = ({ data, posts }) => {
    return (
        <section className="py-16 md:py-24 border-t border-gray-200 dark:border-card/50 mt-16">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.headline}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {data.description}
                    </p>
                </div>
                <div className="max-w-2xl mx-auto space-y-6">
                    {posts.map((post, index) => (
                        <PostCard key={post.id} post={post} index={index} />
                    ))}
                </div>
                 <div className="text-center mt-12">
                     <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-card hover:bg-gray-200/50 dark:hover:bg-gray-700/50 text-dark dark:text-light font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300">
                        {data.cta}
                    </a>
                </div>
            </div>
        </section>
    );
}

export default LinkedInFeed;