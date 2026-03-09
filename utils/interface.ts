// utils/interface.ts

export interface Message {
  role: 'user' | 'bot'
  content: string
  timestamp: Date
}

export interface WorkerSummary {
  pubkey: string
  salary: number
  lastPaid: number
  createdAt: number
}

export interface PayrollSummary {
  id: string
  orgName: string
  treasury: number
  createdAt: number
  workers: WorkerSummary[]
}

/**
 * Organization account interface
 */
export interface Organization {
  publicKey: string
  authority: string
  name: string
  treasury: number // in SOL
  workersCount: number
  createdAt: number // timestamp in milliseconds
  bump: number
}

/**
 * Worker account interface
 */
export interface Worker {
  publicKey: string
  org: string
  workerPubkey: string
  salary: number // in SOL
  lastPaidCycle: number // timestamp in milliseconds
  createdAt: number // timestamp in milliseconds
  bump: number
}

/**
 * Payroll transaction record (for UI display)
 */
export interface PayrollTransaction {
  id: string
  orgPda: string
  orgName: string
  workerPubkey: string
  amount: number // in SOL
  timestamp: number // in milliseconds
  type: 'payment' | 'funding' | 'withdrawal'
  signature: string
}

/**
 * Payroll statistics
 */
export interface PayrollStats {
  totalWorkers: number
  totalMonthlyCost: number // in SOL
  treasuryBalance: number // in SOL
  lastPayrollDate: number // timestamp in milliseconds
  nextPayrollDate: number // timestamp in milliseconds
  workersDuePayout: number
}

/**
 * Organization creation input
 */
export interface CreateOrganizationInput {
  name: string
}

/**
 * Worker addition input
 */
export interface AddWorkerInput {
  orgPda: string
  workerPublicKey: string
  salaryInSol: number
}

/**
 * Treasury funding input
 */
export interface FundTreasuryInput {
  orgPda: string
  amountInSol: number
}

/**
 * Withdrawal input
 */
export interface WithdrawalInput {
  orgPda: string
  amountInSol: number
}

/**
 * Process payroll input
 */
export interface ProcessPayrollInput {
  orgPda: string
  cycleTimestamp?: number
}

/**
 * Payroll cycle types
 */
export type PayrollCycleType = 'weekly' | 'bi-weekly' | 'monthly'

/**
 * Worker with organization details
 */
export interface WorkerWithOrg extends Worker {
  orgName: string
  orgAuthority: string
  isPaymentDue: boolean
  nextPaymentDate: number
}

/**
 * Organization with computed fields
 */
export interface OrganizationWithStats extends Organization {
  totalPayrollCost: number // in SOL per cycle
  hasInsufficientFunds: boolean
  workers: Worker[]
  lastPayrollDate?: number
  nextPayrollDate?: number
}
