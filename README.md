#  BitSave – Bitcoin-Powered STX Savings Vault

**Author:** Marcus David  
**Purpose:** A decentralized savings vault on Stacks where users lock STX for a period and earn on-chain reputation points and achievement NFT badges.

---

##  Features
-  Deposit STX and lock for a chosen duration
-  Withdraw only after lock expiry
-  Earn on-chain reputation points upon withdrawal
-  Auto-mint NFT badges when reaching reputation milestones (1000+ points)
-  SIP-009 compliant achievement badges with metadata
-  Admin can adjust reward rate

---

##  Smart Contract Functions

### BitSave Contract (`bitsave.clar`)

| Function | Type | Description |
|-----------|------|--------------|
| `deposit(lock-period)` | public | Locks user's STX for specified block period |
| `withdraw()` | public | Withdraws funds + rewards after maturity, auto-mints badge if eligible |
| `set-reward-rate(new-rate)` | admin | Updates reward rate |
| `get-savings(user)` | read-only | Returns user's savings info |
| `get-reputation(user)` | read-only | Returns reputation score |
| `get-reward-rate()` | read-only | Returns current rate |

### BitSave Badges Contract (`bitsave-badges.clar`)

| Function | Type | Description |
|-----------|------|--------------|
| `set-authorized-minter(minter)` | admin | Sets who can mint badges (BitSave contract) |
| `transfer-admin(new-admin)` | admin | Transfers admin role |
| `mint(recipient, metadata)` | authorized | Mints new badge to recipient |
| `transfer(token-id, sender, recipient)` | public | Transfers badge ownership |
| `burn(token-id)` | public | Burns/destroys a badge |
| `get-owner(token-id)` | read-only | Returns badge owner |
| `get-token-uri(token-id)` | read-only | Returns badge metadata |
| `get-next-token-id()` | read-only | Returns next token ID |
| `get-authorized-minter()` | read-only | Returns authorized minter |

---

##  Development Setup

```bash
# Install Clarinet
npm install -g @hirosystems/clarinet

# Check project validity
clarinet check

# Run tests
npm install
npm test

# (Optional) Run local console
clarinet console
```

### Setting Up Badge System

After deploying contracts, authorize BitSave to mint badges:

```clarity
;; Run this from the deployer account
(contract-call? .bitsave-badges set-authorized-minter .bitsave)
```

---

##  Badge System

Users automatically receive NFT badges when they reach reputation milestones:

- **Threshold:** 1000 reputation points
- **Badge Tier:** Gold - "Loyal Saver"
- **Metadata:** Includes achievement name, tier, and threshold
- **Standard:** SIP-009 compliant NFTs

### How to Earn a Badge

1. Deposit STX with a lock period
2. Wait for the lock period to expire
3. Withdraw your STX
4. If you have ≥1000 reputation points, you'll automatically receive a badge!

**Example:**
- Deposit 10,000 STX
- Reward rate: 10%
- Reputation earned: 1,000 points
- Result: Badge minted on withdrawal 

##  Future Roadmap

- ✅ ~~NFT badges for loyal savers~~ (COMPLETED)
- Multiple badge tiers (Bronze, Silver, Gold, Platinum)
- Time-based and streak badges
- Badge marketplace and trading
- DAO-based governance for reward rates
- Integration with sBTC for Bitcoin yield vaults

---

##  Project Structure

```
Bitsave-Stacks/
│
├── Clarinet.toml
├── contracts/
│   ├── bitsave.clar              # Main savings vault contract
│   └── bitsave-badges.clar       # NFT badge system contract
├── tests/
│   ├── bitsave-badges_test.ts    # Badge contract tests
│   └── bitsave_integration_test.ts # Integration tests
├── README.md
└── TODO.md
```

---

## 📜 License

This project is open source and available for educational purposes.
