# Network Configuration Guide

This directory contains network-specific configuration files for BitSave deployment.

## Files

- `Testnet.toml` - Configuration for Stacks testnet deployment
- `Mainnet.toml` - Configuration for Stacks mainnet deployment  
- `Devnet.toml` - Local development network configuration

## Setup Instructions

### 1. Testnet Configuration

1. **Get Testnet STX**: Visit the [Stacks Testnet Faucet](https://explorer.hiro.so/sandbox/faucet?chain=testnet)
2. **Generate Mnemonic**: Use a wallet like Hiro Wallet or generate securely
3. **Update Testnet.toml**: Replace `YOUR_TESTNET_MNEMONIC_HERE` with your actual mnemonic
4. **Verify Balance**: Ensure your account has sufficient testnet STX

### 2. Mainnet Configuration

⚠️ **SECURITY WARNING**: Mainnet uses real STX tokens. Take extra precautions:

1. **Use Hardware Wallet**: Recommended for production deployments
2. **Secure Mnemonic Storage**: Never commit real mnemonics to version control
3. **Environment Variables**: Consider using environment variables for sensitive data
4. **Minimum Balance**: Ensure deployer account has sufficient STX for deployment costs

### 3. Environment Variables (Recommended)

Instead of hardcoding mnemonics, use environment variables:

```bash
# Set environment variables
export DEPLOYER_MNEMONIC="your actual mnemonic here"
export WALLET_1_MNEMONIC="wallet 1 mnemonic here"
```

Then update the TOML files:
```toml
[accounts.deployer]
mnemonic = "${DEPLOYER_MNEMONIC}"
```

### 4. Deployment Costs

Estimated STX costs for deployment:
- **Testnet**: Free (use faucet)
- **Mainnet**: ~0.1-0.5 STX per contract (varies by network congestion)

### 5. Security Best Practices

- ✅ Use unique mnemonics for each network
- ✅ Keep mainnet mnemonics secure and backed up
- ✅ Test thoroughly on testnet before mainnet
- ✅ Use hardware wallets for mainnet deployments
- ❌ Never commit real mnemonics to version control
- ❌ Don't reuse development mnemonics in production

### 6. Verification

After updating configurations:

1. **Validate Syntax**: `clarinet check`
2. **Test Deployment**: Use `--dry-run` flag first
3. **Verify Balances**: Ensure accounts have sufficient STX
4. **Test Functions**: Verify contract functions work as expected

## Troubleshooting

### Common Issues

1. **Insufficient Balance**: Ensure deployer account has enough STX
2. **Invalid Mnemonic**: Verify mnemonic format and validity
3. **Network Connectivity**: Check Stacks node endpoints are accessible
4. **Permission Errors**: Ensure file permissions are correct

### Getting Help

- [Stacks Documentation](https://docs.stacks.co/)
- [Clarinet Documentation](https://docs.hiro.so/clarinet/)
- [Stacks Discord](https://discord.gg/stacks)

## Example Deployment

```bash
# Deploy to testnet
./scripts/deploy-automated.sh --network testnet

# Deploy to mainnet (with confirmation)
./scripts/deploy-automated.sh --network mainnet

# Verify deployment
./scripts/verify-contracts.sh --network testnet --address ST2QR5BT57BTVQM69ZFQBMW3BH7KDN3FX56H02TEW
```
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
