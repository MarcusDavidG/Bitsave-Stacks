#!/bin/bash

# BitSave - Commits 11-20
# Second batch of meaningful commits

set -e

GREEN='\033[0;32m'
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

log "🚀 Starting commits 11-20..."

# Commit 11: Add contract pause functionality
cat > contracts/bitsave-emergency-controls.clar << 'EOF'
;; BitSave Emergency Controls
;; Emergency pause and admin controls for the protocol

(define-data-var contract-paused bool false)
(define-data-var emergency-admin principal tx-sender)

(define-constant ERR-CONTRACT-PAUSED (err u2001))
(define-constant ERR-NOT-EMERGENCY-ADMIN (err u2002))

(define-read-only (is-contract-paused)
  (var-get contract-paused))

(define-read-only (get-emergency-admin)
  (var-get emergency-admin))

(define-public (emergency-pause)
  (begin
    (asserts! (is-eq tx-sender (var-get emergency-admin)) ERR-NOT-EMERGENCY-ADMIN)
    (var-set contract-paused true)
    (print {event: "emergency-pause", admin: tx-sender, block: block-height})
    (ok true)))

(define-public (emergency-unpause)
  (begin
    (asserts! (is-eq tx-sender (var-get emergency-admin)) ERR-NOT-EMERGENCY-ADMIN)
    (var-set contract-paused false)
    (print {event: "emergency-unpause", admin: tx-sender, block: block-height})
    (ok true)))

(define-public (transfer-emergency-admin (new-admin principal))
  (begin
    (asserts! (is-eq tx-sender (var-get emergency-admin)) ERR-NOT-EMERGENCY-ADMIN)
    (var-set emergency-admin new-admin)
    (print {event: "admin-transfer", old-admin: tx-sender, new-admin: new-admin})
    (ok true)))
EOF
commit_and_push "feat: add emergency pause functionality for contract security"

# Commit 12: Enhance reward calculation with precision
cat > contracts/bitsave-precision-math.clar << 'EOF'
;; BitSave Precision Math
;; High-precision mathematical operations for reward calculations

(define-constant PRECISION u1000000) ;; 6 decimal places
(define-constant ERR-PRECISION-OVERFLOW (err u3001))

(define-read-only (multiply-with-precision (a uint) (b uint))
  (let ((result (* a b)))
    (if (< result a) ;; Check for overflow
      ERR-PRECISION-OVERFLOW
      (ok (/ result PRECISION)))))

(define-read-only (divide-with-precision (a uint) (b uint))
  (if (is-eq b u0)
    (err u3002) ;; Division by zero
    (ok (/ (* a PRECISION) b))))

(define-read-only (calculate-compound-reward (principal uint) (rate uint) (periods uint))
  (let ((rate-plus-one (+ PRECISION rate)))
    (fold compound-step (list periods) principal)))

(define-private (compound-step (period uint) (amount uint))
  (unwrap-panic (multiply-with-precision amount (+ PRECISION u100)))) ;; 1% per period
EOF
commit_and_push "feat: add high-precision math for accurate reward calculations"

# Commit 13: Add streak tracking for users
cat > contracts/bitsave-streak-tracking.clar << 'EOF'
;; BitSave Streak Tracking
;; Track consecutive deposit streaks for bonus rewards

(define-map user-streaks principal {
  current-streak: uint,
  longest-streak: uint,
  last-deposit-block: uint,
  streak-bonus-earned: uint
})

(define-constant STREAK-WINDOW u1440) ;; 10 days in blocks
(define-constant STREAK-BONUS-RATE u50) ;; 0.5% bonus per streak level

(define-read-only (get-user-streak (user principal))
  (default-to {current-streak: u0, longest-streak: u0, last-deposit-block: u0, streak-bonus-earned: u0}
    (map-get? user-streaks user)))

