import { describe, it, expect, beforeEach } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const deployer = accounts.get('deployer')!;

describe('BitSave Validation Utilities', () => {
  beforeEach(() => {
    simnet.deployContract(
      'bitsave-validation',
      readFileSync('./contracts/bitsave-validation.clar', 'utf8'),
      null,
      deployer
    );
  });

  describe('Lock Period Validation', () => {
    it('should accept valid lock periods', () => {
      const result = simnet.callReadOnlyFn(
        'bitsave-validation',
        'is-valid-lock-period',
        [Cl.uint(1440)], // 10 days
        deployer
      );
      expect(result.result).toBeBool(true);
    });

    it('should reject lock periods that are too short', () => {
      const result = simnet.callReadOnlyFn(
        'bitsave-validation',
        'is-valid-lock-period',
        [Cl.uint(100)], // Less than minimum
        deployer
      );
      expect(result.result).toBeBool(false);
    });

    it('should reject lock periods that are too long', () => {
      const result = simnet.callReadOnlyFn(
        'bitsave-validation',
        'is-valid-lock-period',
        [Cl.uint(2000000)], // More than maximum
        deployer
      );
      expect(result.result).toBeBool(false);
    });
  });

  describe('Deposit Amount Validation', () => {
    it('should accept valid deposit amounts', () => {
      const result = simnet.callReadOnlyFn(
        'bitsave-validation',
        'is-valid-deposit-amount',
        [Cl.uint(5000000)], // 5 STX
        deployer
      );
      expect(result.result).toBeBool(true);
    });

    it('should reject amounts below minimum', () => {
      const result = simnet.callReadOnlyFn(
        'bitsave-validation',
        'is-valid-deposit-amount',
        [Cl.uint(500000)], // 0.5 STX
        deployer
      );
      expect(result.result).toBeBool(false);
    });
  });

  describe('Reward Rate Validation', () => {
    it('should accept valid reward rates', () => {
      const result = simnet.callReadOnlyFn(
        'bitsave-validation',
        'is-valid-reward-rate',
        [Cl.uint(15)], // 15%
        deployer
      );
      expect(result.result).toBeBool(true);
    });

    it('should reject rates above 100%', () => {
      const result = simnet.callReadOnlyFn(
        'bitsave-validation',
        'is-valid-reward-rate',
        [Cl.uint(150)], // 150%
        deployer
      );
      expect(result.result).toBeBool(false);
    });
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
