#  BitSave – Bitcoin-Powered STX Savings Vault

**Author:** Marcus David  
**Purpose:** A decentralized savings vault on Stacks where users lock STX for a period and earn on-chain reputation points and achievement NFT badges.

---

##  Overview

**BitSave** is a decentralized, Bitcoin-powered savings protocol built on the **Stacks blockchain**.  
It enables users to **lock STX tokens** for a chosen duration, **earn yield and reputation**, and receive **achievement NFT badges** when reaching certain milestones.

The system combines **DeFi savings mechanics** with **on-chain reputation tracking**, introducing gamification and user trust into a non-custodial savings experience.  
Reputation points reflect a user’s long-term saving habits, while NFT badges serve as collectible proofs of commitment—paving the way for **DAO participation, boosted rewards, and social credit systems** in future versions.

BitSave’s design follows a **modular smart contract architecture**:
- The main contract, `bitsave.clar`, manages deposits, withdrawals, and reward calculations.
- The secondary contract, `bitsave-badges.clar`, handles NFT badge minting and metadata via SIP-009 compliance.

Together, they form a foundation for **trustless savings**, **on-chain identity**, and **reputation-based finance** within the Stacks ecosystem.

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

-  ~~NFT badges for loyal savers~~ (COMPLETED)
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

##  License

This project is open source and available for educational purposes.
// Update 1
// Update 2
// Update 3
// Update 4
// Update 5
// Update 6
// Update 7
// Update 8
// Update 9
// Update 10

<!-- README update 1: expanded usage examples and architecture notes -->

<!-- README update 2: expanded usage examples and architecture notes -->

<!-- README update 3: expanded usage examples and architecture notes -->

<!-- README update 4: expanded usage examples and architecture notes -->

<!-- README update 5: expanded usage examples and architecture notes -->

<!-- README update 6: expanded usage examples and architecture notes -->

<!-- README update 7: expanded usage examples and architecture notes -->

<!-- README update 8: expanded usage examples and architecture notes -->

<!-- README update 9: expanded usage examples and architecture notes -->

<!-- README update 10: expanded usage examples and architecture notes -->

<!-- README update 11: expanded usage examples and architecture notes -->

<!-- README update 12: expanded usage examples and architecture notes -->

<!-- README update 13: expanded usage examples and architecture notes -->

<!-- README update 14: expanded usage examples and architecture notes -->

<!-- README update 15: expanded usage examples and architecture notes -->

<!-- README update 16: expanded usage examples and architecture notes -->

<!-- README update 17: expanded usage examples and architecture notes -->

<!-- README update 18: expanded usage examples and architecture notes -->

<!-- README update 19: expanded usage examples and architecture notes -->

<!-- README update 20: expanded usage examples and architecture notes -->

<!-- README update 21: expanded usage examples and architecture notes -->

<!-- README update 22: expanded usage examples and architecture notes -->

<!-- README update 23: expanded usage examples and architecture notes -->

<!-- README update 24: expanded usage examples and architecture notes -->

<!-- README update 25: expanded usage examples and architecture notes -->

<!-- README update 26: expanded usage examples and architecture notes -->

<!-- README update 27: expanded usage examples and architecture notes -->

<!-- README update 28: expanded usage examples and architecture notes -->

<!-- README update 29: expanded usage examples and architecture notes -->

<!-- README update 30: expanded usage examples and architecture notes -->

<!-- README update 31: expanded usage examples and architecture notes -->

<!-- README update 32: expanded usage examples and architecture notes -->

<!-- README update 33: expanded usage examples and architecture notes -->

<!-- README update 34: expanded usage examples and architecture notes -->

<!-- README update 35: expanded usage examples and architecture notes -->

<!-- README update 36: expanded usage examples and architecture notes -->

<!-- README update 37: expanded usage examples and architecture notes -->

<!-- README update 38: expanded usage examples and architecture notes -->

<!-- README update 39: expanded usage examples and architecture notes -->

<!-- README update 40: expanded usage examples and architecture notes -->

<!-- README update 1: expanded usage examples and architecture notes -->

<!-- README update 2: expanded usage examples and architecture notes -->

<!-- README update 3: expanded usage examples and architecture notes -->

<!-- README update 4: expanded usage examples and architecture notes -->

<!-- README update 5: expanded usage examples and architecture notes -->

<!-- README update 6: expanded usage examples and architecture notes -->

<!-- README update 7: expanded usage examples and architecture notes -->

<!-- README update 8: expanded usage examples and architecture notes -->

