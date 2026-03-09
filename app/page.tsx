// app/page.tsx
"use client"

import { useWallet } from '@solana/wallet-adapter-react';
import HomePage from '@/components/HomePage';

export default function Home() {
  const { connecting } = useWallet();

  // derive loading state from connecting instead of local state to avoid synchronous setState in effect
  const isLoading = connecting;

  if (isLoading || connecting) {
    return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  }

  return <HomePage />;
}