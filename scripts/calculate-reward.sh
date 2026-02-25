#!/bin/bash

# Calculate reward for given amount and period
AMOUNT=$1
LOCK_PERIOD=$2
REWARD_RATE=10

if [ -z "$AMOUNT" ] || [ -z "$LOCK_PERIOD" ]; then
  echo "Usage: ./calculate-reward.sh <amount> <lock-period>"
  exit 1
fi

REWARD=$((AMOUNT * REWARD_RATE / 100))
echo "Reward for $AMOUNT STX locked for $LOCK_PERIOD blocks: $REWARD STX"
