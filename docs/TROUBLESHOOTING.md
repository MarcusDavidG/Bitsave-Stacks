# BitSave Troubleshooting Guide

## Common Issues and Solutions

### Contract Interaction Issues

#### Error: "Contract not found"
**Symptoms:** Contract calls fail with contract not found error

**Causes:**
- Contract not deployed to current network
- Incorrect contract name in function calls
- Network configuration mismatch

**Solutions:**
```bash
# Verify contract deployment
clarinet deployments check --network <network>

# Check contract exists on network
curl -X GET "https://stacks-node-api.<network>.stacks.co/v2/contracts/interface/<address>/<contract-name>"

# Verify network configuration
clarinet settings get network
```

#### Error: "Function not found"
**Symptoms:** Specific function calls fail

**Causes:**
- Typo in function name
- Function doesn't exist in deployed version
- Wrong contract being called

**Solutions:**
```clarity
;; Verify function exists
(contract-call? .bitsave get-reward-rate) ;; Test with known function

;; Check contract interface
curl -X GET "https://stacks-node-api.mainnet.stacks.co/v2/contracts/interface/<address>/bitsave"
```

### Deposit Issues

#### Error: ERR_BELOW_MINIMUM (107)
**Symptoms:** Deposit fails with error code 107

**Cause:** Deposit amount below minimum threshold

**Solutions:**
```clarity
;; Check minimum deposit requirement
(contract-call? .bitsave get-minimum-deposit)

;; Ensure deposit meets minimum (default: 1 STX = 1,000,000 microSTX)
(contract-call? .bitsave deposit u1000000 u144) ;; Minimum deposit
```

#### Error: ERR_EXCEEDS_MAXIMUM (108)
**Symptoms:** Large deposits fail with error code 108

**Cause:** Deposit exceeds per-user maximum

**Solutions:**
```clarity
;; Check maximum deposit limit
(contract-call? .bitsave get-max-deposit-per-user)

;; Split large deposits across multiple transactions (after withdrawals)
```

#### Error: ERR_ALREADY_DEPOSITED (101)
**Symptoms:** Second deposit attempt fails

**Cause:** User already has active deposit

**Solutions:**
```clarity
;; Check current savings status
(contract-call? .bitsave get-savings tx-sender)

;; Wait for current deposit to mature and withdraw
(contract-call? .bitsave withdraw)
```

#### Error: ERR_CONTRACT_PAUSED (106)
**Symptoms:** All deposits fail with error code 106

**Cause:** Contract is paused by admin

**Solutions:**
```clarity
;; Check pause status
(contract-call? .bitsave is-paused)

;; Wait for admin to unpause (withdrawals still work)
;; Monitor contract events for unpause announcement
```

### Withdrawal Issues

#### Error: ERR_NO_DEPOSIT (104)
**Symptoms:** Withdrawal fails with error code 104

**Cause:** No active deposit found for user

**Solutions:**
```clarity
;; Verify deposit exists
(contract-call? .bitsave get-savings tx-sender)

;; Check if already withdrawn
;; Make new deposit if needed
```

#### Error: ERR_ALREADY_WITHDRAWN (102)
**Symptoms:** Withdrawal fails with error code 102

**Cause:** Deposit already claimed

**Solutions:**
```clarity
;; Check savings status
(contract-call? .bitsave get-savings tx-sender)

;; If claimed=true, make new deposit for future savings
```

#### Error: ERR_WITHDRAWAL_COOLDOWN (109)
**Symptoms:** Withdrawal fails with error code 109

**Cause:** Cooldown period still active

**Solutions:**
```clarity
;; Check remaining cooldown time
(contract-call? .bitsave get-withdrawal-cooldown-remaining tx-sender)

;; Wait for cooldown to expire (default: 144 blocks ≈ 1 day)
```

### Badge System Issues

#### Badges Not Minting
**Symptoms:** Users with sufficient reputation don't receive badges

**Causes:**
- Badge contract not properly authorized
- Insufficient reputation points
- Badge contract deployment issues

**Solutions:**
```clarity
;; Check authorized minter
(contract-call? .bitsave-badges get-authorized-minter)

;; Verify user reputation
(contract-call? .bitsave get-reputation <user-address>)

;; Check if badge contract is deployed
(contract-call? .bitsave-badges get-next-token-id)

;; Set proper authorization (admin only)
(contract-call? .bitsave-badges set-authorized-minter .bitsave)
```

