# BitSave Deployment Guide

## Prerequisites

### System Requirements
- Node.js 18+ and npm
- Clarinet CLI tool
- Stacks wallet for deployment
- Sufficient STX for deployment costs

### Installation
```bash
# Install Clarinet
npm install -g @hirosystems/clarinet

# Clone repository
git clone <repository-url>
cd Bitsave-Stacks

# Install dependencies
npm install
```

## Pre-Deployment Checklist

### 1. Contract Validation
```bash
# Check contract syntax and validity
clarinet check

# Run comprehensive test suite
npm test

# Run specific test categories
npm run test:unit
npm run test:integration
npm run test:security
```

### 2. Configuration Review
Review and adjust default parameters in contracts:

**bitsave.clar:**
- `reward-rate`: Default 10% (adjust based on tokenomics)
- `minimum-deposit`: Default 1 STX (1,000,000 microSTX)
- `max-deposit-per-user`: Default 100,000 STX
- `early-withdrawal-penalty`: Default 20%
- `compound-frequency`: Default 12 (monthly)
- `withdrawal-cooldown`: Default 144 blocks (~1 day)

**bitsave-referrals.clar:**
- `referral-bonus-rate`: Default 5%

### 3. Security Audit
- [ ] Admin functions properly protected
- [ ] Input validation on all parameters
- [ ] Error handling comprehensive
- [ ] No reentrancy vulnerabilities
- [ ] Proper access controls

## Deployment Process

### Step 1: Deploy Core Contracts

#### Deploy in Order:
1. **bitsave-upgrade.clar** (upgrade management)
2. **bitsave-badges.clar** (NFT system)
3. **bitsave-referrals.clar** (referral system)
4. **bitsave.clar** (main contract)

#### Deployment Commands:
```bash
# Deploy to testnet first
clarinet deployments apply --network testnet

# Deploy to mainnet (after thorough testing)
clarinet deployments apply --network mainnet
```

### Step 2: Post-Deployment Configuration

#### 1. Badge System Setup
```clarity
;; Set bitsave contract as authorized minter
(contract-call? .bitsave-badges set-authorized-minter .bitsave)
```

#### 2. Verify Initial State
```clarity
;; Check all contracts are deployed correctly
(contract-call? .bitsave get-reward-rate)
(contract-call? .bitsave-badges get-authorized-minter)
(contract-call? .bitsave-referrals get-referral-bonus-rate)
(contract-call? .bitsave-upgrade get-admin)
```

#### 3. Test Basic Functionality
```clarity
;; Test deposit (small amount)
(contract-call? .bitsave deposit u1000000 u144)

;; Test withdrawal after maturity
(contract-call? .bitsave withdraw)
```

## Network-Specific Configurations

### Testnet Deployment
```toml
# Clarinet.toml - Testnet settings
[network.testnet]
stacks_node_rpc_address = "https://stacks-node-api.testnet.stacks.co"
deployment_fee_rate = 10

[network.testnet.deployment]
requirements = []
```

### Mainnet Deployment
```toml
# Clarinet.toml - Mainnet settings
[network.mainnet]
stacks_node_rpc_address = "https://stacks-node-api.mainnet.stacks.co"
deployment_fee_rate = 1

[network.mainnet.deployment]
requirements = []
```

## Environment Setup

### Development Environment
```bash
# Start local Clarinet console
clarinet console

# Run local devnet
clarinet integrate
```

### Production Environment Variables
```bash
# Set network configuration
export STACKS_NETWORK=mainnet
export STACKS_API_URL=https://stacks-node-api.mainnet.stacks.co

# Set deployment wallet
export DEPLOYER_PRIVATE_KEY=<your-private-key>
```

## Monitoring and Maintenance

### Health Check Endpoints
Monitor these contract functions for system health:

```clarity
;; System status checks
(contract-call? .bitsave is-paused)
(contract-call? .bitsave get-reward-rate)
(contract-call? .bitsave get-minimum-deposit)

;; Integration checks
(contract-call? .bitsave-badges get-authorized-minter)
(contract-call? .bitsave-upgrade is-upgrade-enabled)
```

### Key Metrics to Monitor
1. **Total Value Locked (TVL)**
2. **Active user count**
3. **Average deposit size**
4. **Withdrawal patterns**
5. **Badge minting frequency**
6. **Referral activity**

### Alerting Setup
Set up alerts for:
- Contract pause events
- Parameter changes
- Large deposits/withdrawals
- Error rate increases
- Badge minting failures

## Upgrade Procedures

