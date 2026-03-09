use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::errors::PayrollError;
use crate::states::Organization;

pub fn fund_treasury(ctx: Context<FundTreasuryCtx>, amount: u64) -> Result<()> {
    require!(amount > 0, PayrollError::InvalidAmount);

    let cpi_accounts = system_program::Transfer {
        from: ctx.accounts.authority.to_account_info(),
        to: ctx.accounts.org.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        cpi_accounts
    );
    system_program::transfer(cpi_ctx, amount)?;

    ctx.accounts.org.treasury += amount;
    msg!("Treasury funded by {} lamports", amount);
    Ok(())
}

#[derive(Accounts)]
pub struct FundTreasuryCtx<'info> {
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