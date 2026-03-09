import Link from 'next/link';
import { Linkedin, Youtube, X, Zap, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black/80 backdrop-blur-lg text-white py-8 sm:py-12 lg:py-16 border-t border-[#DC1FFF]/20 relative overflow-hidden">
            {/* Animated gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#DC1FFF] to-transparent animate-pulse" />

            {/* Gradient orbs */}
            <div className="absolute top-0 left-10 w-64 h-64 bg-[#DC1FFF]/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-0 right-10 w-64 h-64 bg-[#00FFA3]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-[95vw] lg:max-w-[75vw] mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {/* Brand Section */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group">
                            <div className="relative">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center shadow-lg shadow-[#DC1FFF]/50 group-hover:rotate-12 transition-all duration-300">
                                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                                </div>
                                <div className="absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                            </div>
                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-[#DC1FFF] via-[#00FFA3] to-[#DC1FFF] bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
                                    DappPay
                                </h3>
                                <p className="text-slate-400 text-xs sm:text-sm">AI-Powered Payroll on Solana</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                            Manage your decentralized payroll with natural language. Just chat with your AI assistant and watch magic happen on-chain.
                        </p>
                        <div className="flex gap-3 sm:gap-4">
                            <a
                                href="https://youtube.com/@dappmentors?sub_confirmation=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#DC1FFF] hover:to-[#00FFA3] transition-all duration-300 transform hover:scale-110 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-black relative z-10 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                            </a>
                            <a
                                href="https://linkedin.com/company/dappmentors"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#DC1FFF] hover:to-[#00FFA3] transition-all duration-300 transform hover:scale-110 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-black relative z-10 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                            </a>
                            <a
                                href="https://twitter.com/iDaltonic"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-9 h-9 sm:w-10 sm:h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-linear-to-r hover:from-[#DC1FFF] hover:to-[#00FFA3] transition-all duration-300 transform hover:scale-110 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-black relative z-10 transition-colors duration-300" />
                                <div className="absolute inset-0 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Learn</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="group text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#00FFA3] group-hover:w-2 transition-all duration-300" />
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/documentation" className="group text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#00FFA3] group-hover:w-2 transition-all duration-300" />
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/playground" className="group text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#00FFA3] group-hover:w-2 transition-all duration-300" />
                                    Playground
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-2">
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/features" className="group text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#00FFA3] group-hover:w-2 transition-all duration-300" />
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="group text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#00FFA3] group-hover:w-2 transition-all duration-300" />
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="mailto:hello@dapppay.com" className="group text-sm sm:text-base text-slate-400 hover:text-[#00FFA3] transition-all duration-300 flex items-center gap-2">
                                    <span className="w-0 h-0.5 bg-[#00FFA3] group-hover:w-2 transition-all duration-300" />
                                    Contact
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-6 sm:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs sm:text-sm gap-3 sm:gap-0">
                        <div className="text-center md:text-left flex items-center gap-2">
                            <span>© {new Date().getFullYear()} DappPay. All rights reserved.</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:flex items-center gap-1">
                                Made with <Heart className="w-3 h-3 text-red-500 animate-pulse" /> by DappMentors
                            </span>
                        </div>
                        <div className="flex gap-4 sm:gap-6">
                            <Link href="/privacy" className="hover:text-[#00FFA3] transition-colors duration-300 relative group">
                                Privacy Policy
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FFA3] group-hover:w-full transition-all duration-300" />
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