#### Badge Transfer Failures
**Symptoms:** Badge transfers fail unexpectedly

**Causes:**
- User doesn't own the badge
- Invalid token ID
- Transfer to invalid address

**Solutions:**
```clarity
;; Verify badge ownership
(contract-call? .bitsave-badges get-owner u1)

;; Check token exists
(contract-call? .bitsave-badges get-token-uri u1)

;; Ensure valid recipient address
(contract-call? .bitsave-badges transfer u1 tx-sender 'SP...)
```

### Referral System Issues

#### Referral Registration Fails
**Symptoms:** Cannot register referral relationships

**Common Errors:**
- ERR_SELF_REFERRAL (302): User trying to refer themselves
- ERR_ALREADY_REFERRED (301): User already has referrer

**Solutions:**
```clarity
;; Check existing referrer
(contract-call? .bitsave-referrals get-referrer tx-sender)

;; Ensure different addresses for referrer and referee
(contract-call? .bitsave-referrals register-referral 'SP...) ;; Different address
```

#### Referral Bonus Calculation Issues
**Symptoms:** Unexpected bonus amounts

**Causes:**
- Bonus rate changed
- User not properly referred
- Calculation errors

**Solutions:**
```clarity
;; Check current bonus rate
(contract-call? .bitsave-referrals get-referral-bonus-rate)

;; Verify referral relationship
(contract-call? .bitsave-referrals get-referrer <user-address>)

;; Test calculation
(contract-call? .bitsave-referrals calculate-referral-bonus u10000000)
```

### Performance Issues

#### Slow Transaction Processing
**Symptoms:** Transactions take long time to confirm

**Causes:**
- Network congestion
- Low fee rates
- Complex calculations

**Solutions:**
```bash
# Check network status
curl -X GET "https://stacks-node-api.mainnet.stacks.co/v2/info"

# Increase fee rate for faster processing
# Use batch operations when possible
```

#### High Gas Costs
**Symptoms:** Transactions cost more than expected

**Causes:**
- Complex function calls
- Large data operations
- Network congestion

**Solutions:**
```clarity
;; Use batch operations for multiple queries
(contract-call? .bitsave batch-get-savings (list 'SP1... 'SP2... 'SP3...))

;; Optimize function calls
;; Avoid unnecessary read operations
```

### Data Inconsistency Issues

#### Reputation Not Updating
**Symptoms:** Reputation points don't increase after withdrawal

**Causes:**
- Early withdrawal (no points earned)
- Calculation errors
- Contract state issues

**Solutions:**
```clarity
;; Check withdrawal details
(contract-call? .bitsave withdraw) ;; Returns earned points

;; Verify reputation after withdrawal
(contract-call? .bitsave get-reputation tx-sender)

;; Check if withdrawal was early (penalty applied)
```

#### History Not Recording
**Symptoms:** Deposit history appears incomplete

**Causes:**
- History limit reached
- Contract state corruption
- Query parameters incorrect

**Solutions:**
```clarity
;; Check total deposit count
(contract-call? .bitsave get-deposit-history tx-sender u50)

;; Verify recent deposits are recorded
;; Check event logs for deposit events
```

### Admin Function Issues

#### Unauthorized Access Errors
**Symptoms:** Admin functions fail with ERR_NOT_AUTHORIZED (105)

**Causes:**
- Wrong admin address
- Admin key compromised
- Contract deployment issues

**Solutions:**
```clarity
;; Verify admin address in contract
;; Use correct admin wallet
;; Check contract deployment configuration
```

#### Parameter Changes Not Taking Effect
**Symptoms:** Parameter updates don't change behavior

**Causes:**
- Transaction not confirmed
- Wrong parameter values
- Contract caching issues

**Solutions:**
```clarity
;; Verify parameter was updated
(contract-call? .bitsave get-reward-rate)

;; Check transaction status
;; Wait for confirmation before testing
```

## Diagnostic Tools

