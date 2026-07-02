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

<!-- API doc update 1: added endpoint details and response schemas -->

<!-- API doc update 2: added endpoint details and response schemas -->

<!-- API doc update 3: added endpoint details and response schemas -->

<!-- API doc update 4: added endpoint details and response schemas -->

<!-- API doc update 5: added endpoint details and response schemas -->

<!-- API doc update 6: added endpoint details and response schemas -->

<!-- API doc update 7: added endpoint details and response schemas -->

<!-- API doc update 8: added endpoint details and response schemas -->

<!-- API doc update 9: added endpoint details and response schemas -->
