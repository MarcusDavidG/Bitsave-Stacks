export const validateAmount = (amount: string) => {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num <= 1000000;
};
