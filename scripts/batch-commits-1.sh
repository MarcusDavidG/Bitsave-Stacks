#!/bin/bash
# Efficient 200 commit generator
cd /home/marcus/Bitsave-Stacks

# Function to make a commit
make_commit() {
    echo "$2" >> "$1"
    git add .
    git commit -m "$3"
    echo "✓ $3"
}

# Commits 4-10: Badge thresholds
make_commit "contracts/bitsave-badges.clar" "(define-constant GOLD_THRESHOLD u1000)" "feat(badges): add Gold tier threshold"
make_commit "contracts/bitsave-badges.clar" "(define-constant PLATINUM_THRESHOLD u5000)" "feat(badges): add Platinum tier threshold"
make_commit "contracts/bitsave-badges.clar" "(define-constant DIAMOND_THRESHOLD u10000)" "feat(badges): add Diamond tier threshold"
make_commit "contracts/bitsave-badges.clar" ";; Time-based badge thresholds" "docs(badges): add time-based badge section"
make_commit "contracts/bitsave-badges.clar" "(define-constant STREAK_30_DAYS u30)" "feat(badges): add 30-day streak threshold"
make_commit "contracts/bitsave-badges.clar" "(define-constant STREAK_90_DAYS u90)" "feat(badges): add 90-day streak threshold"
make_commit "contracts/bitsave-badges.clar" "(define-constant STREAK_180_DAYS u180)" "feat(badges): add 180-day streak threshold"

echo "Generated 10 commits so far..."
