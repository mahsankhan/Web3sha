import React, { useState, useEffect } from 'react';
import { Course, View } from '../types';
import { ArrowLeftIcon, CertificateIcon } from './Icons';
import NextSteps from './NextSteps';

type ExperienceStep = 'learning' | 'claiming' | 'minting' | 'success';
type MintingSubStep = 'preparing' | 'deploying' | 'confirming';

const mintingSteps: Record<MintingSubStep, string> = {
    preparing: "Preparing certificate metadata...",
    deploying: "Deploying to simulated blockchain...",
    confirming: "Confirming transaction on-chain...",
};

interface FreeCourseExperienceProps {
    course: Course;
    onExit: () => void;
    setView: (view: View) => void;
    courses: Course[];
}

const FreeCourseExperience: React.FC<FreeCourseExperienceProps> = ({ course, onExit, setView, courses }) => {
    const [step, setStep] = useState<ExperienceStep>('learning');
    const [name, setName] = useState('');
    const [mintingSubStep, setMintingSubStep] = useState<MintingSubStep>('preparing');
    const [transactionHash, setTransactionHash] = useState('');

    useEffect(() => {
        if (step === 'minting') {
            const hash = `0x${[...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`;
            setTransactionHash(hash);

            const timer1 = setTimeout(() => setMintingSubStep('deploying'), 1500);
            const timer2 = setTimeout(() => setMintingSubStep('confirming'), 3500);
            const timer3 = setTimeout(() => setStep('success'), 5500);
            
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [step]);
    
    const handleClaim = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('minting');
    };

    const renderLearning = () => (
        <>
            <div className="bg-background/50 p-8 lg:p-10 border-t border-gray-700">
                <h3 className="text-2xl font-bold mb-6">Course Modules</h3>
                <div className="space-y-4">
                    {course.modules.map((module, index) => (
                        <div key={index} className="bg-card/60 p-4 rounded-lg flex items-start gap-4">
                            <div className="w-8 h-8 flex-shrink-0 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">{index + 1}</div>
                            <div>
                                <h4 className="font-semibold text-light">{module.title}</h4>
                                <p className="text-sm text-gray-400">{module.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-8 text-center">
                 <button onClick={() => setStep('claiming')} className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 text-lg">
                    Complete Course & Claim Certificate
                </button>
            </div>
        </>
    );

    const renderClaiming = () => (
        <div className="p-8 lg:p-12 text-center">
            <CertificateIcon />
            <h3 className="text-2xl font-bold mb-4 mt-4">Claim Your Certificate</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">Enter your name as you would like it to appear on your blockchain-verified certificate of completion.</p>
            <form onSubmit={handleClaim} className="max-w-sm mx-auto flex flex-col gap-4">
                <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g., Jane Doe"
                    required
                    className="w-full text-center bg-background border border-gray-600 rounded-md py-3 px-4 text-light focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button type="submit" className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                    Mint My Certificate
                </button>
                <button type="button" onClick={() => setStep('learning')} className="text-sm text-gray-500 hover:text-gray-300">Back to course</button>
            </form>
        </div>
    );
    
    const renderMinting = () => (
        <div className="p-8 lg:p-12 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-2xl font-bold mb-2">Issuing Certificate...</h3>
            <p className="text-gray-400">{mintingSteps[mintingSubStep]}</p>
        </div>
    );

    const renderSuccess = () => (
        <div className="p-8 lg:p-12 text-center">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CertificateIcon />
            </div>
            <h3 className="text-3xl font-bold mb-2">Congratulations, {name}!</h3>
            <p className="text-gray-400 mb-8">You have successfully earned your Certificate of Completion.</p>

            <div className="bg-background rounded-lg p-6 max-w-lg mx-auto text-left border border-primary/30 shadow-lg">
                <h4 className="font-bold text-lg text-primary">Certificate of Completion</h4>
                <p className="text-gray-300 mb-4">This certifies that</p>
                <p className="text-2xl font-bold text-light mb-4">{name}</p>
                <p className="text-gray-300">has successfully completed the course</p>
                <p className="font-semibold text-light mb-6">{course.title}</p>
                <p className="text-xs text-gray-500">Simulated Transaction Hash:</p>
                <p className="text-xs text-green-400 break-all font-mono">{transactionHash}</p>
            </div>
            
            <div className="mt-12">
                 <NextSteps setView={setView} courses={courses} currentCourse={course} />
            </div>

            <button onClick={onExit} className="mt-8 text-sm text-gray-400 hover:text-primary">
                Or, return to all courses
            </button>
        </div>
    );


    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
             <div className="mb-8">
                <button
                    onClick={onExit}
                    className="flex items-center gap-2 text-gray-300 hover:text-primary font-semibold transition-colors duration-300"
                >
                    <ArrowLeftIcon />
                    Exit Course
                </button>
            </div>
            <div className="bg-card rounded-lg shadow-lg">
                 <div className="p-8 text-center">
                    <h1 className="text-3xl font-bold text-light">{course.title}</h1>
                    <p className="text-gray-400">{course.subtitle}</p>
                </div>
                {step === 'learning' && renderLearning()}
                {step === 'claiming' && renderClaiming()}
                {step === 'minting' && renderMinting()}
                {step === 'success' && renderSuccess()}
            </div>
        </div>
    );
};

export default FreeCourseExperience;