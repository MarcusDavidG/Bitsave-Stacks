# BitSave Developer Documentation

## Architecture

BitSave consists of multiple smart contracts:

- `bitsave.clar` - Main savings contract
- `bitsave-badges.clar` - NFT badge system
- `bitsave-validation.clar` - Input validation
- `bitsave-events.clar` - Event logging

## Development Setup

```bash
# Install Clarinet
npm install -g @hirosystems/clarinet

# Clone repository
git clone <repo-url>
cd bitsave-stacks

# Run tests
clarinet test

# Deploy locally
clarinet deploy --testnet
```

## Testing

Run the full test suite:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new features
4. Submit pull request
