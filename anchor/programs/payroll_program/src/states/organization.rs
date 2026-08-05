use anchor_lang::prelude::*;

// on-chain account that stores data for an organization
#[account]
#[derive(InitSpace)]
pub struct Organization {
    // public key of the organization's owner
    pub authority: Pubkey,
    #[max_len(100)]
    pub name: String,
    // total SOL in the organization's treasury
    pub treasury: u64,
    // number of workers in the organization
    pub workers_count: u64,
    // unix timestamp of when the organization was created
    pub created_at: i64,
    // PDA bump for this account
    pub bump: u8,
}

impl Organization {
    pub const MAX_NAME_LEN: usize = 100;
    // total space required to store the account (in bytes)
    pub const INIT_SPACE: usize = 32   // authority
        + 4 + 100                      // name (String)
        + 8                            // treasury
        + 8                            // workers_count
        + 8                            // created_at (i64)
        + 1;                           // bump
}