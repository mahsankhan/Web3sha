import React from 'react';
import { View, MembershipPromoData, ServiceTier } from '../types';

interface MembershipPromoProps {
  setView: (view: View) => void;
  data: MembershipPromoData;
  tiers: ServiceTier[];
}

const MembershipPromo: React.FC<MembershipPromoProps> = ({ setView, data, tiers }) => {
  return (
    <div className="text-center py-16 md:py-24 border-t border-card/50 mt-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.headline}</h2>
      <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-10">
        {data.description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
        {tiers.map((tier) => (
          <div key={tier.name} className="bg-card/50 p-6 rounded-lg border border-gray-700/80 transform transition-transform hover:scale-105 hover:border-primary/50">
            <h3 className="text-xl font-bold text-primary mb-2">{tier.name}</h3>
            <p className="text-gray-400 text-sm h-20">{tier.description}</p>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setView('services')}
        className="bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
      >
        {data.cta}
      </button>
    </div>
  );
};

export default MembershipPromo;