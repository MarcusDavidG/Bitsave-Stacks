import { 
  openContractCall, 
  showConnect, 
  UserSession, 
  AppConfig 
} from '@stacks/connect';
import { 
  uintCV, 
  standardPrincipalCV
} from '@stacks/transactions';
import { CONTRACTS } from './contracts';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export const connectWallet = () => {
  showConnect({
    appDetails: {
      name: 'BitSave',
      icon: '/favicon.ico',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
};

export const disconnectWallet = () => {
  userSession.signUserOut('/');
};

export const depositSTX = async (amount: number, lockPeriod: number) => {
  return openContractCall({
    contractAddress: CONTRACTS.BITSAVE.split('.')[0],
    contractName: CONTRACTS.BITSAVE.split('.')[1],
    functionName: 'deposit',
    functionArgs: [uintCV(lockPeriod)],
    postConditionMode: 0x01,
    onFinish: (data) => {
      console.log('Transaction submitted:', data.txId);
    },
  });
};

export const withdrawSTX = async () => {
  return openContractCall({
    contractAddress: CONTRACTS.BITSAVE.split('.')[0],
    contractName: CONTRACTS.BITSAVE.split('.')[1],
    functionName: 'withdraw',
    functionArgs: [],
    postConditionMode: 0x01,
    onFinish: (data) => {
      console.log('Withdrawal submitted:', data.txId);
    },
  });
};

// Mock functions for now - will be replaced with actual API calls
export const getUserSavings = async (userAddress: string) => {
  // Mock data for development
  return {
    value: {
      amount: { value: 1000000000 }, // 1000 STX in microSTX
      'lock-period': { value: 4320 }, // 30 days in blocks
      'start-block': { value: 145000 },
      'maturity-block': { value: 149320 },
      'is-matured': { value: false }
    }
  };
};

export const getUserReputation = async (userAddress: string) => {
  // Mock data for development
  return {
    value: 750 // Mock reputation points
  };
};
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
