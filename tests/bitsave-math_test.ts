import { describe, it, expect, beforeEach } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const deployer = accounts.get('deployer')!;

describe('BitSave Math Utilities', () => {
  beforeEach(() => {
    simnet.deployContract(
      'bitsave-math',
      readFileSync('./contracts/bitsave-math.clar', 'utf8'),
      null,
      deployer
    );
  });

  it('should calculate simple interest correctly', () => {
    const result = simnet.callReadOnlyFn(
      'bitsave-math',
      'calculate-simple-interest',
      [Cl.uint(1000000), Cl.uint(10), Cl.uint(1)], // 1 STX, 10% rate, 1 period
      deployer
    );
    expect(result.result).toBeUint(1100000); // 1.1 STX
  });

  it('should calculate reputation points based on amount and lock period', () => {
    const result = simnet.callReadOnlyFn(
      'bitsave-math',
      'calculate-reputation-points',
      [Cl.uint(10000000), Cl.uint(1440)], // 10 STX, 1 day lock
      deployer
    );
    expect(result.result).toBeUint(20); // 10 base + 10 bonus
  });

  it('should handle safe division with zero denominator', () => {
    const result = simnet.callReadOnlyFn(
      'bitsave-math',
      'safe-divide',
      [Cl.uint(100), Cl.uint(0)],
      deployer
    );
    expect(result.result).toBeUint(0);
  });

  it('should perform safe division with rounding', () => {
    const result = simnet.callReadOnlyFn(
      'bitsave-math',
      'safe-divide',
      [Cl.uint(7), Cl.uint(3)],
      deployer
    );
    expect(result.result).toBeUint(2); // Rounded down
  });
});
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
<!-- update 11 -->
<!-- update 12 -->
<!-- update 13 -->
<!-- update 14 -->
<!-- update 15 -->
<!-- update 16 -->
<!-- update 17 -->
<!-- update 18 -->
<!-- update 19 -->
<!-- update 20 -->
<!-- update 21 -->
<!-- update 22 -->
<!-- update 23 -->
<!-- update 24 -->
<!-- update 25 -->
<!-- update 26 -->
<!-- update 27 -->
<!-- update 28 -->
<!-- update 29 -->
<!-- update 30 -->
<!-- update 31 -->
<!-- update 32 -->
<!-- update 33 -->
<!-- update 34 -->
<!-- update 35 -->
<!-- update 36 -->
<!-- update 37 -->
<!-- update 38 -->
<!-- update 39 -->
<!-- update 40 -->
<!-- update 1 -->