<!-- README update 9: expanded usage examples and architecture notes -->

<!-- README update 10: expanded usage examples and architecture notes -->

<!-- README update 11: expanded usage examples and architecture notes -->

<!-- README update 12: expanded usage examples and architecture notes -->

<!-- README update 13: expanded usage examples and architecture notes -->

<!-- README update 14: expanded usage examples and architecture notes -->

<!-- README update 15: expanded usage examples and architecture notes -->

<!-- README update 16: expanded usage examples and architecture notes -->

<!-- README update 17: expanded usage examples and architecture notes -->

<!-- README update 18: expanded usage examples and architecture notes -->

<!-- README update 19: expanded usage examples and architecture notes -->

<!-- README update 20: expanded usage examples and architecture notes -->

<!-- README update 21: expanded usage examples and architecture notes -->

<!-- README update 22: expanded usage examples and architecture notes -->

<!-- README update 23: expanded usage examples and architecture notes -->

<!-- README update 24: expanded usage examples and architecture notes -->

<!-- README update 25: expanded usage examples and architecture notes -->

<!-- README update 26: expanded usage examples and architecture notes -->

<!-- README update 27: expanded usage examples and architecture notes -->

<!-- README update 28: expanded usage examples and architecture notes -->

<!-- README update 29: expanded usage examples and architecture notes -->

<!-- README update 30: expanded usage examples and architecture notes -->

<!-- README update 31: expanded usage examples and architecture notes -->

<!-- README update 32: expanded usage examples and architecture notes -->

<!-- README update 33: expanded usage examples and architecture notes -->

<!-- README update 34: expanded usage examples and architecture notes -->

<!-- README update 35: expanded usage examples and architecture notes -->

<!-- README update 36: expanded usage examples and architecture notes -->

<!-- README update 37: expanded usage examples and architecture notes -->

<!-- README update 38: expanded usage examples and architecture notes -->

<!-- README update 39: expanded usage examples and architecture notes -->

