import { openContractCall } from '@stacks/connect';

export const depositService = {
  async deposit(amount: number, lockPeriod: number) {
    return openContractCall({
      contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      contractName: 'bitsave',
      functionName: 'deposit',
      functionArgs: [/* args */],
    });
  }
};
