/**
 * Stacks Blockchain Integration (Refactored for Browser)
 * 
 * Utilities for interacting with BitSave smart contracts on Stacks testnet
 */

import {
  openContractCall,
  FinishedTxData,
} from '@stacks/connect';
import { 
  uintCV, 
  principalCV, 
  cvToHex,
  PostConditionMode,
  hexToCV,
  ClarityType,
} from '@stacks/transactions';
import { CONTRACTS, API_URL } from './contracts';

/**
 * Deposit STX into BitSave savings
 */
export async function depositSTX(
  senderAddress: string,
  amount: number,
  lockPeriod: number,
  onFinish: (data: FinishedTxData) => void,
  onCancel: () => void
) {
  // Ensure we have integers for Clarity values
  const amountInMicroStx = Math.round(stxToMicroStx(amount));
  const lockPeriodBlocks = Math.round(lockPeriod);
  
  console.log('Deposit params:', { amountInMicroStx, lockPeriodBlocks });
  
  // Use Allow mode since post-condition API is difficult to access in v7.x
  // This allows the transaction to transfer STX without explicit post-conditions
  await openContractCall({
    contractAddress: CONTRACTS.bitsave.address,
    contractName: CONTRACTS.bitsave.name,
    functionName: 'deposit',
    functionArgs: [uintCV(amountInMicroStx), uintCV(lockPeriodBlocks)],
    postConditionMode: PostConditionMode.Allow,
    network: 'testnet',
    onFinish,
    onCancel,
  });
}

/**
 * Withdraw STX from BitSave savings
 */
export async function withdrawSTX(
  senderAddress: string,
  onFinish: (data: FinishedTxData) => void,
  onCancel: () => void
) {
  await openContractCall({
    contractAddress: CONTRACTS.bitsave.address,
    contractName: CONTRACTS.bitsave.name,
    functionName: 'withdraw',
    functionArgs: [],
    network: 'testnet',
    onFinish,
    onCancel,
  });
}

/**
 * Convert address to Clarity principal format (browser-safe)
 */
function addressToClarityPrincipal(address: string): string {
  // For read-only calls, we can use the address directly
  // The API will handle the conversion
  return address;
}

/**
 * Get user's savings information from API (browser-safe)
 */
export async function getUserSavings(userAddress: string) {
  try {
    // Use POST endpoint with proper Clarity value encoding
    const url = `${API_URL}/v2/contracts/call-read/${CONTRACTS.bitsave.address}/${CONTRACTS.bitsave.name}/get-savings`;
    
    const argHex = cvToHex(principalCV(userAddress));
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({
        sender: userAddress,
        arguments: [argHex]
      })
    });
    
    if (!response.ok) {
      console.error(`Savings API error: ${response.status}`);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Deserialize the Clarity value
    if (data.okay && data.result) {
      try {
        const clarityValue = hexToCV(data.result);
        
        // Result is (ok (some {...})) or (ok none)
        if (clarityValue.type === ClarityType.ResponseOk) {
          const innerValue = clarityValue.value;
          
          // Check if it's (some {...})
          if (innerValue.type === ClarityType.OptionalSome) {
            const tupleData = innerValue.value;
            
            // Extract amount and unlock-height from tuple
            if (tupleData.type === ClarityType.Tuple) {
              // Use .value not .data for tuple properties!
              const tupleMap = tupleData.value;
              
              const amount = tupleMap['amount']?.type === ClarityType.UInt 
                ? Number(tupleMap['amount'].value) 
                : 0;
              const unlockHeight = tupleMap['unlock-height']?.type === ClarityType.UInt 
                ? Number(tupleMap['unlock-height'].value) 
                : 0;
              const claimed = tupleMap['claimed']?.type === ClarityType.BoolTrue;
              
              return {
                amount,
                unlockHeight,
                claimed,
              };
            }
          }
        }
      } catch (e) {
        console.error('Error deserializing savings:', e);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching savings:', error);
    return null;
  }
}

/**
 * Get user's reputation points from API (browser-safe)
 */
export async function getUserReputation(userAddress: string): Promise<number> {
  try {
    // Use POST endpoint with proper Clarity value encoding
    const url = `${API_URL}/v2/contracts/call-read/${CONTRACTS.bitsave.address}/${CONTRACTS.bitsave.name}/get-reputation`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({
        sender: userAddress,
        arguments: [cvToHex(principalCV(userAddress))]
      })
    });
    
    if (!response.ok) {
      console.log('Reputation API error:', response.status);
      return 0;
    }
    
    const data = await response.json();
    
    if (data.okay && data.result) {
      try {
        const clarityValue = hexToCV(data.result);
        
        // Result is (ok int-value)
        if (clarityValue.type === ClarityType.ResponseOk) {
          const intValue = clarityValue.value;
          
          if (intValue.type === ClarityType.Int) {
            return Number(intValue.value);
          }
        }
      } catch (e) {
        console.error('Error deserializing reputation:', e);
      }
    }
    
    return 0;
  } catch (error) {
    console.error('Error fetching reputation:', error);
    return 0;
  }
}

/**
 * Get current reward rate
 */
export async function getRewardRate(): Promise<number> {
  try {
    const url = `${API_URL}/v2/contracts/call-read/${CONTRACTS.bitsave.address}/${CONTRACTS.bitsave.name}/get-reward-rate?sender=${CONTRACTS.bitsave.address}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    
    if (!response.ok) {
      return 10;
    }
    
    const data = await response.json();
    
    if (data.okay && data.result) {
      const hexValue = data.result.replace('0x', '');
      return parseInt(hexValue, 16) || 10;
    }
    
    return 10;
  } catch (error) {
    console.error('Error fetching reward rate:', error);
    return 10;
  }
}

/**
 * Get user's STX balance
 */
export async function getUserSTXBalance(address: string): Promise<number> {
  try {
    const response = await fetch(
      `${API_URL}/extended/v1/address/${address}/stx`
    );
    
    if (!response.ok) {
      return 0;
    }
    
    const data = await response.json();
    
    // Balance is in micro-STX, convert to STX
    return Number(data.balance) / 1000000 || 0;
  } catch (error) {
    console.error('Error fetching STX balance:', error);
    return 0;
  }
}

/**
 * Get badges owned by user
 */
export async function getUserBadges(userAddress: string): Promise<any[]> {
  try {
    const response = await fetch(
      `${API_URL}/extended/v1/tokens/nft/holdings?principal=${userAddress}&asset_identifiers=${CONTRACTS.bitsaveBadges.fullId}::bitsave-badge`
    );
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    
    return data.results || [];
  } catch (error) {
    console.error('Error fetching badges:', error);
    return [];
  }
}

/**
 * Parse transaction result
 */
export function parseTxResult(txData: FinishedTxData) {
  return {
    txId: txData.txId,
    txUrl: `https://explorer.hiro.so/txid/${txData.txId}?chain=testnet`,
  };
}

/**
 * Convert micro-STX to STX
 */
export function microStxToStx(microStx: number | string): number {
  return Number(microStx) / 1000000;
}

/**
 * Convert STX to micro-STX (returns integer)
 */
export function stxToMicroStx(stx: number): number {
  return Math.round(stx * 1000000);
}

/**
 * Format STX amount for display
 */
export function formatSTX(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
}
