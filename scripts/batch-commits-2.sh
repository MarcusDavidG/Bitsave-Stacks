#!/bin/bash
cd /home/marcus/Bitsave-Stacks
c=0
mc() { echo "$2" >> "$1"; git add .; git commit -m "$3" -q; ((c++)); echo "[$c/200] $3"; }

# 11-20: More badge constants
mc "contracts/bitsave-badges.clar" "(define-constant STREAK_365_DAYS u365)" "feat(badges): add 365-day streak"
mc "contracts/bitsave-badges.clar" ";; Deposit milestone thresholds" "docs(badges): add deposit milestones"
mc "contracts/bitsave-badges.clar" "(define-constant DEPOSIT_1K u1000000000)" "feat(badges): add 1K STX milestone"
mc "contracts/bitsave-badges.clar" "(define-constant DEPOSIT_10K u10000000000)" "feat(badges): add 10K STX milestone"
mc "contracts/bitsave-badges.clar" "(define-constant DEPOSIT_100K u100000000000)" "feat(badges): add 100K STX milestone"
mc "contracts/bitsave-badges.clar" "(define-constant DEPOSIT_1M u1000000000000)" "feat(badges): add 1M STX milestone"
mc "contracts/bitsave-badges.clar" "(define-constant EARLY_ADOPTER_BLOCK u1000)" "feat(badges): add early adopter threshold"
mc "contracts/bitsave-badges.clar" ";; Referral badge thresholds" "docs(badges): add referral section"
mc "contracts/bitsave-badges.clar" "(define-constant REFERRAL_1 u1)" "feat(badges): add 1 referral badge"
mc "contracts/bitsave-badges.clar" "(define-constant REFERRAL_5 u5)" "feat(badges): add 5 referral badge"

# 21-30: Badge metadata
mc "contracts/bitsave-badges.clar" "(define-constant REFERRAL_10 u10)" "feat(badges): add 10 referral badge"
mc "contracts/bitsave-badges.clar" "(define-constant REFERRAL_25 u25)" "feat(badges): add 25 referral badge"
mc "contracts/bitsave-badges.clar" "(define-constant REFERRAL_50 u50)" "feat(badges): add 50 referral badge"
mc "contracts/bitsave-badges.clar" ";; Badge rarity levels" "docs(badges): add rarity system"
mc "contracts/bitsave-badges.clar" "(define-constant RARITY_COMMON u1)" "feat(badges): add common rarity"
mc "contracts/bitsave-badges.clar" "(define-constant RARITY_UNCOMMON u2)" "feat(badges): add uncommon rarity"
mc "contracts/bitsave-badges.clar" "(define-constant RARITY_RARE u3)" "feat(badges): add rare rarity"
mc "contracts/bitsave-badges.clar" "(define-constant RARITY_EPIC u4)" "feat(badges): add epic rarity"
mc "contracts/bitsave-badges.clar" "(define-constant RARITY_LEGENDARY u5)" "feat(badges): add legendary rarity"
mc "contracts/bitsave-badges.clar" ";; Badge type identifiers" "docs(badges): add badge types"

# 31-40: Badge maps
mc "contracts/bitsave-badges.clar" "(define-map badge-rarity uint uint)" "feat(badges): add rarity tracking map"
mc "contracts/bitsave-badges.clar" "(define-map badge-tier uint uint)" "feat(badges): add tier tracking map"
mc "contracts/bitsave-badges.clar" "(define-map badge-timestamp uint uint)" "feat(badges): add timestamp map"
mc "contracts/bitsave-badges.clar" "(define-map user-badge-count principal uint)" "feat(badges): add user badge counter"
mc "contracts/bitsave-badges.clar" "(define-map badge-transferable uint bool)" "feat(badges): add transfer restriction map"
mc "contracts/bitsave-badges.clar" "(define-data-var total-badges-minted uint u0)" "feat(badges): add total minted counter"
mc "contracts/bitsave-badges.clar" "(define-data-var badges-burned uint u0)" "feat(badges): add burned counter"
mc "contracts/bitsave-badges.clar" ";; Badge name registry" "docs(badges): add name registry"
mc "contracts/bitsave-badges.clar" "(define-map badge-names uint (string-ascii 50))" "feat(badges): add badge name map"
mc "contracts/bitsave-badges.clar" "(define-map badge-descriptions uint (string-utf8 256))" "feat(badges): add description map"

echo "Completed 40 commits!"
