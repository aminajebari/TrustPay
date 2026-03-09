"use client";

import { Sparkles, Shield, Zap, Brain, Key, Clock, Lock, Bolt, MessageCircle, Database, Globe, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const features = [
        {
            icon: Brain,
            title: 'AI-Powered Commands',
            description: 'Chat with our AI assistant using natural language. Say "Pay team salaries" or "Add new employee" — no coding required.',
            color: 'from-[#DC1FFF] to-[#00FFA3]',
            borderColor: 'border-[#DC1FFF]/20 hover:border-[#DC1FFF]/60',
            shadowColor: 'hover:shadow-[#DC1FFF]/20',
            textColor: 'text-[#DC1FFF]',
            items: [
                { icon: MessageCircle, text: 'Intuitive conversations' },
                { icon: Sparkles, text: 'Smart automation' },
                { icon: Bolt, text: 'Instant processing' }
            ]
        },
        {
            icon: Lock,
            title: 'Secure & Decentralized',
            description: 'All transactions on Solana blockchain ensure transparency and immutability. Your data is yours — no central authority.',
            color: 'from-[#03E1FF] to-[#00FFA3]',
            borderColor: 'border-[#03E1FF]/20 hover:border-[#03E1FF]/60',
            shadowColor: 'hover:shadow-[#03E1FF]/20',
            textColor: 'text-[#03E1FF]',
            items: [
                { icon: Shield, text: 'End-to-end encryption' },
                { icon: Key, text: 'Wallet-based access' },
                { icon: Zap, text: 'Audit trails' }
            ]
        },
        {
            icon: Clock,
            title: 'Lightning Fast',
            description: 'Process payroll in under a second with Solana\'s high-throughput network. Low fees mean more savings for your team.',
            color: 'from-[#00FFA3] to-[#03E1FF]',
            borderColor: 'border-[#00FFA3]/20 hover:border-[#00FFA3]/60',
            shadowColor: 'hover:shadow-[#00FFA3]/20',
            textColor: 'text-[#00FFA3]',
            items: [
                { icon: Bolt, text: 'Sub-second confirmations' },
                { icon: Zap, text: 'Minimal gas fees' },
                { icon: Sparkles, text: 'Scalable for enterprises' }
            ]
        }
    ];

    const additionalFeatures = [
        { title: 'Multi-Organization Support', desc: 'Manage multiple companies or teams from one dashboard. Seamless switching between orgs.', icon: Database, delay: '0.1s' },
        { title: 'Real-Time Analytics', desc: 'Track payroll trends, expenses, and compliance with interactive charts and reports.', icon: TrendingUp, delay: '0.2s' },
        { title: 'Compliance Tools', desc: 'Built-in tax calculations and regulatory checks tailored for global teams.', icon: Shield, delay: '0.3s' },
        { title: 'API Integrations', desc: 'Connect with your existing HR, accounting, and crypto tools for a unified workflow.', icon: Globe, delay: '0.4s' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black relative overflow-hidden">
            <Header />
            <ParticleBackground />

            {/* Gradient Orbs */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-[#DC1FFF]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-40 left-10 w-96 h-96 bg-[#00FFA3]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#03E1FF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#DC1FFF]/10 to-[#00FFA3]/10 border border-[#DC1FFF]/20 rounded-full mb-6 backdrop-blur-sm hover:border-[#00FFA3]/40 transition-all duration-300 group cursor-pointer animate-fade-in">
                        <Sparkles className="w-4 h-4 text-[#DC1FFF] group-hover:animate-spin" />
                        <span className="text-sm bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent font-medium">
                            Discover Our Features
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
                        <span className="text-white drop-shadow-[0_0_30px_rgba(220,31,255,0.3)]">Powerful Tools for</span>
                        <br />
                        <span className="inline-block bg-linear-to-r from-[#DC1FFF] via-[#00FFA3] to-[#03E1FF] bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
                            Modern Payroll
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Explore how DappPay combines AI intelligence, Solana speed, and unbreakable security to transform your payroll process.
                    </p>
                </div>
            </section>

            {/* Main Features Grid */}
            <section className="relative z-10 py-20 px-6 bg-slate-900/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`group p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border ${feature.borderColor} rounded-2xl backdrop-blur-sm transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl ${feature.shadowColor} relative overflow-hidden animate-slide-up`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Hover gradient effect */}
                                <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className={`w-16 h-16 bg-linear-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                                        <feature.icon className="w-8 h-8 text-black" />
                                    </div>
                                    <h3 className={`text-2xl font-bold text-white mb-4 group-hover:${feature.textColor} transition-colors duration-300`}>
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors duration-300">
                                        {feature.description}
                                    </p>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        {feature.items.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 group/item">
                                                <div className="w-6 h-6 bg-slate-800/50 rounded flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                                                    <item.icon className="w-4 h-4 text-[#00FFA3]" />
                                                </div>
                                                <span className="group-hover/item:text-slate-200 transition-colors duration-300">{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Features */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4 animate-fade-in">Even More Features</h2>
                        <p className="text-slate-400 animate-fade-in" style={{ animationDelay: '0.1s' }}>Everything you need for modern payroll management</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {additionalFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#DC1FFF]/20 rounded-2xl hover:border-[#DC1FFF]/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#DC1FFF]/20 backdrop-blur-sm relative overflow-hidden animate-slide-up"
                                style={{ animationDelay: feature.delay }}
                            >
                                <div className="absolute inset-0 bg-linear-to-br from-[#DC1FFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10 flex items-start gap-4">
                                    <div className="w-12 h-12 bg-linear-to-br from-[#DC1FFF]/20 to-[#00FFA3]/20 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-6 h-6 text-[#DC1FFF]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2 text-white group-hover:text-[#00FFA3] transition-colors duration-300">
                                            {feature.title}
                                        </h4>
                                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" />
                        <div className="relative bg-linear-to-br from-slate-900/90 to-slate-800/90 rounded-2xl p-8 sm:p-12 border border-[#DC1FFF]/20 backdrop-blur-sm">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Ready to Transform Your Payroll?</h2>
                            <p className="text-slate-400 mb-8 text-lg">Join thousands of businesses already using DappPay</p>
                            <button onClick={() => router.push('/dashboard')} className="group/btn relative px-8 py-4 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                                <span className="relative flex items-center justify-center gap-2 text-black">
                                    Get Started Now
                                    <Sparkles className="w-5 h-5" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}