import { openContractCall } from '@stacks/connect';

export const withdrawService = {
  async withdraw() {
    return openContractCall({
      contractAddress: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
      contractName: 'bitsave',
      functionName: 'withdraw',
      functionArgs: [],
    });
  }
};
