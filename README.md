# 🏦 BitSave – Bitcoin-Powered STX Savings Vault

**Author:** Marcus David  
**Purpose:** A decentralized savings vault on Stacks where users lock STX for a period and earn on-chain reputation points.

---

## ⚙️ Features
- Deposit STX and lock for a chosen duration
- Withdraw only after lock expiry
- Earn on-chain reputation points upon withdrawal
- Admin can adjust reward rate

---

## 🧱 Smart Contract Functions

| Function | Type | Description |
|-----------|------|--------------|
| `deposit(lock-period)` | public | Locks user's STX for specified block period |
| `withdraw()` | public | Withdraws funds + rewards after maturity |
| `set-reward-rate(new-rate)` | admin | Updates reward rate |
| `get-savings(user)` | read-only | Returns user's savings info |
| `get-reputation(user)` | read-only | Returns reputation score |
| `get-reward-rate()` | read-only | Returns current rate |

---

## 🧪 Development Setup

```bash
# Install Clarinet
npm install -g @hirosystems/clarinet

# Check project validity
clarinet check

# (Optional) Run local console
clarinet console
```

---

## 🚀 Future Roadmap

- NFT badges for loyal savers
- DAO-based governance for reward rates
- Integration with sBTC for Bitcoin yield vaults

---

## 📁 Project Structure

```
Bitsave-Stacks/
│
├── Clarinet.toml
├── contracts/
│   └── bitsave.clar
├── README.md
└── tests/
    └── (test files)
```

---

## 📜 License

This project is open source and available for educational purposes.
