// lib/payroll-mcp-tools.ts
import { tool } from 'ai'
import { z } from 'zod'
import { PublicKey, Transaction } from '@solana/web3.js'
import {
  getProviderReadonly,
  getProvider,
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
  calculateNextPayrollDate,
  checkPayrollDue,
  getOrganizationBalance,
  calculateTotalPayrollCost,
  deriveOrganizationPDA,
  deriveWorkerPDA,
} from '@/services/blockchain'

// Helper to get wallet from context (you'll need to implement this based on your app structure)
// This assumes you have access to the connected wallet
let walletContext: {
  publicKey: PublicKey | null
  signTransaction: ((tx: Transaction) => Promise<Transaction>) | null
} = {
  publicKey: null,
  signTransaction: null,
}

export const setWalletContext = (
  publicKey: PublicKey | null,
  signTransaction: ((tx: Transaction) => Promise<Transaction>) | null
) => {
  walletContext = { publicKey, signTransaction }
}

export const blockchainMcpTools = {
  // ============================================
  // ORGANIZATION MANAGEMENT TOOLS
  // ============================================

  create_organization: tool({
    description:
      'Create a new organization on the blockchain. Requires wallet connection.',
    inputSchema: z.object({
      name: z.string().describe('Name of the organization to create'),
    }),
    execute: async ({ name }) => {
      if (!walletContext.publicKey || !walletContext.signTransaction) {
        return {
          error: 'Wallet not connected. Please connect your wallet first.',
        }
      }

      try {
        const program = getProvider(
          walletContext.publicKey,
          walletContext.signTransaction
        )
        if (!program) {
          return { error: 'Failed to initialize blockchain program' }
        }

        const signature = await createOrganization(
          program,
          walletContext.publicKey,
          name
        )

        const [orgPda] = deriveOrganizationPDA(walletContext.publicKey, name)

        return {
          success: true,
          message: `Organization "${name}" created successfully`,
          signature,
          orgPda: orgPda.toBase58(),
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to create organization: ${errorMessage}`,
        }
      }
    },
  }),

  fetch_user_organizations: tool({
    description: 'Fetch all organizations created by the connected wallet',
    inputSchema: z.object({}),
    execute: async () => {
      if (!walletContext.publicKey) {
        return { error: 'Wallet not connected' }
      }

      try {
        const program = getProviderReadonly()
        const organizations = await fetchUserOrganizations(
          program,
          walletContext.publicKey
        )

        return {
          success: true,
          count: organizations.length,
          organizations,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to fetch organizations: ${errorMessage}`,
        }
      }
    },
  }),

  fetch_all_organizations: tool({
    description: 'Fetch all organizations on the blockchain',
    inputSchema: z.object({}),
    execute: async () => {
      try {
        const program = getProviderReadonly()
        const organizations = await fetchAllOrganizations(program)

        return {
          success: true,
          count: organizations.length,
          organizations,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to fetch organizations: ${errorMessage}`,
        }
      }
    },
  }),

  fetch_organization_details: tool({
    description: 'Fetch detailed information about a specific organization',
    inputSchema: z.object({
      orgPda: z.string().describe('Public key (address) of the organization'),
    }),
    execute: async ({ orgPda }) => {
      try {
        const program = getProviderReadonly()
        const organization = await fetchOrganizationDetails(program, orgPda)

        return {
          success: true,
          organization,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to fetch organization details: ${errorMessage}`,
        }
      }
    },
  }),

  // ============================================
  // WORKER MANAGEMENT TOOLS
  // ============================================

  add_worker: tool({
    description: 'Add a worker to an organization with a specified salary',
    inputSchema: z.object({
      orgPda: z.string().describe('Organization public key'),
      workerPublicKey: z.string().describe('Worker wallet public key'),
      salaryInSol: z.number().positive().describe('Monthly salary in SOL'),
    }),
    execute: async ({ orgPda, workerPublicKey, salaryInSol }) => {
      if (!walletContext.publicKey || !walletContext.signTransaction) {
        return { error: 'Wallet not connected' }
      }

      try {
        const program = getProvider(
          walletContext.publicKey,
          walletContext.signTransaction
        )
        if (!program) {
          return { error: 'Failed to initialize blockchain program' }
        }

        const workerPubKey = new PublicKey(workerPublicKey)
        const signature = await addWorker(
          program,
          walletContext.publicKey,
          orgPda,
          workerPubKey,
          salaryInSol
        )

        const [workerPda] = deriveWorkerPDA(new PublicKey(orgPda), workerPubKey)

        return {
          success: true,
          message: `Worker added successfully with salary of ${salaryInSol} SOL`,
          signature,
          workerPda: workerPda.toBase58(),
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to add worker: ${errorMessage}`,
        }
      }
    },
  }),

  fetch_organization_workers: tool({
    description: 'Fetch all workers for a specific organization',
    inputSchema: z.object({
      orgPda: z.string().describe('Organization public key'),
    }),
    execute: async ({ orgPda }) => {
      try {
        const program = getProviderReadonly()
        const workers = await fetchOrganizationWorkers(program, orgPda)

        return {
          success: true,
          count: workers.length,
          workers,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to fetch workers: ${errorMessage}`,
        }
      }
    },
  }),

  fetch_worker_details: tool({
    description: 'Fetch detailed information about a specific worker',
    inputSchema: z.object({
      workerPda: z.string().describe('Worker account public key'),
    }),
    execute: async ({ workerPda }) => {
      try {
        const program = getProviderReadonly()
        const worker = await fetchWorkerDetails(program, workerPda)

        return {
          success: true,
          worker,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to fetch worker details: ${errorMessage}`,
        }
      }
    },
  }),

  fetch_workers_by_wallet: tool({
    description: 'Fetch all worker records for a specific wallet address',
    inputSchema: z.object({
      walletPublicKey: z
        .string()
        .optional()
        .describe('Wallet public key (defaults to connected wallet)'),
    }),
    execute: async ({ walletPublicKey }) => {
      const targetKey = walletPublicKey
        ? new PublicKey(walletPublicKey)
        : walletContext.publicKey

      if (!targetKey) {
        return { error: 'No wallet specified and no wallet connected' }
      }

      try {
        const program = getProviderReadonly()
        const workers = await fetchWorkersByWallet(program, targetKey)

        return {
          success: true,
          count: workers.length,
          workers,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to fetch worker records: ${errorMessage}`,
        }
      }
    },
  }),

  // ============================================
  // TREASURY MANAGEMENT TOOLS
  // ============================================

  fund_treasury: tool({
    description: 'Add funds to an organization treasury',
    inputSchema: z.object({
      orgPda: z.string().describe('Organization public key'),
      amountInSol: z.number().positive().describe('Amount to add in SOL'),
    }),
    execute: async ({ orgPda, amountInSol }) => {
      if (!walletContext.publicKey || !walletContext.signTransaction) {
        return { error: 'Wallet not connected' }
      }

      try {
        const program = getProvider(
          walletContext.publicKey,
          walletContext.signTransaction
        )
        if (!program) {
          return { error: 'Failed to initialize blockchain program' }
        }

        const signature = await fundTreasury(
          program,
          walletContext.publicKey,
          orgPda,
          amountInSol
        )

        return {
          success: true,
          message: `Treasury funded with ${amountInSol} SOL`,
          signature,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to fund treasury: ${errorMessage}`,
        }
      }
    },
  }),

  withdraw_from_treasury: tool({
    description: 'Withdraw funds from an organization treasury',
    inputSchema: z.object({
      orgPda: z.string().describe('Organization public key'),
      amountInSol: z.number().positive().describe('Amount to withdraw in SOL'),
    }),
    execute: async ({ orgPda, amountInSol }) => {
      if (!walletContext.publicKey || !walletContext.signTransaction) {
        return { error: 'Wallet not connected' }
      }

      try {
        const program = getProvider(
          walletContext.publicKey,
          walletContext.signTransaction
        )
        if (!program) {
          return { error: 'Failed to initialize blockchain program' }
        }

        const signature = await withdrawFromTreasury(
          program,
          walletContext.publicKey,
          orgPda,
          amountInSol
        )

        return {
          success: true,
          message: `Withdrew ${amountInSol} SOL from treasury`,
          signature,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to withdraw from treasury: ${errorMessage}`,
        }
      }
    },
  }),

  get_organization_balance: tool({
    description: 'Get the current treasury balance of an organization',
    inputSchema: z.object({
      orgPda: z.string().describe('Organization public key'),
    }),
    execute: async ({ orgPda }) => {
      try {
        const program = getProviderReadonly()
        const balance = await getOrganizationBalance(program, orgPda)

        return {
          success: true,
          balance,
          balanceFormatted: `${balance.toFixed(4)} SOL`,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to get organization balance: ${errorMessage}`,
        }
      }
    },
  }),

  // ============================================
  // PAYROLL PROCESSING TOOLS
  // ============================================

  process_payroll: tool({
    description: 'Process payroll for all workers in an organization',
    inputSchema: z.object({
      orgPda: z.string().describe('Organization public key'),
      cycleTimestamp: z
        .number()
        .optional()
        .describe('Unix timestamp for the payroll cycle (defaults to now)'),
    }),
    execute: async ({ orgPda, cycleTimestamp }) => {
      if (!walletContext.publicKey || !walletContext.signTransaction) {
        return { error: 'Wallet not connected' }
      }

      try {
        const program = getProvider(
          walletContext.publicKey,
          walletContext.signTransaction
        )
        if (!program) {
          return { error: 'Failed to initialize blockchain program' }
        }

        const signature = await processPayroll(
          program,
          walletContext.publicKey,
          orgPda,
          cycleTimestamp
        )

        return {
          success: true,
          message: 'Payroll processed successfully',
          signature,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to process payroll: ${errorMessage}`,
        }
      }
    },
  }),

  check_payroll_due: tool({
    description: 'Check if any workers are due for payment',
    inputSchema: z.object({
      orgPda: z.string().describe('Organization public key'),
      cycleType: z
        .enum(['weekly', 'bi-weekly', 'monthly'])
        .default('monthly')
        .describe('Payroll cycle type'),
    }),
    execute: async ({ orgPda, cycleType }) => {
      try {
        const program = getProviderReadonly()
        const result = await checkPayrollDue(program, orgPda, cycleType)

        return {
          success: true,
          due: result.due,
          dueWorkersCount: result.workers.length,
          workers: result.workers,
          message: result.due
            ? `${result.workers.length} worker(s) are due for payment`
            : 'No workers are due for payment',
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to check payroll status: ${errorMessage}`,
        }
      }
    },
  }),

  calculate_total_payroll_cost: tool({
    description: 'Calculate the total monthly payroll cost for an organization',
    inputSchema: z.object({
      orgPda: z.string().describe('Organization public key'),
    }),
    execute: async ({ orgPda }) => {
      try {
        const program = getProviderReadonly()
        const totalCost = await calculateTotalPayrollCost(program, orgPda)

        return {
          success: true,
          totalCost,
          totalCostFormatted: `${totalCost.toFixed(4)} SOL`,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to calculate payroll cost: ${errorMessage}`,
        }
      }
    },
  }),

  calculate_next_payroll_date: tool({
    description: 'Calculate the next payroll date based on last payment',
    inputSchema: z.object({
      lastPaidCycle: z
        .number()
        .describe('Last payment timestamp in milliseconds'),
      cycleType: z
        .enum(['weekly', 'bi-weekly', 'monthly'])
        .default('monthly')
        .describe('Payroll cycle type'),
    }),
    execute: async ({ lastPaidCycle, cycleType }) => {
      try {
        const nextDate = calculateNextPayrollDate(lastPaidCycle, cycleType)

        return {
          success: true,
          nextPayrollDate: nextDate.getTime(),
          nextPayrollDateFormatted: nextDate.toLocaleDateString(),
          cycleType,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to calculate next payroll date: ${errorMessage}`,
        }
      }
    },
  }),

  // ============================================
  // UTILITY TOOLS
  // ============================================

  derive_organization_pda: tool({
    description: 'Derive the Program Derived Address (PDA) for an organization',
    inputSchema: z.object({
      authorityPublicKey: z
        .string()
        .describe('Authority wallet public key (organization owner)'),
      organizationName: z.string().describe('Name of the organization'),
    }),
    execute: async ({ authorityPublicKey, organizationName }) => {
      try {
        const authority = new PublicKey(authorityPublicKey)
        const [pda, bump] = deriveOrganizationPDA(authority, organizationName)

        return {
          success: true,
          pda: pda.toBase58(),
          bump,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to derive organization PDA: ${errorMessage}`,
        }
      }
    },
  }),

  derive_worker_pda: tool({
    description: 'Derive the Program Derived Address (PDA) for a worker',
    inputSchema: z.object({
      orgPda: z.string().describe('Organization public key'),
      workerPublicKey: z.string().describe('Worker wallet public key'),
    }),
    execute: async ({ orgPda, workerPublicKey }) => {
      try {
        const org = new PublicKey(orgPda)
        const worker = new PublicKey(workerPublicKey)
        const [pda, bump] = deriveWorkerPDA(org, worker)

        return {
          success: true,
          pda: pda.toBase58(),
          bump,
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          error: `Failed to derive worker PDA: ${errorMessage}`,
        }
      }
    },
  }),

  get_connected_wallet: tool({
    description: 'Get information about the currently connected wallet',
    inputSchema: z.object({}),
    execute: async () => {
      if (!walletContext.publicKey) {
        return {
          connected: false,
          message: 'No wallet connected',
        }
      }

      return {
        connected: true,
        publicKey: walletContext.publicKey.toBase58(),
        message: 'Wallet is connected',
      }
    },
  }),
}
