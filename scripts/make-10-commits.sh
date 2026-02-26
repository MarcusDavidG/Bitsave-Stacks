#!/bin/bash

# BitSave - Incremental Commits Script
# Makes small, meaningful commits to enhance the project

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"
}

commit_and_push() {
    local msg="$1"
    git add .
    git commit -m "$msg"
    log "✅ Committed: $msg"
}

# Start with first 10 commits
log "🚀 Starting BitSave incremental enhancements..."

# Commit 1: Add input validation constants
cat > contracts/bitsave-validation-constants.clar << 'EOF'
;; BitSave Validation Constants
;; Centralized validation constants for the BitSave protocol

(define-constant MIN-DEPOSIT-AMOUNT u1000000) ;; 1 STX minimum
(define-constant MAX-DEPOSIT-AMOUNT u100000000000) ;; 100k STX maximum  
(define-constant MIN-LOCK-BLOCKS u144) ;; ~1 day minimum
(define-constant MAX-LOCK-BLOCKS u52560) ;; ~1 year maximum
(define-constant REPUTATION-MULTIPLIER u10) ;; 10 points per STX
EOF
commit_and_push "feat: add validation constants for deposits and lock periods"

# Commit 2: Enhance error handling
cat >> contracts/bitsave-validation-constants.clar << 'EOF'

;; Error constants
(define-constant ERR-INVALID-AMOUNT (err u1001))
(define-constant ERR-INVALID-LOCK-PERIOD (err u1002))
(define-constant ERR-INSUFFICIENT-BALANCE (err u1003))
(define-constant ERR-DEPOSIT-LOCKED (err u1004))
(define-constant ERR-UNAUTHORIZED (err u1005))
EOF
commit_and_push "feat: add comprehensive error constants for better debugging"

# Commit 3: Add utility functions
cat > contracts/bitsave-utils.clar << 'EOF'
;; BitSave Utility Functions
;; Helper functions for common operations

(use-trait sip-010-trait .sip-010-trait.sip-010-trait)

(define-read-only (blocks-to-days (blocks uint))
  (/ blocks u144))

(define-read-only (days-to-blocks (days uint))
  (* days u144))

(define-read-only (calculate-basic-reward (amount uint) (rate uint))
  (/ (* amount rate) u10000))

