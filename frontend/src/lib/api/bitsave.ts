import { callReadOnlyFunction, cvToValue } from '@stacks/transactions';
import { StacksTestnet } from '@stacks/network';
import { CONTRACTS } from './contracts';
import type { SavingsInfo, ReputationInfo } from '@/types/contracts';

const network = new StacksTestnet();

export async function getSavings(userAddress: string): Promise<SavingsInfo | null> {
  try {
    const [contractAddress, contractName] = CONTRACTS.BITSAVE.split('.');
    const result = await callReadOnlyFunction({
      network,
      contractAddress,
      contractName,
      functionName: 'get-savings',
      functionArgs: [],
      senderAddress: userAddress,
    });
    return cvToValue(result) as SavingsInfo;
  } catch (error) {
    console.error('Failed to get savings:', error);
    return null;
  }
}

export async function getReputation(userAddress: string): Promise<ReputationInfo | null> {
  try {
    const [contractAddress, contractName] = CONTRACTS.BITSAVE.split('.');
    const result = await callReadOnlyFunction({
      network,
      contractAddress,
      contractName,
      functionName: 'get-reputation',
      functionArgs: [],
      senderAddress: userAddress,
    });
    return cvToValue(result) as ReputationInfo;
  } catch (error) {
    console.error('Failed to get reputation:', error);
    return null;
  }
}