### Contract State Inspection
```clarity
;; Check all key parameters
(contract-call? .bitsave get-reward-rate)
(contract-call? .bitsave get-minimum-deposit)
(contract-call? .bitsave get-early-withdrawal-penalty)
(contract-call? .bitsave is-paused)

;; Check user state
(contract-call? .bitsave get-savings tx-sender)
(contract-call? .bitsave get-reputation tx-sender)
```

### Network Connectivity Tests
```bash
# Test Stacks API connectivity
curl -X GET "https://stacks-node-api.mainnet.stacks.co/v2/info"

# Check account balance
curl -X GET "https://stacks-node-api.mainnet.stacks.co/v2/accounts/<address>"

# Verify contract deployment
curl -X GET "https://stacks-node-api.mainnet.stacks.co/v2/contracts/interface/<address>/<contract>"
```

### Transaction Debugging
```bash
# Check transaction status
curl -X GET "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/<tx-id>"

# View transaction events
curl -X GET "https://stacks-node-api.mainnet.stacks.co/extended/v1/tx/<tx-id>/events"
```

## Error Code Reference

| Code | Constant | Description | Solution |
|------|----------|-------------|----------|
| 100 | ERR_NO_AMOUNT | Amount must be > 0 | Use positive amount |
| 101 | ERR_ALREADY_DEPOSITED | User has active deposit | Withdraw first |
| 102 | ERR_ALREADY_WITHDRAWN | Deposit already claimed | Make new deposit |
| 103 | ERR_LOCK_ACTIVE | Lock period active (deprecated) | N/A |
| 104 | ERR_NO_DEPOSIT | No active deposit | Make deposit first |
| 105 | ERR_NOT_AUTHORIZED | Admin function access denied | Use admin account |
| 106 | ERR_CONTRACT_PAUSED | Contract paused | Wait for unpause |
| 107 | ERR_BELOW_MINIMUM | Amount below minimum | Increase amount |
| 108 | ERR_EXCEEDS_MAXIMUM | Amount above maximum | Reduce amount |
| 109 | ERR_WITHDRAWAL_COOLDOWN | Cooldown period active | Wait for cooldown |

## Recovery Procedures

### User Account Recovery
1. **Lost Deposit**: Check savings with `get-savings`
2. **Missing Reputation**: Verify with `get-reputation`
3. **Badge Issues**: Check ownership with badge contract
4. **Referral Problems**: Verify with referral contract

### System Recovery
1. **Contract Pause**: Admin can unpause system
2. **Parameter Reset**: Admin can restore safe defaults
3. **Upgrade Issues**: Disable upgrade and rollback
4. **Data Corruption**: Use event logs to reconstruct state

### Emergency Contacts
- **Technical Issues**: Check GitHub issues
- **Security Concerns**: Contact admin immediately
- **User Support**: Refer to documentation
- **Bug Reports**: Submit detailed reproduction steps

## Prevention Best Practices

### For Users
1. **Check Requirements**: Verify minimum deposit before transaction
2. **Confirm Network**: Ensure correct network (mainnet/testnet)
3. **Monitor Status**: Check contract pause status
4. **Plan Timing**: Consider cooldown periods
5. **Backup Keys**: Secure wallet access

### For Developers
1. **Input Validation**: Always validate parameters
2. **Error Handling**: Implement comprehensive error handling
3. **State Checks**: Verify contract state before operations
4. **Testing**: Use testnet for development
5. **Monitoring**: Implement health checks

### For Administrators
1. **Parameter Changes**: Test on testnet first
2. **Emergency Procedures**: Have rollback plans ready
3. **Monitoring**: Watch for unusual activity
4. **Communication**: Announce maintenance windows
5. **Security**: Protect admin keys

## Getting Help

### Self-Service Resources
1. **API Documentation**: Complete function reference
2. **User Guide**: Step-by-step instructions
3. **FAQ**: Common questions and answers
4. **Code Examples**: Integration samples

### Community Support
1. **GitHub Issues**: Bug reports and feature requests
2. **Discord/Telegram**: Community discussions
3. **Stack Overflow**: Technical questions
4. **Documentation**: Comprehensive guides

### Professional Support
1. **Security Audits**: Professional security review
2. **Integration Help**: Custom implementation support
3. **Performance Optimization**: System tuning
4. **Training**: Team education and onboarding

Remember: Always test solutions on testnet before applying to mainnet!
