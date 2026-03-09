use crate::errors::PayrollError;
use crate::states::Organization;
use anchor_lang::prelude::*;

pub fn withdraw(ctx: Context<WithdrawCtx>, amount: u64) -> Result<()> {
    require!(amount > 0, PayrollError::InvalidAmount);
    require!(
        ctx.accounts.org.treasury >= amount,
        PayrollError::InsufficientFunds
    );

    // Transfer lamports directly (not using system_program::transfer)
    // This is necessary because the org PDA contains data
    **ctx
        .accounts
        .org
        .to_account_info()
        .try_borrow_mut_lamports()? -= amount;
    **ctx
        .accounts
        .authority
        .to_account_info()
        .try_borrow_mut_lamports()? += amount;

    ctx.accounts.org.treasury -= amount;
    msg!("Withdrawn {} lamports from treasury", amount);
    Ok(())
}

#[derive(Accounts)]
pub struct WithdrawCtx<'info> {
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
}
