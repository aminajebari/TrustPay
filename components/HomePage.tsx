import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { ChevronRight, Sparkles, Shield, Zap, Cpu, Lock, TrendingUp } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';



const HomePage = () => {
    const { setVisible } = useWalletModal();
    const { connected, publicKey } = useWallet();
    const router = useRouter();

    // Navigate to dashboard when we detect a successful connection
    useEffect(() => {
        if (connected && publicKey) {
            router.push('/dashboard');
        }
    }, [connected, publicKey, router]);

    const handleLaunchDashboard = useCallback(async () => {
        if (connected) {
            // Already connected → go straight to dashboard
            router.push('/dashboard');
            return;
        }

        // Not connected → show the wallet modal
        setVisible(true);
    }, [connected, setVisible, router /* , connect */]);

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black relative overflow-hidden">
            <Header />

            {/* Particle Background */}
            <ParticleBackground />

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#DC1FFF]/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FFA3]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#03E1FF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Hero Section */}
            <main className="relative z-10 pb-20 px-6 pt-32">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#DC1FFF]/10 to-[#00FFA3]/10 border border-[#DC1FFF]/20 rounded-full mb-6 backdrop-blur-sm hover:border-[#00FFA3]/40 transition-all duration-300 group cursor-pointer">
                            <Sparkles className="w-4 h-4 text-[#DC1FFF] group-hover:animate-spin" />
                            <span className="text-sm bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent font-medium">
                                AI-Powered Payroll on Solana
                            </span>
                            <div className="w-2 h-2 rounded-full bg-[#00FFA3] animate-pulse" />
                        </div>

                        {/* Main Heading with animated gradient */}
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                            <span className="inline-block bg-linear-to-r from-[#DC1FFF] via-[#00FFA3] to-[#03E1FF] bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
                                Payroll Made
                            </span>
                            <br />
                            <span className="text-white drop-shadow-[0_0_30px_rgba(220,31,255,0.3)]">
                                Simple & Smart
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-slate-400 mb-12 leading-relaxed animate-fade-in">
                            Manage your decentralized payroll with natural language.
                            <br />
                            <span className="text-[#00FFA3]">Just chat</span> with your AI assistant and watch magic happen on-chain.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={handleLaunchDashboard}
                                className="group relative px-8 py-4 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
                            >
                                {/* Animated shine effect */}
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                                <span className="relative flex items-center justify-center gap-2 text-black">
                                    Launch Dashboard
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>

                                {/* Glow effect */}
                                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                            </button>

                            <a href="/features">
                                <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800/80 text-white rounded-xl font-semibold text-lg transition-all duration-300 border border-slate-700 hover:border-[#00FFA3]/50 backdrop-blur-sm group">
                                    <span className="flex items-center justify-center gap-2">
                                        Learn More
                                        <Cpu className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                    </span>
                                </button>
                            </a>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mt-24">
                        {/* Feature 1 */}
                        <div className="group p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-sm hover:border-[#DC1FFF]/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#DC1FFF]/20 relative overflow-hidden">
                            {/* Hover gradient effect */}
                            <div className="absolute inset-0 bg-linear-to-br from-[#DC1FFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#DC1FFF]/50">
                                    <Sparkles className="w-6 h-6 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#DC1FFF] transition-colors duration-300">
                                    AI-Powered
                                </h3>
                                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                    Control your payroll with natural language. No complex interfaces, just chat.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#03E1FF]/20 rounded-2xl backdrop-blur-sm hover:border-[#03E1FF]/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#03E1FF]/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-br from-[#03E1FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-linear-to-br from-[#03E1FF] to-[#00FFA3] rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#03E1FF]/50">
                                    <Shield className="w-6 h-6 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#03E1FF] transition-colors duration-300">
                                    Secure & Decentralized
                                </h3>
                                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                    Built on Solana blockchain. Your funds, your control, always transparent.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#00FFA3]/20 rounded-2xl backdrop-blur-sm hover:border-[#00FFA3]/60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00FFA3]/20 relative overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-br from-[#00FFA3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-linear-to-br from-[#00FFA3] to-[#03E1FF] rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-[#00FFA3]/50">
                                    <Zap className="w-6 h-6 text-black" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00FFA3] transition-colors duration-300">
                                    Lightning Fast
                                </h3>
                                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                    Process payments in seconds with Solana&apos;s high-performance network.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
                        <div className="text-center p-6 bg-slate-900/30 border border-slate-800 rounded-xl backdrop-blur-sm hover:border-[#DC1FFF]/30 transition-all duration-300">
                            <div className="text-3xl font-bold bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent mb-2">
                                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-[#00FFA3]" />
                                99.9%
                            </div>
                            <p className="text-slate-400 text-sm">Uptime</p>
                        </div>
                        <div className="text-center p-6 bg-slate-900/30 border border-slate-800 rounded-xl backdrop-blur-sm hover:border-[#03E1FF]/30 transition-all duration-300">
                            <div className="text-3xl font-bold bg-linear-to-r from-[#03E1FF] to-[#00FFA3] bg-clip-text text-transparent mb-2">
                                <Zap className="w-8 h-8 mx-auto mb-2 text-[#03E1FF]" />
                                &lt;1s
                            </div>
                            <p className="text-slate-400 text-sm">Transaction Time</p>
                        </div>
                        <div className="text-center p-6 bg-slate-900/30 border border-slate-800 rounded-xl backdrop-blur-sm hover:border-[#00FFA3]/30 transition-all duration-300">
                            <div className="text-3xl font-bold bg-linear-to-r from-[#00FFA3] to-[#DC1FFF] bg-clip-text text-transparent mb-2">
                                <Lock className="w-8 h-8 mx-auto mb-2 text-[#00FFA3]" />
                                100%
                            </div>
                            <p className="text-slate-400 text-sm">Secure</p>
                        </div>
                    </div>
                </div>
            </main>

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
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
            `}</style>
        </div>
    );
};

export default HomePage;