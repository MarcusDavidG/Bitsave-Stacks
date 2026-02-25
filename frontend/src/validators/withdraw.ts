export const validateWithdrawal = (unlockHeight: number, currentHeight: number) => {
  if (currentHeight < unlockHeight) {
    return { valid: false, error: 'Funds still locked' };
  }
  return { valid: true };
};
