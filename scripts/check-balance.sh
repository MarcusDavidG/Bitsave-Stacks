#!/bin/bash

# Check contract balance
CONTRACT_ADDRESS=$1

if [ -z "$CONTRACT_ADDRESS" ]; then
  echo "Usage: ./check-balance.sh <contract-address>"
  exit 1
fi

echo "Checking balance for: $CONTRACT_ADDRESS"
stx balance $CONTRACT_ADDRESS
