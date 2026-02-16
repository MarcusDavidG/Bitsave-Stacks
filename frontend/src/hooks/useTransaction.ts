'use client';

import { useState } from 'react';

export type TransactionStatus = 'idle' | 'pending' | 'success' | 'error';

export function useTransaction() {
  const [status, setStatus] = useState<TransactionStatus>('idle');
  const [txId, setTxId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = async (fn: () => Promise<any>) => {
    setStatus('pending');
    setError(null);
    setTxId(null);

    try {
      const result = await fn();
      setTxId(result.txId);
      setStatus('success');
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Transaction failed');
      setStatus('error');
      throw err;
    }
  };

  const reset = () => {
    setStatus('idle');
    setTxId(null);
    setError(null);
  };

  return { status, txId, error, execute, reset };
}
