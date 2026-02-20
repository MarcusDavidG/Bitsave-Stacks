# Architecture

## System Overview

BitSave consists of two main smart contracts:

### 1. bitsave.clar
Main savings vault contract handling:
- Deposits and withdrawals
- Reward calculations
- Reputation tracking
- Admin functions

### 2. bitsave-badges.clar
NFT badge system implementing:
- SIP-009 standard
- Badge minting
- Metadata storage
- Transfer functionality

## Data Flow

```
User → Deposit → Lock STX → Wait → Withdraw → Earn Reputation → Auto-mint Badge
```

## Security Model

- Reentrancy guards
- Input validation
- Admin rate limiting
- Emergency pause functionality
