# Testing Guide

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- bitsave_test.ts

# Run with coverage
npm run test:coverage
```

## Test Categories

### Unit Tests
- Individual function testing
- Input validation
- Error handling

### Integration Tests
- Multi-contract interactions
- Badge minting flow
- Deposit/withdrawal cycles

### Security Tests
- Reentrancy protection
- Overflow protection
- Authorization checks

## Writing Tests

```typescript
Clarinet.test({
  name: "Test description",
  async fn(chain: Chain, accounts: Map<string, Account>) {
    // Test implementation
  }
});
```
