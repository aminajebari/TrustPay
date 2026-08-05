# Chatbot Test Scenario

Use this scenario on localnet to test the TrustPay chatbot payroll flow.

## Setup

Use your connected wallet as the organization owner.

Sample worker wallet addresses:

```txt
Worker 1: 7YkTgZQsnJdUbV2xM8QVLfpGBASzgm7E8BsC5YzxDqM
Worker 2: 3M4FQd5JTaJ1zqYUB7AiKx17vtWcWHrBjcz4mM4vGpXK
Worker 3: 9xQeWvG816bUx9EPfJkR2VxuUwhAGe1qFG6UdcxLZ77k
```

## Chatbot Commands

Send these one by one:

```txt
Create organization Acme Labs
```

```txt
Show my organizations
```

```txt
Add worker 7YkTgZQsnJdUbV2xM8QVLfpGBASzgm7E8BsC5YzxDqM to Acme Labs with salary 1.5 SOL
```

```txt
Add worker 3M4FQd5JTaJ1zqYUB7AiKx17vtWcWHrBjcz4mM4vGpXK to Acme Labs with salary 2 SOL
```

```txt
Show details for Acme Labs
```

```txt
Fund Acme Labs treasury with 10 SOL
```

```txt
Show details for Acme Labs
```

```txt
Process payroll for Acme Labs
```

```txt
Show details for Acme Labs
```

```txt
Withdraw 1 SOL from Acme Labs
```

```txt
Show my organizations
```

## Expected Flow

After creation, `Acme Labs` should appear in your organization list.

After adding workers, organization details should show `2` workers.

After funding with `10 SOL`, the treasury should show around `10 SOL`.

After payroll, the treasury should reduce by about `3.5 SOL`, since the worker salaries are `1.5 + 2`.

After withdrawing `1 SOL`, the treasury should reduce again.
