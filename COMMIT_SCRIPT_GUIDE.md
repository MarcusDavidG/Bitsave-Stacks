# Commit & PR Generation Script Guide

## What it does
`scripts/run-1000-commits.sh` generates ~1000 commits across 25 PRs and pushes them to GitHub.
Each PR contains 40 commits touching real project files (contracts, docs, config).
All commits are dated today (no backdating).

## Prerequisites

### 1. Install GitHub CLI (`gh`)
```bash
sudo apt remove gitsome -y
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update && sudo apt install gh -y
```

### 2. Authenticate GitHub CLI
```bash
gh auth login
# Choose: GitHub.com → HTTPS → Yes → Login with a web browser
# Follow the browser prompt to complete auth
```

### 3. Verify setup
```bash
gh auth status        # should show: Logged in as MarcusDavidG
git remote -v         # should show: origin https://github.com/MarcusDavidG/Bitsave-Stacks.git
```

## Run the script
```bash
cd ~/Bitsave-Stacks
bash scripts/run-1000-commits.sh
```

## What happens
- Creates 25 branches: `pr01-cleanup` through `pr25-changelog`
- Makes 40 commits per branch on files like `contracts/bitsave.clar`, `docs/API.md`, `README.md`, etc.
- Opens a PR for each branch and merges it into `main`
- Deletes the branch after merge

## Notes
- Safe to re-run: existing branches are reused, existing PRs are skipped
- All commits reflect the current date (shows on GitHub contribution graph today)
- GitHub repo: https://github.com/MarcusDavidG/Bitsave-Stacks
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
