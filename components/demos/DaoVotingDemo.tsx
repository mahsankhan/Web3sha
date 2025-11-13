import React, { useState } from 'react';
import { SparklesIcon } from '../Icons';

interface Proposal {
    id: number;
    title: string;
    description: string;
    proposer: string;
    votesFor: number;
    votesAgainst: number;
}

const initialProposals: Proposal[] = [
    {
        id: 1,
        title: 'Q4 Budget Allocation for Protocol Grants',
        description: 'This proposal seeks to allocate 50,000 protocol tokens from the treasury to fund community grants for developers building on our ecosystem.',
        proposer: '0x1234...abcd',
        votesFor: 125000,
        votesAgainst: 15000,
    },
    {
        id: 2,
        title: 'Integrate New Cross-Chain Bridge',
        description: 'Proposal to integrate the "HyperLane" bridge to enable asset transfers between our native chain and Polygon, increasing liquidity and user access.',
        proposer: '0x5678...efgh',
        votesFor: 80000,
        votesAgainst: 95000,
    },
];


const DaoVotingDemo: React.FC = () => {
    const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
    const [votedOn, setVotedOn] = useState<number[]>([]);
    const userVotingPower = 5000;

    const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
        if (votedOn.includes(proposalId)) return;

        setProposals(prev => prev.map(p => {
            if (p.id === proposalId) {
                return {
                    ...p,
                    votesFor: p.votesFor + (voteType === 'for' ? userVotingPower : 0),
                    votesAgainst: p.votesAgainst + (voteType === 'against' ? userVotingPower : 0),
                };
            }
            return p;
        }));
        setVotedOn(prev => [...prev, proposalId]);
    };

    return (
         <div>
            <div className="text-center border-b border-card pb-6 mb-6">
                 <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mx-auto mb-4">
                    <SparklesIcon />
                 </div>
                <h2 className="text-2xl font-bold mb-2">Interactive Demo: DAO Voting</h2>
                <p className="max-w-xl mx-auto text-gray-400">Experience how decentralized governance works. Use your (simulated) voting power to influence the future of this mock protocol.</p>
            </div>
            
            <div className="bg-background/50 rounded-lg p-4 mb-6 text-center">
                <p className="text-gray-400 text-sm">Your Simulated Voting Power</p>
                <p className="text-2xl font-bold text-primary">{userVotingPower.toLocaleString()} VOTE</p>
            </div>
            
            <div className="space-y-6">
                {proposals.map(p => {
                    const totalVotes = p.votesFor + p.votesAgainst;
                    const forPercentage = totalVotes > 0 ? (p.votesFor / totalVotes * 100).toFixed(1) : 0;
                    const againstPercentage = totalVotes > 0 ? (p.votesAgainst / totalVotes * 100).toFixed(1) : 0;
                    const hasVoted = votedOn.includes(p.id);

                    return (
                        <div key={p.id} className="bg-card rounded-lg p-6 border border-gray-700">
                            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                            <p className="text-sm text-gray-500 mb-4">Proposed by: {p.proposer}</p>
                            <p className="text-gray-400 mb-6">{p.description}</p>
                            
                            <div className="space-y-2 mb-6">
                                <div className="w-full bg-background rounded-full h-4 overflow-hidden flex">
                                    <div className="bg-green-500 h-full" style={{width: `${forPercentage}%`}}></div>
                                    <div className="bg-red-500 h-full" style={{width: `${againstPercentage}%`}}></div>
                                </div>
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-green-400">{forPercentage}% FOR ({p.votesFor.toLocaleString()})</span>
                                    <span className="text-red-400">{againstPercentage}% AGAINST ({p.votesAgainst.toLocaleString()})</span>
                                </div>
                            </div>
                            
                            {hasVoted ? (
                                <p className="text-center text-primary font-semibold">You have voted on this proposal.</p>
                            ) : (
                                <div className="flex justify-end gap-4">
                                    <button onClick={() => handleVote(p.id, 'against')} className="bg-red-500/20 hover:bg-red-500/40 text-red-400 font-semibold py-2 px-6 rounded-lg transition-colors duration-300">
                                        Vote Against
                                    </button>
                                     <button onClick={() => handleVote(p.id, 'for')} className="bg-green-500/20 hover:bg-green-500/40 text-green-400 font-semibold py-2 px-6 rounded-lg transition-colors duration-300">
                                        Vote For
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default DaoVotingDemo;