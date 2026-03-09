"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Key, Brain, Wallet, Globe, Database, EyeOff, Zap, Lock, Mail, Clock, Check } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';

export default function PrivacyPage() {
    const sections = [
        {
            icon: Shield,
            title: '1. Our Core Privacy Principle',
            color: 'text-[#DC1FFF]',
            bgColor: 'from-[#DC1FFF]/10 to-[#DC1FFF]/5',
            content: (
                <div className="space-y-4 text-slate-300">
                    <p className="leading-relaxed">
                        DappPay is built from the ground up with privacy as a non-negotiable feature — not an afterthought.
                    </p>
                    <p className="text-lg font-medium bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent">
                        We do not store your OpenAI API key. Ever.
                    </p>
                    <p className="leading-relaxed">
                        Your key exists only in your browser’s memory while you use the app and is permanently deleted the moment you close or refresh the page.
                        No server logs it. No database touches it. No third party sees it.
                    </p>
                </div>
            )
        },
        {
            icon: Key,
            title: '2. OpenAI API Key Handling (Your Key = Your Control)',
            color: 'text-[#00FFA3]',
            bgColor: 'from-[#00FFA3]/10 to-[#00FFA3]/5',
            content: (
                <ul className="space-y-4 text-slate-400">
                    <li className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-xl border border-[#00FFA3]/20">
                        <EyeOff className="w-6 h-6 text-[#00FFA3] shrink-0 mt-1" />
                        <div>
                            <strong className="text-white">Never stored on our servers</strong>
                            <p className="text-sm mt-1">Your OpenAI key is kept only in your browser’s runtime memory.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-xl border border-[#00FFA3]/20">
                        <Zap className="w-6 h-6 text-[#00FFA3] shrink-0 mt-1" />
                        <div>
                            <strong className="text-white">Deleted on page leave</strong>
                            <p className="text-sm mt-1">Close tab → refresh → navigate away → key is instantly wiped.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-xl border border-[#00FFA3]/20">
                        <Lock className="w-6 h-6 text-[#00FFA3] shrink-0 mt-1" />
                        <div>
                            <strong className="text-white">You control costs & usage</strong>
                            <p className="text-sm mt-1">All AI requests are billed directly to your OpenAI account — we never proxy or intercept them.</p>
                        </div>
                    </li>
                </ul>
            )
        },
        {
            icon: Database,
            title: '3. What We Actually Collect',
            color: 'text-[#03E1FF]',
            bgColor: 'from-[#03E1FF]/10 to-[#03E1FF]/5',
            content: (
                <>
                    <p className="text-slate-400 mb-6">Extremely little — by design:</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-700">
                            <Wallet className="w-8 h-8 text-[#03E1FF] mb-3" />
                            <h4 className="font-semibold text-white">Wallet Address</h4>
                            <p className="text-sm text-slate-400">Only used temporarily for signing transactions. Never stored.</p>
                        </div>
                        <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-700">
                            <Brain className="w-8 h-8 text-[#03E1FF] mb-3" />
                            <p className="font-semibold text-white">Chat Messages</p>
                            <p className="text-sm text-slate-400">Kept only in your browser (localStorage) for conversation continuity during your session.</p>
                        </div>
                        <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-700">
                            <Globe className="w-8 h-8 text-[#03E1FF] mb-3" />
                            <p className="font-semibold text-white">On-Chain Data</p>
                            <p className="text-sm text-slate-400">Organizations, workers, salaries, payments — all public on Solana by nature of blockchain.</p>
                        </div>
                        <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-700">
                            <EyeOff className="w-8 h-8 text-[#03E1FF] mb-3" />
                            <p className="font-semibold text-white">No Analytics / Tracking</p>
                            <p className="text-sm text-slate-400">We do not use Google Analytics, Mixpanel, or any third-party trackers.</p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                        <Shield className="w-4 h-4 inline mr-2 text-[#00FFA3]" />
                        Bottom line: If it’s not on Solana and not in your browser right now — we don’t have it.
                    </p>
                </>
            )
        },
        {
            icon: Lock,
            title: '4. Data Security & Blockchain Transparency',
            color: 'text-[#DC1FFF]',
            bgColor: 'from-[#DC1FFF]/10 to-[#DC1FFF]/5',
            content: (
                <div className="space-y-4 text-slate-400">
                    <p>All off-chain interactions happen entirely in your browser.</p>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-[#00FFA3]" />
                            <span>Private keys never leave your wallet</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-[#00FFA3]" />
                            <span>All transactions are signed client-side</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-[#00FFA3]" />
                            <span>On-chain data is public and immutable (Solana blockchain)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-[#00FFA3]" />
                            <span>No backend database containing user data exists</span>
                        </li>
                    </ul>
                </div>
            )
        },
        {
            icon: Mail,
            title: '5. Your Rights & Contact',
            color: 'text-[#00FFA3]',
            bgColor: 'from-[#00FFA3]/10 to-[#00FFA3]/5',
            content: (
                <div className="text-slate-400 space-y-4">
                    <p>Since we don’t store personal data, there’s nothing to delete or export.</p>
                    <p>Want everything gone? Just:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Clear your browser cache / localStorage</li>
                        <li>Revoke your OpenAI key at platform.openai.com</li>
                        <li>Forget this tab existed</li>
                    </ul>
                    <p className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-[#00FFA3]/30">
                        Questions? Reach out anytime: <a href="mailto:contact@dappmentors.org" className="text-[#00FFA3] hover:text-white underline">contact@dappmentors.org</a>
                    </p>
                </div>
            )
        },
        {
            icon: Clock,
            title: '6. Changes to This Policy',
            color: 'text-[#03E1FF]',
            bgColor: 'from-[#03E1FF]/10 to-[#03E1FF]/5',
            content: (
                <p className="text-slate-400">
                    This policy was last updated on <strong>November 20, 2025</strong>. We’ll notify users of material changes via the app and GitHub.
                </p>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black relative overflow-hidden">
            <Header />

            <ParticleBackground />

            {/* Gradient Orbs */}
            <div className="absolute top-40 left-10 w-96 h-96 bg-[#DC1FFF]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-[#00FFA3]/20 rounded-full blur-[120px] animate-pulse delay-1000" />

            {/* Hero */}
            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#DC1FFF]/50">
                            <Shield className="w-12 h-12 text-black" />
                        </div>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Your OpenAI key never touches our servers. Your wallet stays yours. Your data stays on-chain or in your browser — nowhere else.
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-6 text-slate-400">
                        <Clock className="w-5 h-5" />
                        <span>Last updated: November 20, 2025</span>
                    </div>
                </div>
            </section>

            {/* Sections */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    {sections.map((section, i) => (
                        <div
                            key={i}
                            className="group p-8 bg-linear-to-br from-slate-900/60 to-slate-800/40 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-[#DC1FFF]/50 transition-all duration-500"
                        >
                            <div className="flex items-start gap-5 mb-6">
                                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${section.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <section.icon className={`w-8 h-8 ${section.color}`} />
                                </div>
                                <h2 className={`text-3xl font-bold ${section.color} group-hover:scale-105 transition-transform origin-left`}>
                                    {section.title}
                                </h2>
                            </div>
                            <div className="ml-0 lg:ml-20">
                                {section.content}
                            </div>
                        </div>
                    ))}

                    <div className="text-center pt-12">
                        <p className="text-2xl font-bold bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent">
                            Privacy isn’t a feature. It’s the foundation.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}