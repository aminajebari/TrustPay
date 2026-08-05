// app/components/ClientProviders.tsx
"use client"

import { ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import { getClusterURL } from '@/utils/helper';

interface ClientProvidersProps {
    children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
    const cluster = process.env.NEXT_PUBLIC_CLUSTER || 'devnet';
    const rpcOverride = process.env.NEXT_PUBLIC_RPC_URL;
    const endpoint = useMemo(() => {
        if (rpcOverride) {
            return rpcOverride;
        }
        const url = getClusterURL(cluster);
        if (!url) {
            throw new Error(`Unsupported NEXT_PUBLIC_CLUSTER value: ${cluster}`);
        }
        return url;
    }, [cluster, rpcOverride]);
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