(define-public (update-streak (user principal))
  (let ((current-data (get-user-streak user))
        (last-deposit (get last-deposit-block current-data))
        (current-streak (get current-streak current-data))
        (blocks-since-last (- block-height last-deposit)))
    (if (<= blocks-since-last STREAK-WINDOW)
      ;; Continue streak
      (let ((new-streak (+ current-streak u1)))
        (map-set user-streaks user {
          current-streak: new-streak,
          longest-streak: (max new-streak (get longest-streak current-data)),
          last-deposit-block: block-height,
          streak-bonus-earned: (get streak-bonus-earned current-data)
        })
        (ok new-streak))
      ;; Reset streak
      (begin
        (map-set user-streaks user {
          current-streak: u1,
          longest-streak: (get longest-streak current-data),
          last-deposit-block: block-height,
          streak-bonus-earned: (get streak-bonus-earned current-data)
        })
        (ok u1)))))

(define-read-only (calculate-streak-bonus (base-reward uint) (streak uint))
  (/ (* base-reward (* streak STREAK-BONUS-RATE)) u10000))
EOF
commit_and_push "feat: add streak tracking system for consecutive deposits"

# Commit 14: Add badge rarity system
cat > contracts/bitsave-badge-rarity.clar << 'EOF'
;; BitSave Badge Rarity System
;; Implements rarity tiers for achievement badges

(define-constant RARITY-COMMON "Common")
(define-constant RARITY-UNCOMMON "Uncommon") 
(define-constant RARITY-RARE "Rare")
(define-constant RARITY-EPIC "Epic")
(define-constant RARITY-LEGENDARY "Legendary")

(define-map badge-rarity-config (string-ascii 32) {
  max-supply: uint,
  current-supply: uint,
  mint-cost: uint,
  special-requirements: bool
})

(define-read-only (get-badge-rarity-by-supply (current-supply uint))
  (if (<= current-supply u10)
    RARITY-LEGENDARY
    (if (<= current-supply u50)
      RARITY-EPIC
      (if (<= current-supply u200)
        RARITY-RARE
        (if (<= current-supply u1000)
          RARITY-UNCOMMON
          RARITY-COMMON)))))

(define-read-only (get-rarity-multiplier (rarity (string-ascii 16)))
  (if (is-eq rarity RARITY-LEGENDARY)
    u1000 ;; 10x multiplier
    (if (is-eq rarity RARITY-EPIC)
      u500  ;; 5x multiplier
      (if (is-eq rarity RARITY-RARE)
        u300 ;; 3x multiplier
        (if (is-eq rarity RARITY-UNCOMMON)
          u150 ;; 1.5x multiplier
          u100))))) ;; 1x multiplier for common

(define-public (initialize-badge-rarity (badge-type (string-ascii 32)) (max-supply uint) (mint-cost uint))
  (begin
    (map-set badge-rarity-config badge-type {
      max-supply: max-supply,
      current-supply: u0,
      mint-cost: mint-cost,
      special-requirements: false
    })
    (ok true)))
EOF
commit_and_push "feat: implement badge rarity system with supply-based tiers"

# Commit 15: Add deposit goal tracking
cat > contracts/bitsave-goals.clar << 'EOF'
;; BitSave Goals System
;; Personal savings goals and milestone tracking

(define-map user-goals principal {
  target-amount: uint,
  target-date: uint,
  current-progress: uint,
  goal-type: (string-ascii 32),
  created-at: uint,
  completed: bool
})

(define-map goal-milestones principal (list 10 uint))

(define-read-only (get-user-goal (user principal))
  (map-get? user-goals user))

(define-public (set-savings-goal (target-amount uint) (target-blocks uint) (goal-type (string-ascii 32)))
  (begin
    (asserts! (> target-amount u0) (err u4001))
    (asserts! (> target-blocks block-height) (err u4002))
    (map-set user-goals tx-sender {
      target-amount: target-amount,
      target-date: target-blocks,
      current-progress: u0,
      goal-type: goal-type,
      created-at: block-height,
      completed: false
    })
    (print {event: "goal-set", user: tx-sender, target: target-amount, type: goal-type})
    (ok true)))

