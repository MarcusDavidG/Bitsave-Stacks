export const validateDeposit = (amount: number, lockPeriod: number) => {
  if (amount < 1) return { valid: false, error: 'Minimum 1 STX' };
  if (amount > 100000) return { valid: false, error: 'Maximum 100,000 STX' };
  if (lockPeriod < 144) return { valid: false, error: 'Minimum 1 day lock' };
  return { valid: true };
};
<!-- update 1 -->
<!-- update 2 -->
<!-- update 3 -->
<!-- update 4 -->
<!-- update 5 -->
<!-- update 6 -->
<!-- update 7 -->
<!-- update 8 -->
