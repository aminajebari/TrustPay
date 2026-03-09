use anchor_lang::prelude::*;

#[error_code]
pub enum PayrollError {
    #[msg("Unauthorized access")]
    Unauthorized,
    #[msg("Invalid organization name length")]
    InvalidName,
    #[msg("Invalid salary amount")]
    InvalidSalary,
    #[msg("Invalid amount")]
    InvalidAmount,
    #[msg("Insufficient funds in treasury")]
    InsufficientFunds,
    #[msg("Missing worker account in remaining accounts")]
    MissingWorkerAccount,
    #[msg("Invalid worker PDA")]
    InvalidWorkerPDA,
    #[msg("Invalid worker wallet pubkey")]
    InvalidWorkerWallet,
}