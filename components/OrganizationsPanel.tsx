import { X, DollarSign, Users, TrendingUp, Building2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { PayrollSummary } from '@/utils/interface';

interface OrganizationsPanelProps {
    organizations: PayrollSummary[];
    selectedOrg: string | null;
    isOpen: boolean;
    onToggle: () => void;
    onSelectOrg: (id: string) => void;
    onViewDetails: (orgName: string) => void;
    formatLamports: (lamports: number) => string;
}

const OrganizationsPanel: React.FC<OrganizationsPanelProps> = ({
    organizations,
    selectedOrg,
    isOpen,
    onToggle,
    onSelectOrg,
    onViewDetails,
    formatLamports,
}) => {
    const [hoveredOrg, setHoveredOrg] = useState<string | null>(null);

    if (!isOpen) return null;

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
                onClick={onToggle}
            />

            {/* Panel */}
            <div className="lg:relative inset-x-0 bottom-0 lg:inset-auto lg:w-1/3 min-h-[50vh] max-h-[85vh] lg:max-h-[80vh] z-40 flex flex-col bg-linear-to-br from-slate-900/95 to-slate-800/80 lg:from-slate-900/50 lg:to-slate-800/30 border-t lg:border border-[#DC1FFF]/20 rounded-t-2xl lg:rounded-2xl backdrop-blur-md overflow-hidden shadow-2xl animate-slide-up lg:animate-none relative group">
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#DC1FFF]/20 via-[#00FFA3]/20 to-[#03E1FF]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                {/* Organizations Header */}
                <div className="p-4 sm:p-6 border-b border-slate-800/50 flex items-center justify-between shrink-0 bg-linear-to-r from-slate-900/80 to-slate-800/60 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-lg flex items-center justify-center shadow-lg shadow-[#DC1FFF]/50">
                            <Building2 className="w-5 h-5 text-black" />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Organizations</h3>
                            <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#00FFA3] rounded-full animate-pulse" />
                                {organizations.length} active
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onToggle}
                        className="p-2 hover:bg-slate-800/70 rounded-lg transition-all duration-300 group/close hover:scale-110"
                    >
                        <X className="w-5 h-5 text-slate-400 group-hover/close:text-red-400 group-hover/close:rotate-90 transition-all duration-300" />
                    </button>
                </div>

                {/* Organization Cards */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 custom-scrollbar">
                    {organizations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="w-20 h-20 bg-linear-to-br from-[#DC1FFF]/20 to-[#00FFA3]/20 rounded-full flex items-center justify-center mb-4">
                                <Building2 className="w-10 h-10 text-[#DC1FFF]" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">No Organizations Yet</h4>
                            <p className="text-sm text-slate-400">Create your first organization to get started</p>
                        </div>
                    ) : (
                        organizations.map((org, index) => (
                            <div
                                key={org.id}
                                onClick={() => onSelectOrg(org.id)}
                                onMouseEnter={() => setHoveredOrg(org.id)}
                                onMouseLeave={() => setHoveredOrg(null)}
                                className={`relative p-4 sm:p-5 bg-linear-to-br from-slate-800/50 to-slate-700/30 border ${selectedOrg === org.id
                                    ? 'border-[#DC1FFF] shadow-lg shadow-[#DC1FFF]/30'
                                    : 'border-slate-700/50'
                                    } rounded-xl cursor-pointer hover:border-[#DC1FFF]/50 transition-all duration-300 backdrop-blur-sm group/card animate-slide-in overflow-hidden`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Hover effect gradient */}
                                <div className="absolute inset-0 bg-linear-to-br from-[#DC1FFF]/10 to-[#00FFA3]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                                {/* Sparkle effect on hover */}
                                {hoveredOrg === org.id && (
                                    <div className="absolute top-2 right-2">
                                        <Sparkles className="w-4 h-4 text-[#00FFA3] animate-pulse" />
                                    </div>
                                )}

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <h4 className="font-bold text-white text-base sm:text-lg truncate pr-2 group-hover/card:text-[#00FFA3] transition-colors duration-300">
                                            {org.orgName}
                                        </h4>
                                        <div className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${selectedOrg === org.id
                                            ? 'bg-[#DC1FFF] shadow-lg shadow-[#DC1FFF]/50 animate-pulse'
                                            : 'bg-[#00FFA3] shadow-lg shadow-[#00FFA3]/50'
                                            }`} />
                                    </div>

                                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                                        <div className="flex items-center justify-between p-2 bg-slate-900/30 rounded-lg backdrop-blur-sm border border-slate-700/30 group-hover/card:border-[#00FFA3]/30 transition-all duration-300">
                                            <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-linear-to-br from-[#DC1FFF]/20 to-[#00FFA3]/20 rounded-lg flex items-center justify-center">
                                                    <DollarSign className="w-4 h-4 text-[#00FFA3]" />
                                                </div>
                                                Treasury
                                            </span>
                                            <span className="text-xs sm:text-sm font-semibold text-[#00FFA3] group-hover/card:scale-110 transition-transform duration-300">
                                                {formatLamports(org.treasury)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between p-2 bg-slate-900/30 rounded-lg backdrop-blur-sm border border-slate-700/30 group-hover/card:border-[#03E1FF]/30 transition-all duration-300">
                                            <span className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                                                <div className="w-8 h-8 bg-linear-to-br from-[#03E1FF]/20 to-[#00FFA3]/20 rounded-lg flex items-center justify-center">
                                                    <Users className="w-4 h-4 text-[#03E1FF]" />
                                                </div>
                                                Workers
                                            </span>
                                            <span className="text-xs sm:text-sm font-semibold text-white group-hover/card:text-[#03E1FF] group-hover/card:scale-110 transition-all duration-300">
                                                {org.workers.length}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onViewDetails(org.orgName);
                                        }}
                                        className="relative w-full py-2 bg-linear-to-r from-[#DC1FFF]/20 to-[#00FFA3]/20 hover:from-[#DC1FFF]/30 hover:to-[#00FFA3]/30 text-[#DC1FFF] rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 border border-[#DC1FFF]/20 hover:border-[#DC1FFF]/40 group/btn overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
                                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 relative z-10 group-hover/btn:scale-110 transition-transform duration-300" />
                                        <span className="relative z-10">View Details</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Stats */}
                <div className="p-4 border-t border-slate-800/50 bg-linear-to-r from-slate-900/80 to-slate-800/60 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] rounded-full animate-pulse" />
                            <span>Live on Solana</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-[#DC1FFF] rounded-full animate-pulse" />
                            <div className="w-1 h-1 bg-[#00FFA3] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1 h-1 bg-[#03E1FF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-up {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                @keyframes slide-in {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out forwards;
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(30, 41, 59, 0.3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, #DC1FFF, #00FFA3);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, #00FFA3, #DC1FFF);
                }
            `}</style>
        </>
    );
};

export default OrganizationsPanel;