### Preparation
1. Deploy new contract version
2. Test thoroughly on testnet
3. Prepare upgrade announcement
4. Set maintenance window

### Execution
```clarity
;; Enable upgrade (admin only)
(contract-call? .bitsave-upgrade enable-upgrade .new-bitsave-contract)

;; Verify upgrade status
(contract-call? .bitsave-upgrade is-upgrade-enabled)

;; Get new contract address
(contract-call? .bitsave-upgrade get-new-contract-address)
```

### Rollback Plan
```clarity
;; Disable upgrade if issues arise
(contract-call? .bitsave-upgrade disable-upgrade)
```

## Security Best Practices

### Admin Key Management
1. Use multi-sig wallet for admin functions
2. Store private keys securely (hardware wallet)
3. Implement key rotation procedures
4. Maintain backup access methods

### Parameter Management
1. Document all parameter changes
2. Test changes on testnet first
3. Implement gradual rollouts
4. Monitor impact of changes

### Emergency Procedures
1. **Contract Pause**: Use in case of discovered vulnerabilities
2. **Parameter Reset**: Rollback to safe defaults if needed
3. **Upgrade Disable**: Stop upgrade process if issues found

## Troubleshooting

### Common Deployment Issues

#### Contract Deployment Fails
```bash
# Check contract syntax
clarinet check

# Verify network connectivity
curl -X POST https://stacks-node-api.testnet.stacks.co/v2/info

# Check account balance
stx balance <address>
```

#### Badge System Not Working
```clarity
;; Check authorization
(contract-call? .bitsave-badges get-authorized-minter)

;; Verify minter is set correctly
(contract-call? .bitsave-badges set-authorized-minter .bitsave)
```

#### Referral System Issues
```clarity
;; Check referral registration
(contract-call? .bitsave-referrals get-referrer <user-address>)

;; Verify bonus rate
(contract-call? .bitsave-referrals get-referral-bonus-rate)
```

### Performance Issues
1. **High Gas Costs**: Review function complexity
2. **Slow Queries**: Optimize batch operations
3. **Memory Issues**: Check data structure sizes

## Post-Deployment Verification

### Functional Testing
```bash
# Run deployment validation tests
npm run test:deployment

# Test user journeys
npm run test:integration

# Verify cross-contract interactions
npm run test:cross-contract
```

### Security Validation
```bash
# Run security test suite
npm run test:security

# Check for vulnerabilities
npm run test:edge-cases

# Validate error handling
npm run test:regression
```

## Maintenance Schedule

### Daily
- Monitor system health
- Check error logs
- Verify badge minting
- Review large transactions

### Weekly
- Analyze user metrics
- Review parameter effectiveness
- Check referral activity
- Update documentation

### Monthly
- Security review
- Performance analysis
- User feedback review
- Consider parameter adjustments

## Support and Documentation

### User Support
1. Maintain FAQ documentation
2. Provide clear error messages
3. Create user guides
4. Monitor community feedback

### Developer Resources
1. Keep API documentation updated
2. Provide integration examples
3. Maintain SDK/libraries
4. Document best practices

## Backup and Recovery

### Data Backup
- Contract state is on blockchain (immutable)
- Backup deployment configurations
- Maintain admin key backups
- Document recovery procedures

### Disaster Recovery
1. **Contract Compromise**: Use upgrade system
2. **Admin Key Loss**: Use backup keys
3. **Network Issues**: Monitor alternative endpoints
4. **Parameter Corruption**: Reset to safe defaults

## Compliance and Legal

### Regulatory Considerations
1. Review local regulations
2. Implement KYC/AML if required
3. Maintain audit trails
4. Document compliance procedures

### Terms of Service
1. Define user responsibilities
2. Clarify risk disclosures
3. Specify dispute resolution
4. Update regularly

## Success Metrics

### Technical Metrics
- Deployment success rate: 100%
- System uptime: >99.9%
- Transaction success rate: >99%
- Average response time: <2s

### Business Metrics
- Total Value Locked growth
- User acquisition rate
- User retention rate
- Badge earning rate
- Referral conversion rate

## Conclusion

This deployment guide provides a comprehensive framework for successfully deploying and maintaining the BitSave protocol. Follow all steps carefully and maintain thorough documentation throughout the process.

For additional support, refer to:
- API Documentation (docs/API.md)
- Troubleshooting Guide (docs/TROUBLESHOOTING.md)
- Security Guide (docs/SECURITY.md)
- User Guide (docs/USER_GUIDE.md)
