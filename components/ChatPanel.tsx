import { useRef, useEffect, useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { PublicKey } from '@solana/web3.js';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

type Message = {
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
};

type ChatMessage = Message & {
    id: string;
};

interface ChatPanelProps {
    messages: ChatMessage[];
    input: string;
    isLoading: boolean;
    isPayrollOpen: boolean;
    publicKey?: PublicKey | null;
    onInputChange: (value: string) => void;
    onSubmit: (e?: React.FormEvent) => void;
    apiKeySet: boolean;
    userApiKey: string;
    onApiKeyChange: (value: string) => void;
    onApiKeySubmit: (e: React.FormEvent) => void;
}

const TypingIndicator = () => (
    <div className="flex items-center gap-2 p-4 bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-700/50 w-fit">
        <Bot className="w-5 h-5 text-[#DC1FFF]" />
        <div className="flex gap-1">
            <div className="w-2 h-2 bg-[#DC1FFF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-[#00FFA3] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-[#03E1FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
    </div>
);

const ChatPanel: React.FC<ChatPanelProps> = ({
    messages,
    input,
    isLoading,
    isPayrollOpen,
    publicKey,
    onInputChange,
    onSubmit,
    apiKeySet,
    userApiKey,
    onApiKeyChange,
    onApiKeySubmit,
}) => {
    const chatRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    };

    const handleApiKeyKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onApiKeySubmit(e as unknown as React.FormEvent);
        }
    };

    const markdownComponents: Components = {
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        h1: ({ children }) => <h1 className="text-lg font-bold mb-2 mt-3 first:mt-0 text-[#DC1FFF]">{children}</h1>,
        h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-3 first:mt-0 text-[#00FFA3]">{children}</h2>,
        h3: ({ children }) => <h3 className="text-sm font-bold mb-1 mt-2 first:mt-0 text-[#03E1FF]">{children}</h3>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li className="ml-2">{children}</li>,
        code: ({ inline, children, className }: { inline?: boolean; children?: React.ReactNode; className?: string }) =>
            inline ? (
                <code className="bg-slate-700/50 px-1.5 py-0.5 rounded text-[#00FFA3] font-mono text-xs break-all">
                    {children}
                </code>
            ) : (
                <code className={`block bg-slate-700/50 p-3 rounded-md my-3 font-mono text-xs overflow-x-auto whitespace-pre break-all border border-slate-600/30 ${className ?? ''}`}>
                    {children}
                </code>
            ),
        a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#00FFA3] hover:text-[#DC1FFF] underline break-all transition-colors duration-300">
                {children}
            </a>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-[#DC1FFF] pl-3 italic my-2 text-slate-300 bg-[#DC1FFF]/5 py-2 rounded-r">
                {children}
            </blockquote>
        ),
        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        hr: () => <hr className="border-slate-700 my-4" />,
    };

    return (
        <div className={`${isPayrollOpen ? 'hidden lg:flex lg:w-2/3' : 'w-full'} min-h-[50vh] max-h-[80vh] transition-all duration-300 flex flex-col bg-linear-to-br from-slate-900/50 to-slate-800/30 border border-[#DC1FFF]/20 rounded-2xl backdrop-blur-md overflow-hidden shadow-2xl hover:shadow-[#DC1FFF]/20 relative group`}>
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#DC1FFF]/20 via-[#00FFA3]/20 to-[#03E1FF]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

            {/* Chat Header */}
            <div className="p-4 sm:p-6 border-b border-slate-800/50 shrink-0 bg-linear-to-r from-slate-900/80 to-slate-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-linear-to-br from-[#DC1FFF] to-[#00FFA3] rounded-full flex items-center justify-center shadow-lg shadow-[#DC1FFF]/50 animate-pulse">
                                <Bot className="w-6 h-6 text-black" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00FFA3] rounded-full border-2 border-slate-900 animate-ping" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">AI Assistant</h2>
                            <p className="text-xs sm:text-sm text-slate-400">Powered by advanced AI</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse ${publicKey ? 'bg-[#00FFA3] shadow-lg shadow-[#00FFA3]/50' : 'bg-yellow-500 shadow-lg shadow-yellow-500/50'}`} />
                        <span className="text-xs text-slate-400 hidden sm:block">
                            {publicKey ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4 custom-scrollbar" id="messages-container">
                {messages.map((msg, index) => (
                    <div
                        key={msg.id || index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        <div className={`max-w-[85%] sm:max-w-[70%] group/message ${msg.role === 'user'
                                ? 'bg-linear-to-r from-[#DC1FFF] to-[#00FFA3]'
                                : 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50'
                            } rounded-2xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 relative`}>
                            {/* Message icon */}
                            <div className={`absolute ${msg.role === 'user' ? '-right-2 -top-2' : '-left-2 -top-2'} w-8 h-8 rounded-full ${msg.role === 'user'
                                    ? 'bg-linear-to-br from-[#00FFA3] to-[#DC1FFF]'
                                    : 'bg-linear-to-br from-[#DC1FFF] to-[#00FFA3]'
                                } flex items-center justify-center shadow-lg opacity-0 group-hover/message:opacity-100 transition-opacity duration-300`}>
                                {msg.role === 'user' ? (
                                    <User className="w-4 h-4 text-black" />
                                ) : (
                                    <Bot className="w-4 h-4 text-black" />
                                )}
                            </div>

                            <div className={`text-xs sm:text-sm leading-relaxed ${msg.role === 'user' ? 'text-black' : 'text-white'} break-all`}>
                                {msg.role === 'user' ? (
                                    <p className="whitespace-pre-wrap break-all font-medium">{msg.content}</p>
                                ) : (
                                    <ReactMarkdown components={markdownComponents}>
                                        {msg.content}
                                    </ReactMarkdown>
                                )}
                            </div>
                            <p className={`text-[10px] sm:text-xs mt-1 sm:mt-2 opacity-60 ${msg.role === 'user' ? 'text-black' : 'text-slate-300'}`}>
                                {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ''}
                            </p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start animate-slide-in">
                        <TypingIndicator />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-6 border-t border-slate-800/50 shrink-0 bg-linear-to-r from-slate-900/80 to-slate-800/60 backdrop-blur-sm">
                {!apiKeySet ? (
                    <form onSubmit={onApiKeySubmit} className="flex flex-col gap-2">
                        <div className="flex gap-2 sm:gap-3">
                            <div className="flex-1 relative group">
                                <input
                                    type="password"
                                    value={userApiKey}
                                    onChange={(e) => onApiKeyChange(e.target.value)}
                                    onKeyPress={handleApiKeyKeyPress}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Enter your OpenAI API key (sk-...)"
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#DC1FFF] focus:bg-slate-800/70 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm"
                                />
                                <div className="absolute inset-0 rounded-xl bg-linear-to-r from-[#DC1FFF]/20 to-[#00FFA3]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
                            </div>
                            <button
                                type="submit"
                                disabled={!userApiKey.trim()}
                                className="relative group px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#DC1FFF] text-black rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-xl overflow-hidden whitespace-nowrap"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                                <span className="hidden sm:inline relative z-10">Set Key</span>
                            </button>
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-400">
                            Your API key is stored locally and never sent to our servers. Press Enter or click Set Key to continue.
                        </p>
                    </form>
                ) : (
                    <div className={`flex gap-2 sm:gap-3 transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
                        <div className="flex-1 relative group">
                            <input
                                value={input}
                                onChange={(e) => onInputChange(e.target.value)}
                                onKeyPress={handleKeyPress}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Type your payroll command..."
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#DC1FFF] focus:bg-slate-800/70 transition-all duration-300 disabled:opacity-50 backdrop-blur-sm"
                                disabled={isLoading}
                            />
                            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-[#DC1FFF]/20 to-[#00FFA3]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
                        </div>
                        <button
                            onClick={() => onSubmit()}
                            disabled={isLoading || !input.trim()}
                            className="relative group px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#DC1FFF] text-black rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-xl overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                            <Send className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                            <span className="hidden sm:inline relative z-10">Send</span>
                        </button>
                    </div>
                )}
                <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] sm:text-xs text-slate-500">
                        Wallet: {publicKey ? (
                            <span className="text-[#00FFA3] font-mono">{publicKey.toBase58().slice(0, 6)}...</span>
                        ) : (
                            <span className="text-yellow-500">Not connected</span>
                        )}
                    </p>
                    <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-[#DC1FFF] rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-[#00FFA3] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1 h-1 bg-[#03E1FF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slide-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out forwards;
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
        </div>
    );
};

export default ChatPanel;