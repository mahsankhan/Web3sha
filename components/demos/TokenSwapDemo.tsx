import React, { useState, useMemo } from 'react';
import { SparklesIcon } from '../Icons';

const TOKENS = {
    ETH: { name: 'Ethereum', symbol: 'ETH', logo: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c2566b/svg/color/eth.svg' },
    W3S: { name: 'Web3 Strategy Token', symbol: 'W3S', logo: 'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/cubes.svg' },
    USDC: { name: 'USD Coin', symbol: 'USDC', logo: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c2566b/svg/color/usdc.svg' },
};

const MOCK_PRICES = {
    ETH: 3500,
    W3S: 5.25,
    USDC: 1,
};

const TokenSwapDemo: React.FC = () => {
    const [fromToken, setFromToken] = useState('ETH');
    const [toToken, setToToken] = useState('W3S');
    const [fromAmount, setFromAmount] = useState('1');
    const [isSwapping, setIsSwapping] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const toAmount = useMemo(() => {
        const fromPrice = MOCK_PRICES[fromToken as keyof typeof MOCK_PRICES];
        const toPrice = MOCK_PRICES[toToken as keyof typeof MOCK_PRICES];
        const amount = parseFloat(fromAmount);
        if (isNaN(amount) || fromPrice === 0 || toPrice === 0) return '0.00';
        return ((amount * fromPrice) / toPrice).toFixed(4);
    }, [fromToken, toToken, fromAmount]);
    
    const handleSwap = () => {
        if (parseFloat(fromAmount) <= 0) return;
        setIsSwapping(true);
        setTimeout(() => {
            setIsSwapping(false);
            setIsSuccess(true);
        }, 2000);
    };
    
    const handleReset = () => {
        setIsSuccess(false);
        setFromAmount('1');
    };
    
    if (isSuccess) {
        return (
             <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Swap Successful!</h3>
                <p className="text-gray-400 mb-6">You swapped {fromAmount} {fromToken} for {toAmount} {toToken}.</p>
                <button onClick={handleReset} className="mt-2 bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300">
                    Perform Another Swap
                </button>
            </div>
        )
    }

    return (
        <div>
            <div className="text-center border-b border-card pb-6 mb-6">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mx-auto mb-4">
                    <SparklesIcon />
                </div>
                <h2 className="text-2xl font-bold mb-2">Interactive Demo: Token Swap</h2>
                <p className="max-w-xl mx-auto text-gray-400">Experience a core DeFi function. This simulation lets you swap between tokens at mock market rates. No real assets are used.</p>
            </div>
            
            <div className="bg-background/50 rounded-lg p-6 space-y-4">
                 {/* From Token */}
                <div>
                    <label className="text-sm text-gray-400">You Pay</label>
                    <div className="flex items-center gap-4 bg-card p-3 rounded-lg">
                        <input 
                            type="number"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            className="w-full bg-transparent text-2xl font-bold text-light focus:outline-none"
                            placeholder="0.0"
                        />
                        <select value={fromToken} onChange={e => setFromToken(e.target.value)} className="bg-primary/20 text-primary font-semibold py-2 px-3 rounded-lg focus:outline-none">
                            {Object.keys(TOKENS).map(key => <option key={key} value={key}>{TOKENS[key as keyof typeof TOKENS].symbol}</option>)}
                        </select>
                    </div>
                </div>

                {/* To Token */}
                <div>
                    <label className="text-sm text-gray-400">You Receive (estimated)</label>
                    <div className="flex items-center gap-4 bg-card p-3 rounded-lg">
                       <input 
                            type="text"
                            value={toAmount}
                            readOnly
                            className="w-full bg-transparent text-2xl font-bold text-gray-400 focus:outline-none cursor-not-allowed"
                            placeholder="0.0"
                        />
                         <select value={toToken} onChange={e => setToToken(e.target.value)} className="bg-primary/20 text-primary font-semibold py-2 px-3 rounded-lg focus:outline-none">
                            {Object.keys(TOKENS).map(key => <option key={key} value={key}>{TOKENS[key as keyof typeof TOKENS].symbol}</option>)}
                        </select>
                    </div>
                </div>
            </div>
            
             <div className="mt-6">
                <button 
                    onClick={handleSwap} 
                    disabled={isSwapping || fromToken === toToken || parseFloat(fromAmount) <= 0}
                    className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSwapping && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                    {isSwapping ? 'Swapping...' : (fromToken === toToken ? 'Select different tokens' : 'Swap (Simulate)')}
                </button>
            </div>
        </div>
    );
};

export default TokenSwapDemo;