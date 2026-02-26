import React from 'react';
import { LoadingSpinner } from './ui/loading-spinner';

interface TransactionStatusProps {
  status: 'idle' | 'pending' | 'success' | 'error';
  txId?: string;
  error?: string;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  status,
  txId,
  error
}) => {
  if (status === 'idle') return null;

  return (
    <div className="mt-4 p-4 rounded-lg border">
      {status === 'pending' && (
        <div className="flex items-center space-x-2 text-blue-600">
          <LoadingSpinner size="sm" />
          <span>Transaction pending...</span>
        </div>
      )}
      
      {status === 'success' && (
        <div className="text-green-600">
          <p>✅ Transaction successful!</p>
          {txId && (
            <p className="text-sm mt-1">
              TX: <code className="bg-gray-100 px-1 rounded">{txId}</code>
            </p>
          )}
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-red-600">
          <p>❌ Transaction failed</p>
          {error && <p className="text-sm mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
};
