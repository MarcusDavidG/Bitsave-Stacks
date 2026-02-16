'use client';

import { Badge } from '@/components/ui/badge';
import type { TransactionStatus } from '@/hooks/useTransaction';

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
}

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  const variants = {
    idle: { variant: 'secondary' as const, label: 'Ready' },
    pending: { variant: 'default' as const, label: 'Pending' },
    success: { variant: 'default' as const, label: 'Success' },
    error: { variant: 'destructive' as const, label: 'Failed' }
  };

  const { variant, label } = variants[status];

  return <Badge variant={variant}>{label}</Badge>;
}
