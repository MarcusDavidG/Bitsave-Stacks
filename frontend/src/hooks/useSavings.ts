'use client';

import { useState, useEffect } from 'react';
import { getSavings } from '@/lib/api/bitsave';
import type { SavingsInfo } from '@/types/contracts';

export function useSavings(address: string | null) {
  const [savings, setSavings] = useState<SavingsInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchSavings = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSavings(address);
        setSavings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch savings');
      } finally {
        setLoading(false);
      }
    };

    fetchSavings();
  }, [address]);

  return { savings, loading, error, refetch: () => address && getSavings(address) };
}
