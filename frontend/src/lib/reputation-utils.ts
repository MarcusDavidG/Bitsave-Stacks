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