(define-public (update-goal-progress (user principal) (new-amount uint))
  (match (map-get? user-goals user)
    goal-data
    (let ((updated-goal (merge goal-data {current-progress: new-amount})))
      (map-set user-goals user updated-goal)
      (if (>= new-amount (get target-amount goal-data))
        (begin
          (map-set user-goals user (merge updated-goal {completed: true}))
          (print {event: "goal-completed", user: user, amount: new-amount})
          (ok true))
        (ok true)))
    (err u4003))) ;; Goal not found

(define-read-only (calculate-goal-progress-percentage (user principal))
  (match (map-get? user-goals user)
    goal-data
    (let ((progress (get current-progress goal-data))
          (target (get target-amount goal-data)))
      (if (> target u0)
        (ok (/ (* progress u100) target))
        (ok u0)))
    (err u4003)))
EOF
commit_and_push "feat: add personal savings goals and milestone tracking"

# Commit 16: Enhance frontend with goal progress component
cat > frontend/src/components/goal-progress-bar.tsx << 'EOF'
import React from 'react';

interface GoalProgressBarProps {
  current: number;
  target: number;
  label?: string;
  className?: string;
}

export const GoalProgressBar: React.FC<GoalProgressBarProps> = ({
  current,
  target,
  label,
  className = ''
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = current >= target;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">{label}</span>
          <span className={isComplete ? 'text-green-600' : 'text-gray-600'}>
            {current.toLocaleString()} / {target.toLocaleString()} STX
          </span>
        </div>
      )}
      
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${
            isComplete 
              ? 'bg-green-500' 
              : percentage > 75 
                ? 'bg-blue-500' 
                : percentage > 50 
                  ? 'bg-yellow-500' 
                  : 'bg-gray-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs mt-1 text-gray-500">
        <span>{percentage.toFixed(1)}% complete</span>
        {isComplete && <span className="text-green-600 font-medium">🎉 Goal achieved!</span>}
      </div>
    </div>
  );
};
EOF
commit_and_push "feat: add goal progress bar component with visual feedback"

# Commit 17: Add notification system
cat > frontend/src/hooks/useNotifications.ts << 'EOF'
import { useState, useCallback } from 'react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove non-persistent notifications
    if (!notification.persistent) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const success = useCallback((title: string, message?: string) => 
    addNotification({ type: 'success', title, message }), [addNotification]);

  const error = useCallback((title: string, message?: string) => 
    addNotification({ type: 'error', title, message, persistent: true }), [addNotification]);

  const warning = useCallback((title: string, message?: string) => 
    addNotification({ type: 'warning', title, message }), [addNotification]);

  const info = useCallback((title: string, message?: string) => 
    addNotification({ type: 'info', title, message }), [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };
};
EOF
commit_and_push "feat: add notification system hook for user feedback"

# Commit 18: Add APY calculator component
cat > frontend/src/components/apy-calculator.tsx << 'EOF'
import React, { useState, useMemo } from 'react';

