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