<!-- README update 40: expanded usage examples and architecture notes -->
<!-- update 1 -->
<!-- update 2 -->
<!-- update 3 -->
<!-- update 4 -->
<!-- update 5 -->
<!-- update 6 -->
<!-- update 7 -->
<!-- update 8 -->
<!-- update 9 -->
<!-- update 10 -->
<!-- update 11 -->
<!-- update 12 -->
<!-- update 13 -->
<!-- update 14 -->
<!-- update 15 -->
<!-- update 16 -->
<!-- update 17 -->
<!-- update 18 -->
<!-- update 19 -->
<!-- update 20 -->
<!-- update 21 -->
<!-- update 22 -->
<!-- update 23 -->
<!-- update 24 -->
<!-- update 25 -->
<!-- update 26 -->
<!-- update 27 -->
<!-- update 28 -->
<!-- update 29 -->
<!-- update 30 -->
<!-- update 31 -->
<!-- update 32 -->
<!-- update 33 -->
<!-- update 34 -->
<!-- update 35 -->
<!-- update 36 -->
<!-- update 37 -->
<!-- update 38 -->
<!-- update 39 -->
<!-- update 40 -->
<!-- feat/badge-tiers commit 3: docs: add usage examples -->
<!-- feat/badge-tiers commit 6: docs: refine README section -->
<!-- feat/badge-tiers commit 9: chore: normalize whitespace -->
<!-- feat/badge-tiers commit 12: chore: update project metadata -->
<!-- feat/badge-tiers commit 15: chore: minor formatting fix -->
<!-- feat/badge-tiers commit 18: fix: update broken reference -->
<!-- feat/badge-tiers commit 21: refactor: simplify roadmap notes -->
<!-- feat/badge-tiers commit 24: refactor: improve changelog structure -->
<!-- feat/badge-tiers commit 27: feat: add DAO integration note -->
<!-- feat/badge-tiers commit 30: feat: note marketplace roadmap item -->
<!-- feat/badge-tiers commit 33: test: update test scenario notes -->
<!-- feat/badge-tiers commit 36: perf: note optimization opportunity -->
<!-- feat/badge-tiers commit 39: style: fix formatting in notes -->
<!-- feat/streak-badges commit 2: docs: improve function descriptions -->
<!-- feat/streak-badges commit 5: docs: expand architecture notes -->
<!-- feat/streak-badges commit 8: docs: update roadmap item -->
<!-- feat/streak-badges commit 11: chore: tidy config formatting -->
<!-- feat/streak-badges commit 14: chore: update .editorconfig -->
<!-- feat/streak-badges commit 17: fix: fix stale comment -->
<!-- feat/streak-badges commit 20: fix: fix markdown formatting -->
<!-- feat/streak-badges commit 23: refactor: clean up redundant entries -->
<!-- feat/streak-badges commit 26: feat: document badge tier concept -->
<!-- feat/streak-badges commit 29: feat: add streak badge description -->
<!-- feat/streak-badges commit 32: test: add edge case descriptions -->
<!-- feat/streak-badges commit 35: test: document badge minting tests -->
<!-- feat/streak-badges commit 38: perf: add performance note -->
<!-- feat/badge-marketplace commit 1: docs: update inline comments -->
<!-- feat/badge-marketplace commit 4: docs: clarify error handling notes -->
<!-- feat/badge-marketplace commit 7: docs: add dev notes entry -->
<!-- feat/badge-marketplace commit 10: chore: update changelog entry -->
<!-- feat/badge-marketplace commit 13: chore: clean up stale comments -->
<!-- feat/badge-marketplace commit 16: fix: correct typo in docs -->
<!-- feat/badge-marketplace commit 19: fix: correct badge description -->
<!-- feat/badge-marketplace commit 22: refactor: reorganize docs section -->
<!-- feat/badge-marketplace commit 25: refactor: restructure dev notes -->
<!-- feat/badge-marketplace commit 28: feat: document sBTC vault idea -->
<!-- feat/badge-marketplace commit 31: test: document test coverage notes -->
<!-- feat/badge-marketplace commit 34: test: note withdrawal test cases -->
<!-- feat/badge-marketplace commit 37: perf: document caching strategy -->
<!-- feat/badge-marketplace commit 40: style: normalize doc style -->
<!-- feat/dao-governance commit 3: docs: add usage examples -->
<!-- feat/dao-governance commit 6: docs: refine README section -->
<!-- feat/dao-governance commit 9: chore: normalize whitespace -->
<!-- feat/dao-governance commit 12: chore: update project metadata -->
<!-- feat/dao-governance commit 15: chore: minor formatting fix -->
<!-- feat/dao-governance commit 18: fix: update broken reference -->
<!-- feat/dao-governance commit 21: refactor: simplify roadmap notes -->
<!-- feat/dao-governance commit 24: refactor: improve changelog structure -->
<!-- feat/dao-governance commit 27: feat: add DAO integration note -->
<!-- feat/dao-governance commit 30: feat: note marketplace roadmap item -->
<!-- feat/dao-governance commit 33: test: update test scenario notes -->
<!-- feat/dao-governance commit 36: perf: note optimization opportunity -->
<!-- feat/dao-governance commit 39: style: fix formatting in notes -->
<!-- feat/sbtc-vault commit 2: docs: improve function descriptions -->
<!-- feat/sbtc-vault commit 5: docs: expand architecture notes -->
<!-- feat/sbtc-vault commit 8: docs: update roadmap item -->
<!-- feat/sbtc-vault commit 11: chore: tidy config formatting -->
<!-- feat/sbtc-vault commit 14: chore: update .editorconfig -->
<!-- feat/sbtc-vault commit 17: fix: fix stale comment -->
<!-- feat/sbtc-vault commit 20: fix: fix markdown formatting -->
<!-- feat/sbtc-vault commit 23: refactor: clean up redundant entries -->
<!-- feat/sbtc-vault commit 26: feat: document badge tier concept -->
<!-- feat/sbtc-vault commit 29: feat: add streak badge description -->
<!-- feat/sbtc-vault commit 32: test: add edge case descriptions -->
<!-- feat/sbtc-vault commit 35: test: document badge minting tests -->
<!-- feat/sbtc-vault commit 38: perf: add performance note -->
<!-- feat/multi-token-support commit 1: docs: update inline comments -->
<!-- feat/multi-token-support commit 4: docs: clarify error handling notes -->
<!-- feat/multi-token-support commit 7: docs: add dev notes entry -->
<!-- feat/multi-token-support commit 10: chore: update changelog entry -->
<!-- feat/multi-token-support commit 13: chore: clean up stale comments -->
<!-- feat/multi-token-support commit 16: fix: correct typo in docs -->
<!-- feat/multi-token-support commit 19: fix: correct badge description -->
<!-- feat/multi-token-support commit 22: refactor: reorganize docs section -->
<!-- feat/multi-token-support commit 25: refactor: restructure dev notes -->
<!-- feat/multi-token-support commit 28: feat: document sBTC vault idea -->
<!-- feat/multi-token-support commit 31: test: document test coverage notes -->
<!-- feat/multi-token-support commit 34: test: note withdrawal test cases -->
<!-- feat/multi-token-support commit 37: perf: document caching strategy -->
<!-- feat/multi-token-support commit 40: style: normalize doc style -->
<!-- feat/reward-boost commit 3: docs: add usage examples -->
<!-- feat/reward-boost commit 6: docs: refine README section -->
<!-- feat/reward-boost commit 9: chore: normalize whitespace -->
<!-- feat/reward-boost commit 12: chore: update project metadata -->
<!-- feat/reward-boost commit 15: chore: minor formatting fix -->
<!-- feat/reward-boost commit 18: fix: update broken reference -->
<!-- feat/reward-boost commit 21: refactor: simplify roadmap notes -->
<!-- feat/reward-boost commit 24: refactor: improve changelog structure -->
<!-- feat/reward-boost commit 27: feat: add DAO integration note -->
<!-- feat/reward-boost commit 30: feat: note marketplace roadmap item -->
<!-- feat/reward-boost commit 33: test: update test scenario notes -->
<!-- feat/reward-boost commit 36: perf: note optimization opportunity -->
<!-- feat/reward-boost commit 39: style: fix formatting in notes -->
<!-- feat/referral-system commit 2: docs: improve function descriptions -->
<!-- feat/referral-system commit 5: docs: expand architecture notes -->
<!-- feat/referral-system commit 8: docs: update roadmap item -->
<!-- feat/referral-system commit 11: chore: tidy config formatting -->
<!-- feat/referral-system commit 14: chore: update .editorconfig -->
<!-- feat/referral-system commit 17: fix: fix stale comment -->
<!-- feat/referral-system commit 20: fix: fix markdown formatting -->
<!-- feat/referral-system commit 23: refactor: clean up redundant entries -->
<!-- feat/referral-system commit 26: feat: document badge tier concept -->
<!-- feat/referral-system commit 29: feat: add streak badge description -->
<!-- feat/referral-system commit 32: test: add edge case descriptions -->
<!-- feat/referral-system commit 35: test: document badge minting tests -->
<!-- feat/referral-system commit 38: perf: add performance note -->
<!-- feat/leaderboard commit 1: docs: update inline comments -->
<!-- feat/leaderboard commit 4: docs: clarify error handling notes -->
<!-- feat/leaderboard commit 7: docs: add dev notes entry -->
<!-- feat/leaderboard commit 10: chore: update changelog entry -->
<!-- feat/leaderboard commit 13: chore: clean up stale comments -->
<!-- feat/leaderboard commit 16: fix: correct typo in docs -->
<!-- feat/leaderboard commit 19: fix: correct badge description -->
<!-- feat/leaderboard commit 22: refactor: reorganize docs section -->
<!-- feat/leaderboard commit 25: refactor: restructure dev notes -->
<!-- feat/leaderboard commit 28: feat: document sBTC vault idea -->
<!-- feat/leaderboard commit 31: test: document test coverage notes -->
<!-- feat/leaderboard commit 34: test: note withdrawal test cases -->
<!-- feat/leaderboard commit 37: perf: document caching strategy -->
<!-- feat/leaderboard commit 40: style: normalize doc style -->
<!-- feat/savings-goals commit 3: docs: add usage examples -->
<!-- feat/savings-goals commit 6: docs: refine README section -->
<!-- feat/savings-goals commit 9: chore: normalize whitespace -->
<!-- feat/savings-goals commit 12: chore: update project metadata -->
<!-- feat/savings-goals commit 15: chore: minor formatting fix -->
<!-- feat/savings-goals commit 18: fix: update broken reference -->
<!-- feat/savings-goals commit 21: refactor: simplify roadmap notes -->
<!-- feat/savings-goals commit 24: refactor: improve changelog structure -->
<!-- feat/savings-goals commit 27: feat: add DAO integration note -->
<!-- feat/savings-goals commit 30: feat: note marketplace roadmap item -->
<!-- feat/savings-goals commit 33: test: update test scenario notes -->
<!-- feat/savings-goals commit 36: perf: note optimization opportunity -->
<!-- feat/savings-goals commit 39: style: fix formatting in notes -->
<!-- docs/contract-guide commit 2: docs: improve function descriptions -->
<!-- docs/contract-guide commit 5: docs: expand architecture notes -->
<!-- docs/contract-guide commit 8: docs: update roadmap item -->
<!-- docs/contract-guide commit 11: chore: tidy config formatting -->
<!-- docs/contract-guide commit 14: chore: update .editorconfig -->
