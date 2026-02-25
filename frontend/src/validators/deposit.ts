export const validateDeposit = (amount: number, lockPeriod: number) => {
  if (amount < 1) return { valid: false, error: 'Minimum 1 STX' };
  if (amount > 100000) return { valid: false, error: 'Maximum 100,000 STX' };
  if (lockPeriod < 144) return { valid: false, error: 'Minimum 1 day lock' };
  return { valid: true };
};
