use crate::errors::PayrollError;
use crate::states::{Organization, Worker};
use anchor_lang::prelude::*;

pub fn process_payroll<'info>(
    ctx: Context<'_, '_, 'info, 'info, ProcessPayrollCtx<'info>>,
    cycle_timestamp: u64,
) -> Result<()> {
    let num_workers = ctx.accounts.org.workers_count as usize;
    let num_expected_accounts = num_workers * 2;

    require!(
        ctx.remaining_accounts.len() == num_expected_accounts,
        PayrollError::MissingWorkerAccount
    );

    let org_key = ctx.accounts.org.key();
    let program_id = *ctx.program_id;

    // First pass: Calculate total payout and validate all accounts
    let mut total_payout = 0u64;
    for i in 0..num_workers {
        let pda_idx = i * 2;
        let wallet_idx = pda_idx + 1;

        let pda_ai = &ctx.remaining_accounts[pda_idx];
        let wallet_ai = &ctx.remaining_accounts[wallet_idx];

        // Verify worker PDA
        let worker_wallet_key = wallet_ai.key();
        let worker_pda_seeds = &[
            b"worker".as_ref(),
            org_key.as_ref(),
            worker_wallet_key.as_ref(),
        ];
        let (expected_pda, _) = Pubkey::find_program_address(worker_pda_seeds, &program_id);

        require_keys_eq!(pda_ai.key(), expected_pda, PayrollError::InvalidWorkerPDA);

        let worker = Account::<Worker>::try_from(pda_ai)?;

        if worker.last_paid_cycle < cycle_timestamp {
            total_payout = total_payout
                .checked_add(worker.salary)
                .ok_or(PayrollError::InsufficientFunds)?;
        }
    }

    require!(
        ctx.accounts.org.treasury >= total_payout,
        PayrollError::InsufficientFunds
    );

    // Second pass: Process payments
    for i in 0..num_workers {
        let pda_idx = i * 2;
        let wallet_idx = pda_idx + 1;

        let pda_ai = &ctx.remaining_accounts[pda_idx];
        let wallet_ai = &ctx.remaining_accounts[wallet_idx];

        let mut worker = Account::<Worker>::try_from(pda_ai)?;

        if worker.last_paid_cycle < cycle_timestamp {
            let salary_amount = worker.salary;

            // Update worker data
            worker.last_paid_cycle = cycle_timestamp;

            // Serialize updated worker data
            let mut data = pda_ai.try_borrow_mut_data()?;
            worker.try_serialize(&mut &mut data[..])?;
            drop(data);

            // Transfer lamports directly (not using system_program::transfer)
            // This is necessary because the org PDA contains data
            **ctx
                .accounts
                .org
                .to_account_info()
                .try_borrow_mut_lamports()? -= salary_amount;
            **wallet_ai.try_borrow_mut_lamports()? += salary_amount;

            // Update treasury
            ctx.accounts.org.treasury = ctx.accounts.org.treasury.saturating_sub(salary_amount);
        }
    }

    msg!(
        "Payroll processed for org '{}': {} lamports paid to {} workers",
        ctx.accounts.org.name,
        total_payout,
        num_workers
    );
    Ok(())
}

#[derive(Accounts)]
pub struct ProcessPayrollCtx<'info> {
    #[account(
        mut,
        has_one = authority @ PayrollError::Unauthorized,
        seeds = [b"org", authority.key().as_ref(), org.name.as_bytes()],
        bump = org.bump
    )]
    pub org: Account<'info, Organization>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
    // Workers and their wallet pubkeys provided as remaining_accounts
    // (alternating: worker_pda, worker_wallet)
}
