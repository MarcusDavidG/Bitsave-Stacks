# BitSave API Documentation

## Smart Contract Functions

### Core Functions

#### `deposit(amount: uint, lock-period: uint)`
Deposits STX tokens with specified lock period.

**Parameters:**
- `amount`: Amount in micro-STX (1 STX = 1,000,000 micro-STX)
- `lock-period`: Lock period in blocks

**Returns:** `(response bool uint)`

#### `withdraw()`
Withdraws matured deposits with earned rewards.

**Returns:** `(response {amount: uint, reward: uint} uint)`

### Read-Only Functions

#### `get-savings(user: principal)`
Returns user's current savings information.

#### `get-reputation(user: principal)`
Returns user's reputation points.

#### `get-reward-rate()`
Returns current reward rate.

## Badge System

### `mint-badge(recipient: principal, metadata: string)`
Mints achievement badge for eligible users.

### `get-badge-metadata(token-id: uint)`
Returns badge metadata and properties.
