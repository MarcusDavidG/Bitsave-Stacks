import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface AnalyticsData {
  totalDeposits: number;
  totalUsers: number;
  averageLockPeriod: number;
  totalRewards: number;
  badgesMinted: number;
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const formatSTX = (amount: number) => {
    return (amount / 1000000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatBlocks = (blocks: number) => {
    const days = Math.floor(blocks / 144);
    return `${days} days`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
          <Badge variant="secondary">STX</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatSTX(data.totalDeposits)}</div>
          <p className="text-xs text-muted-foreground">
            Across all users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Badge variant="secondary">Users</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            With active savings
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Lock Period</CardTitle>
          <Badge variant="secondary">Time</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatBlocks(data.averageLockPeriod)}</div>
          <p className="text-xs text-muted-foreground">
            Average commitment
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
          <Badge variant="secondary">STX</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatSTX(data.totalRewards)}</div>
          <p className="text-xs text-muted-foreground">
            Distributed to savers
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Badges Minted</CardTitle>
          <Badge variant="secondary">NFTs</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.badgesMinted}</div>
          <p className="text-xs text-muted-foreground">
            Achievement badges
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Protocol Health</CardTitle>
          <Badge variant="secondary">Status</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Utilization</span>
              <span>85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
