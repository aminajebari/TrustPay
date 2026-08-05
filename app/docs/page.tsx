'use client';

import React, { useState } from 'react';
import {
    ChevronDown, Zap, BookOpen, CheckCircle, AlertCircle, Users, DollarSign, TrendingUp
} from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

type SectionId = 'intro' | 'quickstart' | 'workflow';

interface ExpandedSections {
    intro: boolean;
    quickstart: boolean;
    workflow: boolean;
}

interface FeatureCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

interface SectionProps {
    id: SectionId;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
    <div className="group p-6 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#1A56DB]/20 rounded-2xl backdrop-blur-sm hover:border-[#1A56DB]/60 transition-all duration-500 relative overflow-hidden">
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-linear-to-br from-[#1A56DB] to-[#3B82F6] rounded-lg flex items-center justify-center shadow-lg shadow-[#1A56DB]/50">
                    <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
            <p className="text-slate-400 text-sm">{description}</p>
        </div>
    </div>
);

const Section: React.FC<SectionProps> = ({ id, title, icon: Icon, children }) => {
    const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
        intro: true,
        quickstart: true,
        workflow: true,
    });

    const toggleSection = (sectionId: SectionId) => {
        setExpandedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    return (
        <div className="border-b border-slate-800/50">
            <button
                onClick={() => toggleSection(id)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/30 transition-all duration-300 group"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-[#1A56DB]/20 to-[#3B82F6]/20 rounded-lg flex items-center justify-center group-hover:from-[#1A56DB]/40 group-hover:to-[#3B82F6]/40 transition-all">
                        <Icon className="w-6 h-6 text-[#1A56DB]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-[#3B82F6] transition-colors">{title}</h2>
                </div>
                <ChevronDown
                    className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${expandedSections[id] ? 'rotate-180' : ''}`}
                />
            </button>

            {expandedSections[id] && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-800/30 bg-linear-to-b from-slate-900/20 to-transparent">
                    {children}
                </div>
            )}
        </div>
    );
};

const Page: React.FC = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#030712] via-[#0A1628] to-[#030712]">
            <Header />

            <main className="max-w-4xl mx-auto pb-20 px-6 pt-32">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">TrustPay Documentation</h1>
                    <p className="text-slate-400 text-lg">Everything you need to know to manage payroll with AI</p>
                </div>

                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                    
                    {/* Introduction Section */}
                    <Section id="intro" title="What is TrustPay?" icon={BookOpen}>
                        <div className="space-y-4 text-slate-300">
                            <p>
                                <strong className="text-[#60A5FA]">TrustPay</strong> makes Web3 payroll as simple as sending a text message. Instead of clicking through complex dashboards, you just chat with our AI assistant to manage organizations, workers, and salary payments directly on the Solana blockchain.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 mt-6">
                                <FeatureCard icon={Users} title="Manage Teams" description="Easily add workers and set their individual salaries." />
                                <FeatureCard icon={DollarSign} title="Fund Treasury" description="Deposit SOL to your organization's secure smart contract." />
                                <FeatureCard icon={TrendingUp} title="Pay Instantly" description="Ask the AI to run payroll, and everyone gets paid in seconds." />
                            </div>
                        </div>
                    </Section>

                    {/* How to use the AI Section */}
                    <Section id="quickstart" title="How to talk to the AI" icon={Zap}>
                        <div className="space-y-6">
                            <div className="p-4 bg-orange-900/20 border border-orange-500/30 rounded-xl">
                                <div className="flex gap-3">
                                    <AlertCircle className="w-6 h-6 text-orange-400 shrink-0" />
                                    <div>
                                        <h3 className="font-bold text-orange-300">You'll need a Groq API Key</h3>
                                        <p className="text-slate-300 text-sm mt-1">
                                            TrustPay uses your own API key to ensure privacy. You can create one at <a href="https://console.groq.com/keys" target="_blank" rel="noopener" className="text-[#3B82F6] underline">console.groq.com/keys</a>. Just paste it when the chat asks for it.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-300">You don't need to learn any complex commands. Just speak naturally! Here are some examples of what you can ask:</p>
                            
                            <div className="overflow-hidden rounded-xl border border-slate-700">
                                <table className="w-full text-sm text-left text-slate-300">
                                    <thead className="bg-slate-800/70 text-slate-200">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold">If you want to...</th>
                                            <th className="px-6 py-3 font-semibold">Just type this</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700 bg-slate-800/20">
                                        <tr className="hover:bg-slate-800/50"><td className="px-6 py-4">See your organizations</td><td className="px-6 py-4 font-mono text-[#60A5FA]">"Show my organizations"</td></tr>
                                        <tr className="hover:bg-slate-800/50"><td className="px-6 py-4">Create a new company</td><td className="px-6 py-4 font-mono text-[#60A5FA]">"Create an organization called Tesla"</td></tr>
                                        <tr className="hover:bg-slate-800/50"><td className="px-6 py-4">Hire a worker</td><td className="px-6 py-4 font-mono text-[#60A5FA]">"Add worker 7yQ... to Tesla with a salary of 2.5 SOL"</td></tr>
                                        <tr className="hover:bg-slate-800/50"><td className="px-6 py-4">Deposit funds</td><td className="px-6 py-4 font-mono text-[#60A5FA]">"Fund Tesla's treasury with 50 SOL"</td></tr>
                                        <tr className="hover:bg-slate-800/50"><td className="px-6 py-4">Run payroll</td><td className="px-6 py-4 font-mono text-[#60A5FA]">"Process payroll for Tesla"</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Section>

                    {/* Workflow Section */}
                    <Section id="workflow" title="The 4-Step Workflow" icon={CheckCircle}>
                        <div className="space-y-4">
                            <p className="text-slate-300 mb-6">Follow these simple steps to get your first payroll running:</p>
                            
                            {[
                                { step: 1, title: 'Connect Your Wallet', desc: 'Click the "Select Wallet" button in the top right to connect your Solana wallet (like Phantom).' },
                                { step: 2, title: 'Create an Organization', desc: 'Open the chat and ask the AI to create a new organization.' },
                                { step: 3, title: 'Add Workers & Funds', desc: 'Tell the AI to add team members (you need their wallet address) and fund the treasury so you have money to pay them.' },
                                { step: 4, title: 'Process Payroll', desc: 'Simply ask the AI to "process payroll" and it will automatically pay everyone their set salary from the treasury!' },
                            ].map((item) => (
                                <div key={item.step} className="flex gap-4 p-5 bg-slate-800/30 rounded-xl border border-slate-700/50">
                                    <div className="w-8 h-8 bg-linear-to-br from-[#1A56DB] to-[#3B82F6] rounded-full flex items-center justify-center shrink-0 text-white font-bold">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                        <p className="text-slate-400 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Page;
