import React, { useState, useEffect } from 'react';
import { SparklesIcon } from '../Icons';

type MintingStep = 'initial' | 'uploading' | 'minting' | 'success';

const MintNFTDemo: React.FC = () => {
    const [step, setStep] = useState<MintingStep>('initial');
    const [image, setImage] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (step === 'uploading') {
            const timer = setTimeout(() => setStep('minting'), 1500);
            return () => clearTimeout(timer);
        }
        if (step === 'minting') {
            const timer = setTimeout(() => setStep('success'), 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    const handleMint = (e: React.FormEvent) => {
        e.preventDefault();
        if (!image || !title || !description) return;
        setStep('uploading');
    };

    const handleReset = () => {
        setStep('initial');
        setImage(null);
        setTitle('');
        setDescription('');
    }

    const renderContent = () => {
        switch(step) {
            case 'initial':
                return (
                    <form onSubmit={handleMint} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Artwork</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    {image ? (
                                        <img src={image} alt="Preview" className="mx-auto h-24 w-24 object-cover rounded-md"/>
                                    ) : (
                                        <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    <div className="flex text-sm text-gray-500">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-card rounded-md font-medium text-primary hover:text-blue-400 focus-within:outline-none">
                                            <span>{image ? 'Change file' : 'Upload a file'}</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" required/>
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                         <div>
                            <label htmlFor="nft-title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                            <input type="text" id="nft-title" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g., 'Sunrise Over The Ocean'" className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"/>
                        </div>
                        <div>
                            <label htmlFor="nft-description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                            <textarea id="nft-description" value={description} onChange={e => setDescription(e.target.value)} rows={3} required placeholder="A brief description of your artwork." className="w-full bg-background border border-gray-600 rounded-md py-2 px-3 text-light focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
                        </div>
                         <div>
                            <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                                Mint NFT (Simulate)
                            </button>
                        </div>
                    </form>
                );
            case 'uploading':
            case 'minting':
                return (
                    <div className="text-center py-12">
                         <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                         <h3 className="text-2xl font-bold mb-2">{step === 'uploading' ? 'Uploading to IPFS...' : 'Minting on the Blockchain...'}</h3>
                         <p className="text-gray-400">{step === 'uploading' ? 'Your artwork is being securely uploaded to the InterPlanetary File System.' : 'Your transaction is being confirmed on the (simulated) Ethereum network. This may take a moment.'}</p>
                    </div>
                );
            case 'success':
                 return (
                    <div className="text-center py-8">
                         <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Mint Successful!</h3>
                        <p className="text-gray-400 mb-6">Congratulations! You've successfully minted your NFT.</p>
                        <div className="bg-background rounded-lg p-4 max-w-sm mx-auto">
                            <img src={image!} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
                            <h4 className="text-lg font-bold">{title}</h4>
                            <p className="text-sm text-gray-400">{description}</p>
                        </div>
                        <button onClick={handleReset} className="mt-8 bg-primary hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300">
                            Mint Another
                        </button>
                    </div>
                );
        }
    }

    return (
        <div>
            <div className="text-center border-b border-card pb-6 mb-6">
                 <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-full mx-auto mb-4">
                    <SparklesIcon />
                 </div>
                <h2 className="text-2xl font-bold mb-2">Interactive Demo: NFT Minting</h2>
                <p className="max-w-xl mx-auto text-gray-400">This simulation walks you through the steps of creating and minting an NFT. No real cryptocurrency or wallet is needed.</p>
            </div>
            {renderContent()}
        </div>
    );
};

export default MintNFTDemo;