use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Worker {
    pub org: Pubkey,
    pub worker_pubkey: Pubkey,
    pub salary: u64,
    pub last_paid_cycle: u64,
    pub created_at: i64,
    pub bump: u8,
}

impl Worker {
    pub const INIT_SPACE: usize = 32  // org
        + 32                          // worker_pubkey
        + 8                           // salary
        + 8                           // last_paid_cycle
        + 8                           // created_at
        + 1;                          // bump
}