(define-read-only (is-valid-principal (address principal))
  (not (is-eq address 'SP000000000000000000002Q6VF78)))
EOF
commit_and_push "feat: add utility functions for time and reward calculations"

# Commit 4: Improve badge metadata
cat > contracts/bitsave-badge-metadata.clar << 'EOF'
;; BitSave Badge Metadata
;; Enhanced metadata structure for achievement badges

(define-map badge-metadata uint {
  name: (string-ascii 64),
  description: (string-ascii 256),
  tier: (string-ascii 16),
  threshold: uint,
  rarity: (string-ascii 16),
  image-uri: (string-ascii 256)
})

(define-read-only (get-badge-info (token-id uint))
  (map-get? badge-metadata token-id))

(define-public (set-badge-metadata (token-id uint) (metadata {name: (string-ascii 64), description: (string-ascii 256), tier: (string-ascii 16), threshold: uint, rarity: (string-ascii 16), image-uri: (string-ascii 256)}))
  (begin
    (map-set badge-metadata token-id metadata)
    (ok true)))
EOF
commit_and_push "feat: enhance badge metadata with tier and rarity information"

# Commit 5: Add time-based rewards
cat > contracts/bitsave-time-rewards.clar << 'EOF'
;; BitSave Time-Based Rewards
;; Additional rewards based on lock duration

(define-constant TIME-BONUS-THRESHOLD-1 u1440) ;; 10 days
(define-constant TIME-BONUS-THRESHOLD-2 u4320) ;; 30 days  
(define-constant TIME-BONUS-THRESHOLD-3 u12960) ;; 90 days

(define-constant TIME-BONUS-RATE-1 u150) ;; 1.5% bonus
(define-constant TIME-BONUS-RATE-2 u300) ;; 3% bonus
(define-constant TIME-BONUS-RATE-3 u500) ;; 5% bonus

(define-read-only (get-time-bonus-rate (lock-period uint))
  (if (>= lock-period TIME-BONUS-THRESHOLD-3)
    TIME-BONUS-RATE-3
    (if (>= lock-period TIME-BONUS-THRESHOLD-2)
      TIME-BONUS-RATE-2
      (if (>= lock-period TIME-BONUS-THRESHOLD-1)
        TIME-BONUS-RATE-1
        u0))))

(define-read-only (calculate-time-bonus (base-reward uint) (lock-period uint))
  (let ((bonus-rate (get-time-bonus-rate lock-period)))
    (/ (* base-reward bonus-rate) u10000)))
EOF
commit_and_push "feat: add time-based bonus rewards for longer lock periods"

# Commit 6: Improve frontend loading states
mkdir -p frontend/src/components/ui
cat > frontend/src/components/ui/loading-spinner.tsx << 'EOF'
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`} />
  );
};
EOF
commit_and_push "feat: add reusable loading spinner component"

# Commit 7: Add deposit validation hook
cat > frontend/src/hooks/useDepositValidation.ts << 'EOF'
import { useMemo } from 'react';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const useDepositValidation = (amount: string, lockPeriod: number): ValidationResult => {
  return useMemo(() => {
    const errors: string[] = [];
    const numAmount = parseFloat(amount);

    if (!amount || isNaN(numAmount)) {
      errors.push('Please enter a valid amount');
    } else if (numAmount < 1) {
      errors.push('Minimum deposit is 1 STX');
    } else if (numAmount > 100000) {
      errors.push('Maximum deposit is 100,000 STX');
    }

    if (lockPeriod < 1) {
      errors.push('Minimum lock period is 1 day');
    } else if (lockPeriod > 365) {
      errors.push('Maximum lock period is 365 days');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }, [amount, lockPeriod]);
};
EOF
commit_and_push "feat: add deposit validation hook for form validation"

# Commit 8: Enhance transaction status display
cat > frontend/src/components/transaction-status.tsx << 'EOF'
import React from 'react';
import { LoadingSpinner } from './ui/loading-spinner';

interface TransactionStatusProps {
  status: 'idle' | 'pending' | 'success' | 'error';
  txId?: string;
  error?: string;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status,
  txId,
  error
}) => {
  if (status === 'idle') return null;

  return (
    <div className="mt-4 p-4 rounded-lg border">
      {status === 'pending' && (
        <div className="flex items-center space-x-2 text-blue-600">
          <LoadingSpinner size="sm" />
          <span>Transaction pending...</span>
        </div>
      )}
      
      {status === 'success' && (
        <div className="text-green-600">
          <p>✅ Transaction successful!</p>
          {txId && (
            <p className="text-sm mt-1">
              TX: <code className="bg-gray-100 px-1 rounded">{txId}</code>
            </p>
          )}
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-red-600">
          <p>❌ Transaction failed</p>
          {error && <p className="text-sm mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
};
EOF
commit_and_push "feat: add transaction status component with loading states"

# Commit 9: Add reputation calculation utilities
cat > frontend/src/lib/reputation-utils.ts << 'EOF'
export const calculateReputationPoints = (amount: number, lockDays: number): number => {
  const basePoints = amount * 10; // 10 points per STX
  const timeMultiplier = Math.min(lockDays / 30, 12); // Max 12x for 1 year
  return Math.floor(basePoints * (1 + timeMultiplier * 0.1));
};

export const getReputationTier = (points: number): string => {
  if (points >= 10000) return 'Diamond';
  if (points >= 5000) return 'Platinum';
  if (points >= 1000) return 'Gold';
  if (points >= 500) return 'Silver';
  if (points >= 100) return 'Bronze';
  return 'Novice';
};

export const getNextTierThreshold = (points: number): number => {
  if (points < 100) return 100;
  if (points < 500) return 500;
  if (points < 1000) return 1000;
  if (points < 5000) return 5000;
  if (points < 10000) return 10000;
  return 0; // Max tier reached
};
EOF
commit_and_push "feat: add reputation calculation and tier utilities"

# Commit 10: Improve error boundary
cat > frontend/src/components/error-boundary.tsx << 'EOF'
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
EOF
commit_and_push "feat: add comprehensive error boundary component"

log "🎉 First 10 commits completed! Run the script again to continue with more commits."
log "📊 Progress: 10/100 commits (10%)"
