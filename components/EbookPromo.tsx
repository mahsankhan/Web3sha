import React from 'react';
import { View, EbookPromoData } from '../types';
import { DownloadIcon } from './Icons';

interface EbookPromoProps {
  setView: (view: View) => void;
  data: EbookPromoData;
}

const EbookPromo: React.FC<EbookPromoProps> = ({ setView, data }) => {
  return (
    <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
            <div className="bg-card/50 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center border border-primary/20">
                <div className="md:w-1/2 p-8 md:p-12 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.headline}</h2>
                    <p className="text-lg text-gray-300 mb-8">
                        {data.description}
                    </p>
                    <button 
                        onClick={() => setView('hub')}
                        className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 flex items-center justify-center gap-2 mx-auto md:mx-0"
                    >
                        <DownloadIcon />
                        {data.cta}
                    </button>
                </div>
                 <div className="md:w-1/2">
                    <img 
                        src={data.imageUrl}
                        alt="Web3 Leader's Playbook"
                        className="w-full h-64 md:h-full object-cover"
                    />
                </div>
            </div>
        </div>
    </div>
  );
};

export default EbookPromo;