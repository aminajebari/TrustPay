use crate::errors::PayrollError;
use crate::states::Organization;
use anchor_lang::prelude::*;

pub fn create_org(ctx: Context<CreateOrgCtx>, name: String) -> Result<()> {
    require!(
        name.len() <= Organization::MAX_NAME_LEN,
        PayrollError::InvalidName
    );

    let org = &mut ctx.accounts.org;
    org.authority = ctx.accounts.authority.key();
    org.name = name.clone();
    org.treasury = 0;
    org.workers_count = 0;
    org.created_at = Clock::get()?.unix_timestamp;
    org.bump = ctx.bumps.org;

    msg!("Organization '{}' created", name);
    Ok(())
}

#[derive(Accounts)]
#[instruction(name: String)]
pub struct CreateOrgCtx<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Organization::INIT_SPACE,
        seeds = [b"org", authority.key().as_ref(), name.as_bytes()],
        bump
    )]
    pub org: Account<'info, Organization>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
