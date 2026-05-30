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
