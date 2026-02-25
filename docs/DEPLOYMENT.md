# Deployment Guide

## Prerequisites

- Clarinet CLI installed
- Stacks wallet with STX
- Node.js and npm

## Testnet Deployment

```bash
# 1. Check contracts
clarinet check

# 2. Run tests
npm test

# 3. Deploy to testnet
./scripts/deploy-testnet.sh

# 4. Authorize badge minter
clarinet console
(contract-call? .bitsave-badges set-authorized-minter .bitsave)
```

## Mainnet Deployment

```bash
./scripts/deploy-mainnet.sh
```

## Post-Deployment

1. Verify contracts
2. Set reward rate
3. Configure parameters
4. Test deposit/withdrawal