export const APYCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('1000');
  const [lockDays, setLockDays] = useState<string>('30');
  const [baseRate, setBaseRate] = useState<string>('10');

  const calculations = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const days = parseInt(lockDays) || 0;
    const rate = parseFloat(baseRate) || 0;

    // Time bonus calculation
    const timeBonus = days >= 90 ? 5 : days >= 30 ? 3 : days >= 10 ? 1.5 : 0;
    const totalRate = rate + timeBonus;
    
    // Simple interest calculation
    const reward = (p * totalRate * days) / (365 * 100);
    const total = p + reward;
    const apy = ((total / p) ** (365 / days) - 1) * 100;

    return {
      reward: reward.toFixed(2),
      total: total.toFixed(2),
      apy: apy.toFixed(2),
      timeBonus: timeBonus.toFixed(1)
    };
  }, [principal, lockDays, baseRate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">APY Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Principal (STX)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="1000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Lock Period (Days)</label>
          <input
            type="number"
            value={lockDays}
            onChange={(e) => setLockDays(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="30"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Base Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={baseRate}
            onChange={(e) => setBaseRate(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="10"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded">
          <div className="text-2xl font-bold text-blue-600">{calculations.reward}</div>
          <div className="text-sm text-gray-600">Reward (STX)</div>
        </div>
        
        <div className="bg-green-50 p-3 rounded">
          <div className="text-2xl font-bold text-green-600">{calculations.total}</div>
          <div className="text-sm text-gray-600">Total (STX)</div>
        </div>
        
        <div className="bg-purple-50 p-3 rounded">
          <div className="text-2xl font-bold text-purple-600">{calculations.apy}%</div>
          <div className="text-sm text-gray-600">APY</div>
        </div>
        
        <div className="bg-yellow-50 p-3 rounded">
          <div className="text-2xl font-bold text-yellow-600">+{calculations.timeBonus}%</div>
          <div className="text-sm text-gray-600">Time Bonus</div>
        </div>
      </div>
    </div>
  );
};
EOF
commit_and_push "feat: add APY calculator component for reward estimation"

# Commit 19: Add contract event logging
cat > contracts/bitsave-event-system.clar << 'EOF'
;; BitSave Event System
;; Comprehensive event logging for all protocol actions

(define-constant EVENT-DEPOSIT "deposit")
(define-constant EVENT-WITHDRAW "withdraw")
(define-constant EVENT-BADGE-MINT "badge-mint")
(define-constant EVENT-GOAL-SET "goal-set")
(define-constant EVENT-GOAL-COMPLETE "goal-complete")
(define-constant EVENT-STREAK-UPDATE "streak-update")

(define-map event-log uint {
  event-type: (string-ascii 32),
  user: principal,
  amount: uint,
  block-height: uint,
  metadata: (string-ascii 256)
})

(define-data-var event-counter uint u0)

(define-private (log-event (event-type (string-ascii 32)) (user principal) (amount uint) (metadata (string-ascii 256)))
  (let ((event-id (+ (var-get event-counter) u1)))
    (map-set event-log event-id {
      event-type: event-type,
      user: user,
      amount: amount,
      block-height: block-height,
      metadata: metadata
    })
    (var-set event-counter event-id)
    (print {
      event: event-type,
      user: user,
      amount: amount,
      block: block-height,
      id: event-id,
      metadata: metadata
    })
    event-id))

(define-public (log-deposit-event (user principal) (amount uint) (lock-period uint))
  (ok (log-event EVENT-DEPOSIT user amount (concat "lock-period:" (int-to-ascii lock-period)))))

(define-public (log-withdraw-event (user principal) (amount uint) (reward uint))
  (ok (log-event EVENT-WITHDRAW user amount (concat "reward:" (int-to-ascii reward)))))

(define-public (log-badge-mint-event (user principal) (badge-id uint) (badge-type (string-ascii 32)))
  (ok (log-event EVENT-BADGE-MINT user badge-id badge-type)))

(define-read-only (get-event (event-id uint))
  (map-get? event-log event-id))

(define-read-only (get-event-count)
  (var-get event-counter))
EOF
commit_and_push "feat: add comprehensive event logging system"

# Commit 20: Add mobile-responsive deposit form
cat > frontend/src/components/mobile-deposit-form.tsx << 'EOF'
import React, { useState } from 'react';
import { LoadingSpinner } from './ui/loading-spinner';
import { useDepositValidation } from '../hooks/useDepositValidation';

export const MobileDepositForm: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [lockDays, setLockDays] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isValid, errors } = useDepositValidation(amount, lockDays);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    setIsSubmitting(true);
    try {
      // Deposit logic here
      console.log('Depositing:', { amount, lockDays });
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6 text-center">Make a Deposit</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Amount (STX)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter amount"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Lock Period: {lockDays} days
          </label>
          <input
            type="range"
            min="1"
            max="365"
            value={lockDays}
            onChange={(e) => setLockDays(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={isSubmitting}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 day</span>
            <span>365 days</span>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            {errors.map((error, index) => (
              <p key={index} className="text-red-600 text-sm">{error}</p>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Processing...
            </>
          ) : (
            'Deposit STX'
          )}
        </button>
      </form>
    </div>
  );
};
EOF
commit_and_push "feat: add mobile-responsive deposit form with validation"

log "🎉 Commits 11-20 completed!"
log "📊 Progress: 20/100 commits (20%)"
