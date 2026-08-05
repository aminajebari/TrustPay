import Link from 'next/link';
import { Linkedin, Youtube, X, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#030712]/80 backdrop-blur-lg text-white py-8 sm:py-12 lg:py-16 border-t border-[#1A56DB]/20 relative overflow-hidden">
            {/* Animated gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#3B82F6] to-transparent animate-pulse" />

            {/* Gradient orbs */}
            <div className="absolute top-0 left-10 w-64 h-64 bg-[#1A56DB]/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 right-10 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-[95vw] lg:max-w-[75vw] mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group">
                            <div className="relative flex items-center gap-2">
                                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                                    TrustPay
                                </span>
                                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full flex items-center justify-center shadow-lg shadow-white/20 group-hover:scale-110 transition-all duration-300">
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs sm:text-sm">Type. Pay. Trust.</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                            Manage your decentralized payroll with natural language. Just chat with your AI assistant and watch magic happen on-chain.
                        </p>
                        <div className="flex gap-3 sm:gap-4">
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#1A56DB] hover:to-[#3B82F6] transition-all duration-300 transform hover:scale-110 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-[#1A56DB] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white relative z-10 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-linear-to-r from-[#1A56DB] to-[#3B82F6] blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                            </a>
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#1A56DB] hover:to-[#3B82F6] transition-all duration-300 transform hover:scale-110 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-[#1A56DB] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white relative z-10 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-linear-to-r from-[#1A56DB] to-[#3B82F6] blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                            </a>
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#1A56DB] hover:to-[#3B82F6] transition-all duration-300 transform hover:scale-110 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-[#1A56DB] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-white relative z-10 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-linear-to-r from-[#1A56DB] to-[#3B82F6] blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Learn</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="group text-sm sm:text-base text-slate-400 hover:text-[#60A5FA] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#3B82F6] group-hover:w-2 transition-all duration-300" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/docs" className="group text-sm sm:text-base text-slate-400 hover:text-[#60A5FA] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#3B82F6] group-hover:w-2 transition-all duration-300" />
                                    Docs
                                </Link>
                            </li>
                            <li>
                                <Link href="/playground" className="group text-sm sm:text-base text-slate-400 hover:text-[#60A5FA] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#3B82F6] group-hover:w-2 transition-all duration-300" />
                                    Playground
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-2">
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/features" className="group text-sm sm:text-base text-slate-400 hover:text-[#60A5FA] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#3B82F6] group-hover:w-2 transition-all duration-300" />
                                    Features
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6 sm:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs sm:text-sm gap-3 sm:gap-0">
                        <div className="text-center md:text-left flex items-center gap-2">
                            <span>© {new Date().getFullYear()} TrustPay. All rights reserved.</span>
                            <span className="hidden sm:inline">•</span>
                        </div>
                        <div className="flex gap-4 sm:gap-6">
                            <Link href="/privacy" className="hover:text-[#60A5FA] transition-colors duration-300 relative group">
                                Privacy Policy
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#3B82F6] group-hover:w-full transition-all duration-300" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </footer>
    );
};

export default Footer;