# BitSave API Documentation

## Overview

BitSave is a decentralized savings protocol built on the Stacks blockchain that allows users to lock STX tokens for specified periods while earning reputation points and achievement NFT badges.

## Contract Architecture

### Main Contracts

1. **bitsave.clar** - Core savings functionality
2. **bitsave-badges.clar** - NFT badge system (SIP-009 compliant)
3. **bitsave-referrals.clar** - Referral tracking and bonuses
4. **bitsave-upgrade.clar** - Contract upgrade management

## Core Functions

### Deposit Functions

#### `deposit(amount, lock-period)`
**Type:** Public  
**Description:** Locks STX tokens for a specified period  
**Parameters:**
- `amount` (uint): Amount in microSTX to deposit
- `lock-period` (uint): Number of blocks to lock funds

**Returns:** `(ok {amount: uint, unlock-block: uint})`

**Errors:**
- `ERR_NO_AMOUNT` (100): Amount must be greater than 0
- `ERR_ALREADY_DEPOSITED` (101): User already has active deposit
- `ERR_BELOW_MINIMUM` (107): Amount below minimum deposit
- `ERR_EXCEEDS_MAXIMUM` (108): Amount exceeds maximum per user
- `ERR_CONTRACT_PAUSED` (106): Contract is paused

**Example:**
```clarity
(contract-call? .bitsave deposit u5000000 u1440) ;; 5 STX for ~10 days
```

#### `deposit-with-goal(amount, lock-period, goal-amount, goal-description)`
**Type:** Public  
**Description:** Deposit with savings goal tracking  
**Parameters:**
- `amount` (uint): Amount in microSTX to deposit
- `lock-period` (uint): Number of blocks to lock funds
- `goal-amount` (uint): Target savings goal in microSTX
- `goal-description` (string-utf8 100): Description of savings goal

**Returns:** `(ok {amount: uint, unlock-block: uint, goal: uint})`

**Example:**
```clarity
(contract-call? .bitsave deposit-with-goal 
  u10000000 u4320 u100000000 u"Emergency fund")
```

### Withdrawal Functions

#### `withdraw()`
**Type:** Public  
**Description:** Withdraws deposited STX with calculated rewards  
**Parameters:** None

**Returns:** `(ok {withdrawn: uint, earned-points: int, penalty: uint, early-withdrawal: bool})`

**Errors:**
- `ERR_NO_DEPOSIT` (104): No active deposit found
- `ERR_ALREADY_WITHDRAWN` (102): Deposit already claimed
- `ERR_WITHDRAWAL_COOLDOWN` (109): Cooldown period active

**Example:**
```clarity
(contract-call? .bitsave withdraw)
```

### Read-Only Functions

#### `get-savings(user)`
**Type:** Read-only  
**Description:** Returns user's savings information  
**Parameters:**
- `user` (principal): User's principal address

**Returns:** `(ok (optional {amount: uint, unlock-height: uint, claimed: bool, goal-amount: uint, goal-description: string-utf8}))`

#### `get-reputation(user)`
**Type:** Read-only  
**Description:** Returns user's reputation data  
**Parameters:**
- `user` (principal): User's principal address

**Returns:** `(ok {points: int, current-streak: uint, longest-streak: uint, last-deposit-block: uint})`

#### `get-reward-rate()`
**Type:** Read-only  
**Description:** Returns current annual reward rate  
**Returns:** `(ok uint)` - Rate as percentage (e.g., 10 = 10%)

#### `is-paused()`
**Type:** Read-only  
**Description:** Returns contract pause status  
**Returns:** `(ok bool)`

#### `get-minimum-deposit()`
**Type:** Read-only  
**Description:** Returns minimum deposit amount  
**Returns:** `(ok uint)` - Amount in microSTX

#### `get-early-withdrawal-penalty()`
**Type:** Read-only  
**Description:** Returns early withdrawal penalty rate  
**Returns:** `(ok uint)` - Penalty as percentage

#### `get-compound-frequency()`
**Type:** Read-only  
**Description:** Returns compounding frequency per year  
**Returns:** `(ok uint)` - Number of compounding periods

#### `get-max-deposit-per-user()`
**Type:** Read-only  
**Description:** Returns maximum deposit per user  
**Returns:** `(ok uint)` - Amount in microSTX

### Batch Operations

#### `batch-get-savings(users)`
**Type:** Read-only  
**Description:** Retrieves savings data for multiple users  
**Parameters:**
- `users` (list 10 principal): List of user principals (max 10)

**Returns:** `(ok (list 10 {user: principal, savings: optional, reputation: int}))`

### History Functions

#### `get-deposit-history(user, limit)`
**Type:** Read-only  
**Description:** Returns user's deposit history  
**Parameters:**
- `user` (principal): User's principal address
- `limit` (uint): Maximum number of records to return

**Returns:** `(ok {total-deposits: uint, history: (list 50 optional)})`

#### `get-contract-events(limit)`
**Type:** Read-only  
**Description:** Returns contract event log  
**Parameters:**
- `limit` (uint): Maximum number of events to return

**Returns:** `(ok {total-events: uint, events: (list 50 optional)})`

#### `get-rate-history(limit)`
**Type:** Read-only  
**Description:** Returns reward rate change history  
**Parameters:**
- `limit` (uint): Maximum number of changes to return

**Returns:** `(ok {total-changes: uint, current-rate: uint, history: (list 20 optional)})`

### Goal Tracking

#### `get-savings-goal(user)`
**Type:** Read-only  
**Description:** Returns user's savings goal progress  
**Parameters:**
- `user` (principal): User's principal address

