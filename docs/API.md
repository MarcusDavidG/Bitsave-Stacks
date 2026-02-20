# BitSave API Documentation

## Contract Functions

### Public Functions

#### deposit(amount, lock-period)
Locks STX for a specified period.

**Parameters:**
- `amount` (uint): Amount in microSTX
- `lock-period` (uint): Lock duration in blocks

**Returns:** `(ok {amount: uint, unlock-block: uint, goal: uint})`

#### withdraw()
Withdraws matured funds and reputation points.

**Returns:** `(ok {withdrawn: uint, earned-points: int, penalty: uint, early-withdrawal: bool})`

### Read-Only Functions

#### get-savings(user)
Returns user's savings information.

#### get-reputation(user)
Returns user's reputation data.

#### get-reward-rate()
Returns current reward rate.
