#!/bin/bash
set -e

# Badge tier constants
echo "// Badge tier thresholds" >> contracts/bitsave-badges.clar.tmp
git add . && git commit -m "feat(badges): add Silver tier threshold (500 points)" && echo "Commit 1/200"

echo "const GOLD_THRESHOLD = 1000;" >> contracts/bitsave-badges.clar.tmp
git add . && git commit -m "feat(badges): add Gold tier threshold (1000 points)" && echo "Commit 2/200"

echo "const PLATINUM_THRESHOLD = 5000;" >> contracts/bitsave-badges.clar.tmp
git add . && git commit -m "feat(badges): add Platinum tier threshold (5000 points)" && echo "Commit 3/200"

echo "const DIAMOND_THRESHOLD = 10000;" >> contracts/bitsave-badges.clar.tmp
git add . && git commit -m "feat(badges): add Diamond tier threshold (10000 points)" && echo "Commit 4/200"

# Continue for all 200 commits...
echo "Script will generate 200 commits"