**Returns:** `(ok {goal-amount: uint, goal-description: string-utf8, current-amount: uint, progress-percent: uint})`

### Cooldown Functions

#### `get-withdrawal-cooldown-remaining(user)`
**Type:** Read-only  
**Description:** Returns remaining cooldown blocks for user  
**Parameters:**
- `user` (principal): User's principal address

**Returns:** `(ok uint)` - Remaining blocks until next withdrawal allowed

## Admin Functions

### Parameter Management

#### `set-reward-rate(new-rate)`
**Type:** Public (Admin only)  
**Description:** Updates annual reward rate  
**Parameters:**
- `new-rate` (uint): New rate as percentage

#### `set-minimum-deposit(new-minimum)`
**Type:** Public (Admin only)  
**Description:** Updates minimum deposit amount  
**Parameters:**
- `new-minimum` (uint): New minimum in microSTX

#### `set-early-withdrawal-penalty(new-penalty)`
**Type:** Public (Admin only)  
**Description:** Updates early withdrawal penalty rate  
**Parameters:**
- `new-penalty` (uint): New penalty as percentage (max 100)

#### `set-compound-frequency(new-frequency)`
**Type:** Public (Admin only)  
**Description:** Updates compounding frequency  
**Parameters:**
- `new-frequency` (uint): Compounding periods per year

#### `set-max-deposit-per-user(new-max)`
**Type:** Public (Admin only)  
**Description:** Updates maximum deposit per user  
**Parameters:**
- `new-max` (uint): New maximum in microSTX

#### `set-withdrawal-cooldown(new-cooldown)`
**Type:** Public (Admin only)  
**Description:** Updates withdrawal cooldown period  
**Parameters:**
- `new-cooldown` (uint): Cooldown in blocks

#### `set-time-multiplier(min-blocks, multiplier)`
**Type:** Public (Admin only)  
**Description:** Sets time-based reward multiplier  
**Parameters:**
- `min-blocks` (uint): Minimum lock period for multiplier
- `multiplier` (uint): Multiplier in basis points (10000 = 1x)

### Contract Control

#### `pause-contract()`
**Type:** Public (Admin only)  
**Description:** Pauses new deposits (withdrawals still allowed)

#### `unpause-contract()`
**Type:** Public (Admin only)  
**Description:** Resumes normal contract operation

## Error Codes

| Code | Constant | Description |
|------|----------|-------------|
| 100 | ERR_NO_AMOUNT | Amount must be greater than 0 |
| 101 | ERR_ALREADY_DEPOSITED | User already has active deposit |
| 102 | ERR_ALREADY_WITHDRAWN | Deposit already claimed |
| 103 | ERR_LOCK_ACTIVE | Lock period still active (deprecated) |
| 104 | ERR_NO_DEPOSIT | No active deposit found |
| 105 | ERR_NOT_AUTHORIZED | Caller not authorized for admin function |
| 106 | ERR_CONTRACT_PAUSED | Contract is paused |
| 107 | ERR_BELOW_MINIMUM | Amount below minimum deposit |
| 108 | ERR_EXCEEDS_MAXIMUM | Amount exceeds maximum per user |
| 109 | ERR_WITHDRAWAL_COOLDOWN | Withdrawal cooldown period active |

## Reward Calculation

### Base Reward Formula
```
Base Reward = (Principal × Rate × Periods) / (100 × Frequency)
```

### Time Multipliers
- 1 month (4,320 blocks): 1.0x
- 6 months (25,920 blocks): 1.2x  
- 1 year (52,560 blocks): 1.5x
- 2 years (105,120 blocks): 2.0x

### Streak Bonuses
- Additional 10% per streak level (max 100% bonus)
- Streak resets if gap > 30 days between deposits

### Early Withdrawal Penalty
- Default: 20% of principal
- No reputation points earned
- No badge eligibility

## Usage Examples

### Basic Deposit and Withdrawal
```clarity
;; Deposit 10 STX for 30 days
(contract-call? .bitsave deposit u10000000 u4320)

;; Wait for maturity...
;; Withdraw with rewards
(contract-call? .bitsave withdraw)
```

### Goal-Based Savings
```clarity
;; Save for house down payment
(contract-call? .bitsave deposit-with-goal 
  u50000000    ;; 50 STX
  u52560       ;; 1 year
  u500000000   ;; Goal: 500 STX
  u"House down payment")
```

### Checking Progress
```clarity
;; Check savings status
(contract-call? .bitsave get-savings tx-sender)

;; Check reputation
(contract-call? .bitsave get-reputation tx-sender)

;; Check goal progress
(contract-call? .bitsave get-savings-goal tx-sender)
```

## Integration Notes

### Badge System Integration
- Badges automatically minted at 1000+ reputation points
- SIP-009 compliant NFTs
- Transferable and burnable

### Referral System Integration
- 5% bonus on referred user deposits
- Prevents self-referrals and double referrals
- Tracks referrer statistics

### Upgrade System Integration
- Controlled upgrade mechanism
- Admin can enable/disable upgrades
- Preserves user data during transitions

## Security Considerations

1. **Admin Controls**: All admin functions require proper authorization
2. **Pause Mechanism**: Emergency pause for new deposits
3. **Input Validation**: All parameters validated for bounds
4. **Reentrancy Protection**: Cooldown periods prevent rapid operations
5. **State Isolation**: User data isolated and protected
6. **Upgrade Safety**: Controlled upgrade process with rollback capability
