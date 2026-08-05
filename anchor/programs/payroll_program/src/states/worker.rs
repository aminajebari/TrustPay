use anchor_lang::prelude::*;

// on-chain account that stores data for a worker
#[account]
#[derive(InitSpace)]
pub struct Worker {
    // public key of the organization the worker belongs to
    pub org: Pubkey,
    // public key of the worker
    pub worker_pubkey: Pubkey,
    // monthly salary in lamports
    pub salary: u64,
    // the last payroll cycle this worker was paid for
    pub last_paid_cycle: u64,
    // unix timestamp of when the worker was created
    pub created_at: i64,
    // PDA bump for this account
    pub bump: u8,
}

impl Worker {
    // total space required to store the account (in bytes)
    pub const INIT_SPACE: usize = 32  // org
        + 32                          // worker_pubkey
        + 8                           // salary
        + 8                           // last_paid_cycle
        + 8                           // created_at
        + 1;                          // bump
}