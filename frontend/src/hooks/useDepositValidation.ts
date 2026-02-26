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
