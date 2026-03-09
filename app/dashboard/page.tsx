// app/dashboard/page.tsx
"use client"

import { useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
    const { connected, connecting } = useWallet();
    const router = useRouter();

    // derive loading state from connecting instead of local state to avoid synchronous setState in effect
    const isLoading = connecting;

    useEffect(() => {
        if (!connected && !connecting) {
            router.push('/');
        }
    }, [connected, connecting, router]);

    if (isLoading || connecting) {
        return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
    }

    if (!connected) {
        return null; // Redirect will handle
    }

    return <Dashboard />;
}