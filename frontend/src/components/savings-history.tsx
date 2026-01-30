import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SavingsHistoryEntry {
  id: string;
  amount: number;
  lockPeriod: number;
  depositedAt: number;
  withdrawnAt?: number;
  rewards?: number;
  status: 'active' | 'completed' | 'withdrawn';
}

interface SavingsHistoryProps {
  history: SavingsHistoryEntry[];
  currentBlock: number;
}

export function SavingsHistory({ history, currentBlock }: SavingsHistoryProps) {
  const formatSTX = (amount: number) => {
    return (amount / 1000000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (blockHeight: number) => {
    // Approximate date based on block height (10 min per block)
    const blockTime = 10 * 60 * 1000; // 10 minutes in milliseconds
    const estimatedTime = Date.now() - ((currentBlock - blockHeight) * blockTime);
    return new Date(estimatedTime).toLocaleDateString();
  };

  const getProgress = (entry: SavingsHistoryEntry) => {
    if (entry.status === 'withdrawn') return 100;
    const elapsed = currentBlock - entry.depositedAt;
    const progress = Math.min((elapsed / entry.lockPeriod) * 100, 100);
    return Math.max(progress, 0);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'completed':
        return <Badge variant="secondary">Matured</Badge>;
      case 'withdrawn':
        return <Badge variant="outline">Withdrawn</Badge>;
      default:
        return <Badge variant="destructive">Unknown</Badge>;
    }
  };

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Savings History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No savings history found. Make your first deposit to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {history.map((entry) => (
            <div key={entry.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{formatSTX(entry.amount)} STX</p>
                  <p className="text-sm text-muted-foreground">
                    Deposited: {formatDate(entry.depositedAt)}
                  </p>
                </div>
                {getStatusBadge(entry.status)}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Lock Progress</span>
                  <span>{Math.round(getProgress(entry))}%</span>
                </div>
                <Progress value={getProgress(entry)} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Lock Period</p>
                  <p>{Math.floor(entry.lockPeriod / 144)} days</p>
                </div>
                {entry.rewards && (
                  <div>
                    <p className="text-muted-foreground">Rewards Earned</p>
                    <p className="text-green-600">+{formatSTX(entry.rewards)} STX</p>
                  </div>
                )}
              </div>

              {entry.withdrawnAt && (
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    Withdrawn: {formatDate(entry.withdrawnAt)}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
