use crate::errors::PayrollError;
use crate::states::{Organization, Worker};
use anchor_lang::prelude::*;

pub fn add_worker(ctx: Context<AddWorkerCtx>, salary: u64) -> Result<()> {
    require!(salary > 0, PayrollError::InvalidSalary);

    let worker = &mut ctx.accounts.worker;
    worker.org = ctx.accounts.org.key();
    worker.worker_pubkey = ctx.accounts.worker_pubkey.key();
    worker.salary = salary;
    worker.last_paid_cycle = 0;
    worker.created_at = Clock::get()?.unix_timestamp;
    worker.bump = ctx.bumps.worker;

    let org = &mut ctx.accounts.org;
    org.workers_count += 1;

    msg!(
        "Worker {} added with salary {}",
        worker.worker_pubkey,
        salary
    );
    Ok(())
}

#[derive(Accounts)]
pub struct AddWorkerCtx<'info> {
    #[account(
        mut,
        has_one = authority @ PayrollError::Unauthorized,
        seeds = [b"org", authority.key().as_ref(), org.name.as_bytes()],
        bump = org.bump
    )]
    pub org: Account<'info, Organization>,

    #[account(
        init,
        payer = authority,
        space = 8 + Worker::INIT_SPACE,
        seeds = [b"worker", org.key().as_ref(), worker_pubkey.key().as_ref()],
        bump
    )]
    pub worker: Account<'info, Worker>,

    /// CHECK: Worker wallet pubkey (validated in seeds)
    pub worker_pubkey: AccountInfo<'info>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
