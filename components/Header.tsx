"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
    const { setVisible } = useWalletModal();
    const { connected, publicKey, disconnect } = useWallet();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDisconnect = async () => {
        if (disconnect) {
            await disconnect();
        }
    };

    const handleConnect = () => {
        if (!mounted) return;
        setVisible(true);
    };

    const address = publicKey ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}` : '';

    const navLinks = [
        { label: 'Docs', href: '/docs' },
        { label: 'Playground', href: '/playground' },
        { label: 'Features', href: '/features' },
    ];

    const showConnectedState = mounted && connected;

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
            ? 'bg-[#030712]/90 backdrop-blur-xl border-b border-[#1A56DB]/30 shadow-lg shadow-[#1A56DB]/10'
            : 'bg-[#030712]/60 backdrop-blur-lg border-b border-[#1A56DB]/10'
            }`}>
            {/* Animated gradient line at top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#3B82F6] to-transparent animate-pulse" />

            <div className="max-w-[90vw] lg:max-w-[75vw] mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 sm:gap-3 group">
                    <Link href="/" className="relative flex items-center gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                            TrustPay
                        </span>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 shadow-lg shadow-white/20">
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-white/5 rounded-lg blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                    </Link>
                    <div className="relative">
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group relative px-3 lg:px-4 py-2 text-sm lg:text-base text-slate-400 hover:text-[#60A5FA] transition-all duration-300"
                        >
                            {link.label}
                            <span className="absolute bottom-1 left-3 lg:left-4 w-0 h-0.5 bg-[#3B82F6] group-hover:w-[calc(100%-24px)] lg:group-hover:w-[calc(100%-32px)] transition-all duration-300" />
                        </Link>
                    ))}
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {showConnectedState ? (
                        <button onClick={handleDisconnect} className="focus:outline-none">
                            <div className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-sm hover:border-[#3B82F6]/50 transition-all duration-300 group">
                                <X className="w-4 h-4 rounded-full animate-pulse shadow-lg shadow-[#3B82F6]/50" />
                                <span className="text-xs sm:text-sm text-slate-400">Connected: </span>
                                <span className="text-xs sm:text-sm text-white font-mono group-hover:text-[#60A5FA] transition-colors duration-300">{address}</span>
                            </div>
                            <div className="sm:hidden flex items-center gap-2 px-2 py-1 bg-slate-800/50 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                                <div className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                                <span className="text-xs text-white font-mono">{address}</span>
                            </div>
                        </button>
                    ) : (
                        <div className="relative group hidden sm:block">
                            <div className="absolute -inset-1 bg-linear-to-r from-[#1A56DB] to-[#3B82F6] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
                            <button
                                type="button"
                                onClick={handleConnect}
                                disabled={!mounted}
                                className="relative bg-linear-to-r from-[#1A56DB] to-[#3B82F6] hover:from-[#3B82F6] hover:to-[#1A56DB] text-white rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-90"
                            >
                                Select Wallet
                            </button>
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 hover:bg-slate-800/70 rounded-lg transition-all duration-300"
                    >
                        <Menu className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-800/50 bg-[#030712]/95 backdrop-blur-lg">
                    <div className="max-w-[90vw] mx-auto px-4 py-4 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="group relative px-3 py-2 text-sm text-slate-400 hover:text-[#60A5FA] transition-all duration-300 flex items-center gap-2"
                            >
                                <span className="w-0 h-0.5 bg-[#3B82F6] group-hover:w-2 transition-all duration-300" />
                                {link.label}
                            </Link>
                        ))}
                        {!showConnectedState && (
                            <div className="pt-2 mt-2 border-t border-slate-800/50">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-linear-to-r from-[#1A56DB] to-[#3B82F6] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300" />
                                    <button
                                        type="button"
                                        onClick={handleConnect}
                                        disabled={!mounted}
                                        className="relative w-full bg-linear-to-r from-[#1A56DB] to-[#3B82F6] hover:from-[#3B82F6] hover:to-[#1A56DB] text-white rounded-lg font-medium transition-all duration-300 text-xs px-3 py-2 disabled:cursor-not-allowed disabled:opacity-90"
                                    >
                                        Select Wallet
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

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
        </header>
    );
};

export default Header;
