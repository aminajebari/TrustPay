use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Organization {
    pub authority: Pubkey,
    #[max_len(100)]
    pub name: String,
    pub treasury: u64,
    pub workers_count: u64,
    pub created_at: i64,
    pub bump: u8,
}

impl Organization {
    pub const MAX_NAME_LEN: usize = 100;

    pub const INIT_SPACE: usize = 32   // authority
        + 4 + 100                      // name (String)
        + 8                            // treasury
        + 8                            // workers_count
        + 8                            // created_at (i64)
        + 1;                           // bump
}