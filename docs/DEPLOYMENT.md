# BitSave Deployment Guide

## Prerequisites

- Clarinet CLI installed
- STX tokens for deployment
- Configured wallet

## Testnet Deployment

```bash
# Deploy to testnet
clarinet deploy --testnet

# Verify deployment
clarinet console --testnet
```

## Mainnet Deployment

```bash
# Deploy to mainnet
clarinet deploy --mainnet

# Initialize contracts
clarinet run initialize-contracts.ts
```

## Post-Deployment

1. Verify contract functionality
2. Set initial parameters
3. Enable badge minting
4. Monitor for issues
