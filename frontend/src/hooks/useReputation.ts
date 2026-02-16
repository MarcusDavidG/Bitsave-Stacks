'use client';

import { useState, useEffect } from 'react';
import { getReputation } from '@/lib/api/bitsave';
import type { ReputationInfo } from '@/types/contracts';

export function useReputation(address: string | null) {
  const [reputation, setReputation] = useState<ReputationInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address) return;

    const fetchReputation = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getReputation(address);
        setReputation(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reputation');
      } finally {
        setLoading(false);
      }
    };

    fetchReputation();
  }, [address]);

  return { reputation, loading, error, refetch: () => address && getReputation(address) };
}
