'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import {
    getProvider,
    getProviderReadonly,
    createOrganization,
    addWorker,
    fundTreasury,
    processPayroll,
    withdrawFromTreasury,
    fetchUserOrganizations,
    fetchAllOrganizations,
    fetchOrganizationDetails,
    fetchOrganizationWorkers,
    fetchWorkerDetails,
    fetchWorkersByWallet,
    checkPayrollDue,
    getOrganizationBalance,
    calculateTotalPayrollCost,
    deriveOrganizationPDA,
    deriveWorkerPDA,
} from '@/services/blockchain';
import { Play, Zap, Shuffle, Trash2, Copy, Check } from 'lucide-react';
import Header from '@/components/Header';
import ParticleBackground from '@/components/ParticleBackground';
import Footer from '@/components/Footer';
interface TestData {
    orgName: string;
    workerAddress: string;
    salary: string;
    fundAmount: string;
    withdrawAmount: string;
    selectedOrgPda: string;
    selectedWorkerPda: string;
}

interface Log {
    id: number;
    message: string;
    type: 'info' | 'success' | 'error';
    timestamp: Date;
}

const Page: React.FC = () => {
    const { publicKey, signTransaction } = useWallet();
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [testData, setTestData] = useState<TestData>({
        orgName: 'TechCorp',
        workerAddress: '',
        salary: '0.5',
        fundAmount: '10',
        withdrawAmount: '2',
        selectedOrgPda: '',
        selectedWorkerPda: '',
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
        const timestamp = new Date();
        setLogs(prev => [{
            id: Date.now(),
            message,
            type,
            timestamp
        }, ...prev].slice(0, 100));
    };

    const handleError = (error: unknown, context: string) => {
        const message = error instanceof Error ? error.message : String(error);
        addLog(`${context}: ${message}`, 'error');
        console.error(context, error);
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const generateRandomData = () => {
        const randomOrg = `Org_${Math.random().toString(36).substring(7)}`;
        const randomSalary = (Math.random() * 2 + 0.5).toFixed(2);
        const randomFund = (Math.random() * 20 + 5).toFixed(2);
        setTestData(prev => ({
            ...prev,
            orgName: randomOrg,
            salary: randomSalary,
            fundAmount: randomFund,
        }));
        addLog('Generated random test data', 'info');
    };

    const testCreateOrganization = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }

        setLoading('createOrg');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            addLog(`Creating organization: ${testData.orgName}`, 'info');
            const tx = await createOrganization(program, publicKey, testData.orgName);

            const [orgPda] = deriveOrganizationPDA(publicKey, testData.orgName);
            setTestData(prev => ({ ...prev, selectedOrgPda: orgPda.toBase58() }));

            addLog(`Organization created! TX: ${tx}`, 'success');
            addLog(`Org PDA: ${orgPda.toBase58()}`, 'info');
        } catch (error) {
            handleError(error, 'Create Organization');
        } finally {
            setLoading(null);
        }
    };

    const testAddWorker = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }
        if (!testData.selectedOrgPda) {
            addLog('Please create an organization first or enter Org PDA', 'error');
            return;
        }

        setLoading('addWorker');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            const workerPubkey = testData.workerAddress
                ? new PublicKey(testData.workerAddress)
                : PublicKey.unique();

            addLog(`Adding worker with salary ${testData.salary} SOL`, 'info');
            const tx = await addWorker(
                program,
                publicKey,
                testData.selectedOrgPda,
                workerPubkey,
                parseFloat(testData.salary)
            );

            const [workerPda] = deriveWorkerPDA(
                new PublicKey(testData.selectedOrgPda),
                workerPubkey
            );
            setTestData(prev => ({ ...prev, selectedWorkerPda: workerPda.toBase58() }));

            addLog(`Worker added! TX: ${tx}`, 'success');
            addLog(`Worker PDA: ${workerPda.toBase58()}`, 'info');
        } catch (error) {
            handleError(error, 'Add Worker');
        } finally {
            setLoading(null);
        }
    };

    const testFundTreasury = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }
        if (!testData.selectedOrgPda) {
            addLog('Please create an organization first or enter Org PDA', 'error');
            return;
        }

        setLoading('fundTreasury');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            addLog(`Funding treasury with ${testData.fundAmount} SOL`, 'info');
            const tx = await fundTreasury(
                program,
                publicKey,
                testData.selectedOrgPda,
                parseFloat(testData.fundAmount)
            );

            addLog(`Treasury funded! TX: ${tx}`, 'success');
        } catch (error) {
            handleError(error, 'Fund Treasury');
        } finally {
            setLoading(null);
        }
    };

    const testProcessPayroll = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }
        if (!testData.selectedOrgPda) {
            addLog('Please create an organization first or enter Org PDA', 'error');
            return;
        }

        setLoading('processPayroll');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            addLog('Processing payroll for all workers...', 'info');
            const tx = await processPayroll(program, publicKey, testData.selectedOrgPda);

            addLog(`Payroll processed! TX: ${tx}`, 'success');
        } catch (error) {
            handleError(error, 'Process Payroll');
        } finally {
            setLoading(null);
        }
    };

    const testWithdraw = async () => {
        if (!publicKey || !signTransaction) {
            addLog('Please connect your wallet first', 'error');
            return;
        }
        if (!testData.selectedOrgPda) {
            addLog('Please create an organization first or enter Org PDA', 'error');
            return;
        }

        setLoading('withdraw');
        try {
            const program = getProvider(publicKey, signTransaction);
            if (!program) throw new Error('Failed to get program');

            addLog(`Withdrawing ${testData.withdrawAmount} SOL from treasury`, 'info');
            const tx = await withdrawFromTreasury(
                program,
                publicKey,
                testData.selectedOrgPda,
                parseFloat(testData.withdrawAmount)
            );

            addLog(`Withdrawal successful! TX: ${tx}`, 'success');
        } catch (error) {
            handleError(error, 'Withdraw from Treasury');
        } finally {
            setLoading(null);
        }
    };

    const testFetchUserOrgs = async () => {
        if (!publicKey) {
            addLog('Please connect your wallet first', 'error');
            return;
        }

        setLoading('fetchUserOrgs');
        try {
            const program = getProviderReadonly();
            addLog('Fetching your organizations...', 'info');
            const orgs = await fetchUserOrganizations(program, publicKey);

            addLog(`Found ${orgs.length} organization(s)`, 'success');
            orgs.forEach((org, i) => {
                addLog(`${i + 1}. ${org.name} - Treasury: ${org.treasury} SOL - Workers: ${org.workersCount}`, 'info');
            });
        } catch (error) {
            handleError(error, 'Fetch User Organizations');
        } finally {
            setLoading(null);
        }
    };

    const testFetchAllOrgs = async () => {
        setLoading('fetchAllOrgs');
        try {
            const program = getProviderReadonly();
            addLog('Fetching all organizations...', 'info');
            const orgs = await fetchAllOrganizations(program);

            addLog(`Found ${orgs.length} total organization(s)`, 'success');
            orgs.forEach((org, i) => {
                addLog(`${i + 1}. ${org.name} - Treasury: ${org.treasury} SOL`, 'info');
            });
        } catch (error) {
            handleError(error, 'Fetch All Organizations');
        } finally {
            setLoading(null);
        }
    };

    const testFetchOrgDetails = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('fetchOrgDetails');
        try {
            const program = getProviderReadonly();
            addLog(`Fetching details for org...`, 'info');
            const org = await fetchOrganizationDetails(program, testData.selectedOrgPda);

            addLog(`Organization: ${org.name}`, 'success');
            addLog(`Treasury: ${org.treasury} SOL`, 'info');
            addLog(`Workers Count: ${org.workersCount}`, 'info');
        } catch (error) {
            handleError(error, 'Fetch Organization Details');
        } finally {
            setLoading(null);
        }
    };

    const testFetchOrgWorkers = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('fetchOrgWorkers');
        try {
            const program = getProviderReadonly();
            addLog(`Fetching workers...`, 'info');
            const workers = await fetchOrganizationWorkers(program, testData.selectedOrgPda);

            addLog(`Found ${workers.length} worker(s)`, 'success');
            workers.forEach((worker, i) => {
                addLog(`${i + 1}. Salary: ${worker.salary} SOL`, 'info');
            });
        } catch (error) {
            handleError(error, 'Fetch Organization Workers');
        } finally {
            setLoading(null);
        }
    };

    const testFetchWorkerDetails = async () => {
        if (!testData.selectedWorkerPda) {
            addLog('Please enter a Worker PDA', 'error');
            return;
        }

        setLoading('fetchWorkerDetails');
        try {
            const program = getProviderReadonly();
            addLog(`Fetching worker details...`, 'info');
            const worker = await fetchWorkerDetails(program, testData.selectedWorkerPda);

            addLog(`Salary: ${worker.salary} SOL`, 'success');
            addLog(`Last Paid: ${new Date(worker.lastPaidCycle).toLocaleString()}`, 'info');
        } catch (error) {
            handleError(error, 'Fetch Worker Details');
        } finally {
            setLoading(null);
        }
    };

    const testFetchWorkersByWallet = async () => {
        if (!publicKey) {
            addLog('Please connect your wallet first', 'error');
            return;
        }

        setLoading('fetchWorkersByWallet');
        try {
            const program = getProviderReadonly();
            addLog(`Fetching your worker records...`, 'info');
            const workers = await fetchWorkersByWallet(program, publicKey);

            addLog(`Found ${workers.length} worker record(s)`, 'success');
            workers.forEach((worker, i) => {
                addLog(`${i + 1}. Salary: ${worker.salary} SOL`, 'info');
            });
        } catch (error) {
            handleError(error, 'Fetch Workers by Wallet');
        } finally {
            setLoading(null);
        }
    };

    const testCheckPayrollDue = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('checkPayrollDue');
        try {
            const program = getProviderReadonly();
            addLog('Checking if payroll is due...', 'info');
            const result = await checkPayrollDue(program, testData.selectedOrgPda, 'monthly');

            if (result.due) {
                addLog(`Payroll is DUE! ${result.workers.length} worker(s) need payment`, 'success');
            } else {
                addLog('Payroll is not due yet', 'info');
            }
        } catch (error) {
            handleError(error, 'Check Payroll Due');
        } finally {
            setLoading(null);
        }
    };

    const testGetOrgBalance = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('getOrgBalance');
        try {
            const program = getProviderReadonly();
            addLog('Fetching organization balance...', 'info');
            const balance = await getOrganizationBalance(program, testData.selectedOrgPda);

            addLog(`Treasury Balance: ${balance} SOL`, 'success');
        } catch (error) {
            handleError(error, 'Get Organization Balance');
        } finally {
            setLoading(null);
        }
    };

    const testCalculatePayrollCost = async () => {
        if (!testData.selectedOrgPda) {
            addLog('Please enter an Org PDA', 'error');
            return;
        }

        setLoading('calculatePayrollCost');
        try {
            const program = getProviderReadonly();
            addLog('Calculating total payroll cost...', 'info');
            const cost = await calculateTotalPayrollCost(program, testData.selectedOrgPda);

            addLog(`Total Monthly Payroll Cost: ${cost} SOL`, 'success');
        } catch (error) {
            handleError(error, 'Calculate Payroll Cost');
        } finally {
            setLoading(null);
        }
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <p className="text-white">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    const TestButton = ({ onClick, loading: isLoading, disabled, variant, label }: {
        onClick: () => void;
        loading: boolean;
        disabled?: boolean;
        variant: 'write' | 'read' | 'secondary';
        label: string;
    }) => {
        const variants = {
            write: 'bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#DC1FFF] text-black',
            read: 'bg-linear-to-r from-[#03E1FF] to-[#00FFA3] hover:from-[#00FFA3] hover:to-[#03E1FF] text-black',
            secondary: 'bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600'
        };

        return (
            <button
                onClick={onClick}
                disabled={disabled || isLoading}
                className={`relative w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 overflow-hidden group ${variants[variant]}`}
            >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <Play className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">{isLoading ? 'Processing...' : label}</span>
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black relative overflow-hidden pt-20">
            <Header />
            <ParticleBackground />

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#DC1FFF]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00FFA3]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="max-w-7xl mx-auto pb-20 px-6 pt-32">
                {/* Header */}
                <div className="relative z-10 bg-linear-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-[#DC1FFF]/20 hover:border-[#DC1FFF]/40 transition-all duration-300 shadow-2xl">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold bg-linear-to-r from-[#DC1FFF] to-[#00FFA3] bg-clip-text text-transparent mb-2">
                                Payroll Test Suite
                            </h1>
                            <p className="text-slate-400">
                                Interactive blockchain function testing environment
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Test Data Panel */}
                        <div className="bg-linear-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-[#DC1FFF]/20 hover:border-[#DC1FFF]/40 transition-all duration-300 shadow-xl group">
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#DC1FFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        <Zap className="w-6 h-6 text-[#00FFA3]" />
                                        Test Configuration
                                    </h2>
                                    <button
                                        onClick={generateRandomData}
                                        className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all text-slate-300 hover:text-[#00FFA3]"
                                    >
                                        <Shuffle className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Organization Name', key: 'orgName', type: 'text' },
                                        { label: 'Worker Address (optional)', key: 'workerAddress', type: 'text', placeholder: 'Leave empty for random' },
                                        { label: 'Salary (SOL)', key: 'salary', type: 'number', step: '0.1' },
                                        { label: 'Fund Amount (SOL)', key: 'fundAmount', type: 'number', step: '0.1' },
                                        { label: 'Withdraw Amount (SOL)', key: 'withdrawAmount', type: 'number', step: '0.1' },
                                        { label: 'Organization PDA', key: 'selectedOrgPda', type: 'text', placeholder: 'Auto-filled', disabled: true },
                                        { label: 'Worker PDA', key: 'selectedWorkerPda', type: 'text', placeholder: 'Auto-filled', disabled: true },
                                    ].map((field) => (
                                        <div key={field.key}>
                                            <label className="block text-sm font-medium text-slate-300 mb-2">{field.label}</label>
                                            <div className="relative group/input">
                                                <input
                                                    type={field.type || 'text'}
                                                    step={field.step}
                                                    disabled={field.disabled}
                                                    value={testData[field.key as keyof TestData]}
                                                    onChange={(e) => setTestData({ ...testData, [field.key]: e.target.value })}
                                                    placeholder={field.placeholder}
                                                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:border-[#00FFA3] focus:bg-slate-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                                />
                                                {(field.key === 'selectedOrgPda' || field.key === 'selectedWorkerPda') && testData[field.key as keyof TestData] && (
                                                    <button
                                                        onClick={() => copyToClipboard(testData[field.key as keyof TestData], field.key)}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-slate-400 hover:text-[#00FFA3] transition-colors"
                                                    >
                                                        {copied === field.key ? (
                                                            <Check className="w-4 h-4" />
                                                        ) : (
                                                            <Copy className="w-4 h-4" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Write Functions */}
                        <div className="bg-linear-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-[#00FFA3]/20 hover:border-[#00FFA3]/40 transition-all duration-300 shadow-xl group">
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#00FFA3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-4">Write Operations (Requires Wallet)</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <TestButton onClick={testCreateOrganization} loading={loading === 'createOrg'} variant="write" label="1. Create Org" />
                                    <TestButton onClick={testAddWorker} loading={loading === 'addWorker'} variant="write" label="2. Add Worker" />
                                    <TestButton onClick={testFundTreasury} loading={loading === 'fundTreasury'} variant="write" label="3. Fund Treasury" />
                                    <TestButton onClick={testProcessPayroll} loading={loading === 'processPayroll'} variant="write" label="4. Process Payroll" />
                                    <TestButton onClick={testWithdraw} loading={loading === 'withdraw'} variant="write" label="5. Withdraw Funds" />
                                </div>
                            </div>
                        </div>

                        {/* Read Functions */}
                        <div className="bg-linear-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-[#03E1FF]/20 hover:border-[#03E1FF]/40 transition-all duration-300 shadow-xl group">
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#03E1FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-white mb-4">Read Operations (Read-Only)</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <TestButton onClick={testFetchUserOrgs} loading={loading === 'fetchUserOrgs'} variant="read" label="6. My Orgs" />
                                    <TestButton onClick={testFetchAllOrgs} loading={loading === 'fetchAllOrgs'} variant="read" label="7. All Orgs" />
                                    <TestButton onClick={testFetchOrgDetails} loading={loading === 'fetchOrgDetails'} variant="read" label="8. Org Details" />
                                    <TestButton onClick={testFetchOrgWorkers} loading={loading === 'fetchOrgWorkers'} variant="read" label="9. Org Workers" />
                                    <TestButton onClick={testFetchWorkerDetails} loading={loading === 'fetchWorkerDetails'} variant="read" label="10. Worker Details" />
                                    <TestButton onClick={testFetchWorkersByWallet} loading={loading === 'fetchWorkersByWallet'} variant="read" label="11. My Workers" />
                                    <TestButton onClick={testCheckPayrollDue} loading={loading === 'checkPayrollDue'} variant="read" label="12. Payroll Due?" />
                                    <TestButton onClick={testGetOrgBalance} loading={loading === 'getOrgBalance'} variant="read" label="13. Org Balance" />
                                    <TestButton onClick={testCalculatePayrollCost} loading={loading === 'calculatePayrollCost'} variant="read" label="14. Payroll Cost" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logs Panel */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-linear-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-[#DC1FFF]/30 transition-all duration-300 shadow-xl group">
                            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-slate-700/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white">Activity Log</h3>
                                    <button
                                        onClick={() => setLogs([])}
                                        className="p-1.5 text-slate-400 hover:text-red-400 transition-colors hover:bg-red-400/10 rounded"
                                        title="Clear logs"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="bg-black/30 rounded-lg p-4 h-[600px] overflow-y-auto font-mono text-xs border border-slate-800/50 custom-scrollbar">
                                    {logs.length === 0 ? (
                                        <div className="flex items-center justify-center h-full text-slate-500">
                                            <p>No activity yet. Start testing...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {logs.map((log) => (
                                                <div
                                                    key={log.id}
                                                    className={`py-1 px-2 rounded transition-all ${log.type === 'success'
                                                        ? 'bg-[#00FFA3]/10 text-[#00FFA3] border-l-2 border-[#00FFA3]'
                                                        : log.type === 'error'
                                                            ? 'bg-red-500/10 text-red-400 border-l-2 border-red-500'
                                                            : 'bg-slate-700/20 text-slate-300 border-l-2 border-slate-600'
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <span className="break-all flex-1">
                                                            {log.type === 'success' && '✅ '}
                                                            {log.type === 'error' && '❌ '}
                                                            {log.type === 'info' && 'ℹ️ '}
                                                            {log.message}
                                                        </span>
                                                        <span className="text-[10px] opacity-70 shrink-0 ml-2">
                                                            {log.timestamp.toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(15, 23, 42, 0.5);
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

export default Page;