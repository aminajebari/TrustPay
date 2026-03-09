"use client";

import { Sparkles, Shield, Zap, Users, Award, Target, Heart, BookOpen, Code2, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
    const colors = {
        purple: "#DC1FFF",
        green: "#00FFA3",
        cyan: "#03E1FF",
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                        <Sparkles className="w-4 h-4" style={{ color: colors.purple }} />
                        <span className="text-sm font-medium">About DappPay & DappMentors</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span style={{ background: `linear-gradient(to right, ${colors.purple}, ${colors.cyan}, ${colors.green})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Empowering Web3
                        </span>
                        <br />
                        <span className="text-white">Through Innovation & Education</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Built by Darlington Gospel, founder of DappMentors—a trusted Blockchain & AI Academy with 9+ years of experience. DappPay represents a commitment to revolutionizing payroll on Solana while empowering the next generation of Web3 developers.
                    </p>
                </div>
            </section>

            {/* Who I Am */}
            <section className="py-20 px-6 bg-linear-to-b from-black to-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">Who I Am</h2>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <p className="text-lg text-gray-300 leading-relaxed">
                                I&apos;m Darlington Gospel, a seasoned blockchain developer, AI engineer, and educator with a vision: democratizing Web3 and making decentralized technologies accessible to everyone.
                            </p>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                With over 9 years in blockchain development, smart contract engineering, and technical education, I&apos;ve mentored hundreds through DappMentors and delivered innovative solutions across multiple ecosystems.
                            </p>
                            <ul className="space-y-4 pt-6">
                                {["Smart Contract Development & Auditing", "Full-Stack dApp Development", "Blockchain & AI Education", "Web3 Innovation & Strategy"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i % 2 === 0 ? colors.cyan : colors.green }} />
                                        <span className="text-gray-300">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { value: "9+", label: "Years Experience", color: colors.purple },
                                { value: "500+", label: "Developers Trained", color: colors.cyan },
                                { value: "50+", label: "Projects Completed", color: colors.green },
                                { value: "5K+", label: "Community Members", color: colors.purple },
                            ].map((stat) => (
                                <div key={stat.label} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center hover:border-white/20 transition-all">
                                    <div className="text-5xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</div>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* DappPay Mission */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.green})` }}>
                                <Target className="w-7 h-7 text-black" />
                            </div>
                            <h2 className="text-4xl font-bold">DappPay Mission</h2>
                        </div>

                        <p className="text-lg text-gray-400 leading-relaxed">
                            DappPay transforms payroll management by combining Solana&apos;s speed with AI-powered natural language processing. Chat with your AI assistant to manage payroll — no complex dashboards required.
                        </p>

                        <div className="space-y-5">
                            {[
                                { icon: Zap, text: "Instant payouts in seconds", color: colors.green },
                                { icon: Sparkles, text: "AI-driven natural language automation", color: colors.purple },
                                { icon: Shield, text: "Blockchain-secured transparency", color: colors.cyan },
                            ].map((item) => (
                                <div key={item.text} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.color + "20" }}>
                                        <item.icon className="w-6 h-6" style={{ color: item.color }} />
                                    </div>
                                    <span className="text-gray-300">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-1 md:order-2 flex justify-center">
                        <div className="p-10 rounded-3xl text-center text-black font-bold text-2xl" style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.cyan}, ${colors.green})` }}>
                            🚀 DappPay<br />Revolutionizing Payroll<br />on Solana
                        </div>
                    </div>
                </div>
            </section>

            {/* Offerings */}
            <section className="py-20 px-6 bg-linear-to-b from-black to-zinc-950">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">My Comprehensive Offerings</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: BookOpen, title: "Education", color: colors.purple },
                            { icon: Users, title: "Mentorship", color: colors.cyan },
                            { icon: Code2, title: "Development", color: colors.green },
                            { icon: TrendingUp, title: "Innovation", color: colors.purple },
                        ].map((item) => (
                            <div key={item.title} className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all group">
                                <div className="w-14 h-14 rounded-xl mb-6 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${item.color}, ${colors.green})` }}>
                                    <item.icon className="w-7 h-7 text-black" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-sm text-gray-400">
                                    {item.title === "Education" && "Premium courses & resources on Web3 & AI"}
                                    {item.title === "Mentorship" && "One-on-one guidance from experts"}
                                    {item.title === "Development" && "Smart contracts & full-stack dApps"}
                                    {item.title === "Innovation" && "Cutting-edge Web3 & AI solutions"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16">My Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Heart, title: "User-First", color: colors.purple },
                            { icon: Shield, title: "Security & Transparency", color: colors.cyan },
                            { icon: Award, title: "Continuous Innovation", color: colors.green },
                        ].map((value) => (
                            <div key={value.title} className="p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-white/20 transition-all group text-center">
                                <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${value.color}, ${colors.cyan})` }}>
                                    <value.icon className="w-10 h-10 text-black" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: value.color }}>{value.title}</h3>
                                <p className="text-gray-400">
                                    {value.title === "User-First" && "Every feature designed with simplicity and accessibility in mind."}
                                    {value.title === "Security & Transparency" && "Built on blockchain with cryptographic security and full transparency."}
                                    {value.title === "Continuous Innovation" && "Pushing boundaries to advance Web3 and AI adoption."}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-linear-to-b from-black to-zinc-950">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join the Web3 Revolution?</h2>
                    <p className="text-xl text-gray-400 mb-10">
                        Whether you want to revolutionize payroll with DappPay or level up with DappMentors — I&apos;m here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="px-10 py-4 rounded-xl font-bold text-black transition-all hover:scale-105" style={{ background: `linear-gradient(to right, ${colors.purple}, ${colors.cyan}, ${colors.green})` }}>
                            Start with DappPay
                        </button>
                        <button className="px-10 py-4 rounded-xl font-bold border-2 transition-all hover:scale-105" style={{ borderColor: colors.cyan, color: colors.cyan }}>
                            Learn with DappMentors
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}