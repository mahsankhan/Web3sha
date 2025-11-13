import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, View, Content } from '../types';
import { sendMessageToAI } from '../services/geminiService';
import { ChatIcon, CloseIcon, SendIcon, UserIcon, BotIcon } from './Icons';

interface ChatbotProps {
  setView: (view: View) => void;
  learnContent: Content[];
}

// Simple markdown to HTML converter
const markdownToHtml = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
    .replace(/^\s*-\s*(.*)/gm, '<li>$1</li>') // List items
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>') // Wrap lists
    .replace(/<\/ul>\s*<ul>/g, '') // Join adjacent lists
    .replace(/\n/g, '<br />') // Newlines
    .replace(/<\/li><br \/>/g, '</li>'); // Cleanup extra breaks
};


const Chatbot: React.FC<ChatbotProps> = ({ setView, learnContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello. I am the Strategic AI Analyst. Are you here to get my free Web3 Leader's Playbook, or are you ready to explore my premium Mastery Tracks and Inner Circle memberships?" },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => scrollToBottom(), 100);
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (userInput.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToAI(userInput, learnContent);
      setMessages(prev => [...prev, { sender: 'ai', ...aiResponse }]);
    } catch (error) {
      console.error('Error sending message to AI:', error);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Sorry, I seem to be having trouble. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };
  
  const handleActionClick = (view: View) => {
    setView(view);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110 z-50"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-full max-h-[600px] bg-card rounded-lg shadow-2xl flex flex-col z-40 origin-bottom-right transition-all duration-300 animate-fade-in-up">
          <header className="bg-background/80 p-4 flex justify-between items-center rounded-t-lg border-b border-gray-700">
            <h3 className="text-lg font-semibold">Strategic AI Analyst</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <CloseIcon />
            </button>
          </header>
          <div className="flex-1 p-4 overflow-y-auto bg-background">
            {messages.map((msg, index) => (
               <div key={index} className={`flex flex-col my-4 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.sender === 'ai' && <BotIcon />}
                  {msg.sender === 'user' && <UserIcon />}
                  <div className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 shadow ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-700/50 text-light rounded-bl-none'}`}>
                     <div 
                      className="text-sm prose"
                      dangerouslySetInnerHTML={{ __html: markdownToHtml(msg.text) }} 
                    />
                  </div>
                </div>
                {msg.actions && msg.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 ml-11">
                    {msg.actions.map((action, actionIndex) => (
                      <button 
                        key={actionIndex}
                        onClick={() => handleActionClick(action.view)}
                        className="bg-background hover:bg-primary/20 border border-primary/30 text-primary text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 my-4 justify-start">
                <BotIcon />
                <div className="bg-gray-700/50 rounded-lg px-4 py-3 rounded-bl-none flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-0"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <footer className="p-4 border-t border-gray-700">
            <div className="flex items-center bg-background rounded-lg">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="State your objective..."
                className="w-full bg-transparent text-light px-4 py-2 focus:outline-none"
                disabled={isLoading}
              />
              <button onClick={handleSend} disabled={isLoading} className="p-3 text-primary disabled:text-gray-500 hover:text-blue-400">
                <SendIcon />
              </button>
            </div>
          </footer>
        </div>
      )}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
        .prose { color: inherit; }
        .prose strong { color: inherit; font-weight: 700; }
        .prose em { color: inherit; font-style: italic; }
        .prose ul { padding-left: 1.25rem; margin-top: 0.5rem; margin-bottom: 0.5rem; list-style-type: disc; }
        .prose li { margin: 0.25rem 0; }
        .prose br { content: ""; display: block; margin-bottom: 0.25rem; }
      `}</style>
    </>
  );
};

export default Chatbot;