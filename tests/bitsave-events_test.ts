import { describe, it, expect, beforeEach } from 'vitest';
import { Cl } from '@stacks/transactions';

const accounts = simnet.getAccounts();
const deployer = accounts.get('deployer')!;
const user1 = accounts.get('wallet_1')!;

describe('BitSave Events System', () => {
  beforeEach(() => {
    simnet.deployContract(
      'bitsave-events',
      readFileSync('./contracts/bitsave-events.clar', 'utf8'),
      null,
      deployer
    );
  });

  it('should track event counter correctly', () => {
    const result = simnet.callReadOnlyFn(
      'bitsave-events',
      'get-event-count',
      [],
      deployer
    );
    expect(result.result).toBeUint(0);
  });

  it('should retrieve events by ID', () => {
    const result = simnet.callReadOnlyFn(
      'bitsave-events',
      'get-event',
      [Cl.uint(1)],
      deployer
    );
    expect(result.result).toBeNone();
  });

  it('should handle non-existent events gracefully', () => {
    const result = simnet.callReadOnlyFn(
      'bitsave-events',
      'get-event',
      [Cl.uint(999)],
      deployer
    );
    expect(result.result).toBeNone();
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
