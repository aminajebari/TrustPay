"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Key, EyeOff, Lock, Mail, CheckCircle } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-[#030712] via-[#0A1628] to-[#030712] relative overflow-hidden">
            <Header />

            {/* Gradient Orbs */}
            <div className="absolute top-40 left-10 w-96 h-96 bg-[#1A56DB]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-[120px] animate-pulse delay-1000" />

            {/* Hero */}
            <section className="relative z-10 pt-40 pb-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-linear-to-br from-[#1A56DB] to-[#3B82F6] rounded-2xl flex items-center justify-center shadow-lg shadow-[#1A56DB]/30">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-slate-300 max-w-xl mx-auto">
                        At TrustPay, privacy isn't just a promise — it's built into our architecture.
                    </p>
                </div>
            </section>

            {/* Sections */}
            <section className="relative z-10 pb-24 px-6">
                <div className="max-w-3xl mx-auto space-y-8">
                    
                    {/* Groq Key Handling */}
                    <div className="p-8 bg-slate-900/50 rounded-2xl border border-[#1A56DB]/20 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <Key className="w-6 h-6 text-[#3B82F6]" />
                            <h2 className="text-2xl font-bold text-white">Your Groq Key</h2>
                        </div>
                        <p className="text-slate-300 mb-4">
                            We <strong className="text-[#60A5FA]">never</strong> store your Groq API key.
                        </p>
                        <ul className="space-y-3 text-slate-400">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#3B82F6]" />
                                Kept only in your browser's temporary memory
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#3B82F6]" />
                                Instantly deleted when you close or refresh the page
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#3B82F6]" />
                                No servers, no databases, no third parties
                            </li>
                        </ul>
                    </div>

                    {/* Data Collection */}
                    <div className="p-8 bg-slate-900/50 rounded-2xl border border-[#1A56DB]/20 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <EyeOff className="w-6 h-6 text-[#3B82F6]" />
                            <h2 className="text-2xl font-bold text-white">Data Collection</h2>
                        </div>
                        <p className="text-slate-300 mb-4">
                            We collect virtually nothing by design.
                        </p>
                        <ul className="space-y-3 text-slate-400">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#3B82F6]" />
                                <strong>Wallet Address:</strong> Used temporarily to sign transactions. Never stored.
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#3B82F6]" />
                                <strong>Chat Messages:</strong> Saved locally in your browser to keep conversation history.
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-[#3B82F6]" />
                                <strong>On-Chain Data:</strong> Salaries and payments are public on the Solana blockchain.
                            </li>
                            <li className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-[#3B82F6]" />
                                <strong>Analytics:</strong> We use zero tracking cookies or analytics tools.
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="p-8 bg-slate-900/50 rounded-2xl border border-[#1A56DB]/20 backdrop-blur-sm text-center">
                        <Mail className="w-8 h-8 text-[#3B82F6] mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Questions?</h2>
                        <p className="text-slate-400">
                            Reach out anytime at <a href="mailto:dummy.email@gmail.com" className="text-[#60A5FA] hover:text-white underline transition-colors">dummy.email@gmail.com</a>
                        </p>
                    </div>

                </div>
            </section>

            <Footer />
        </div>
    );
}
