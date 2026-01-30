import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface AdminPanelProps {
  currentRewardRate: number;
  onUpdateRewardRate: (newRate: number) => Promise<void>;
  isAdmin: boolean;
}

export function AdminPanel({ currentRewardRate, onUpdateRewardRate, isAdmin }: AdminPanelProps) {
  const [newRate, setNewRate] = useState(currentRewardRate.toString());
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You don't have admin privileges to access this panel.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleUpdateRate = async () => {
    const rate = parseFloat(newRate);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      alert('Please enter a valid rate between 0 and 100');
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdateRewardRate(rate);
      alert('Reward rate updated successfully!');
    } catch (error) {
      alert('Failed to update reward rate: ' + error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Admin Panel
            <Badge variant="destructive">Admin Only</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="reward-rate">Current Reward Rate</Label>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{currentRewardRate}%</span>
              <Badge variant="secondary">Annual</Badge>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-rate">New Reward Rate (%)</Label>
            <div className="flex gap-2">
              <Input
                id="new-rate"
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                placeholder="Enter new rate"
              />
              <Button 
                onClick={handleUpdateRate}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>⚠️ Changing the reward rate affects all future deposits.</p>
            <p>Existing deposits maintain their original rate.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Protocol Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Total Value Locked</Label>
              <p className="text-2xl font-bold">1,234,567 STX</p>
            </div>
            <div>
              <Label>Active Savers</Label>
              <p className="text-2xl font-bold">456</p>
            </div>
            <div>
              <Label>Badges Minted</Label>
              <p className="text-2xl font-bold">123</p>
            </div>
            <div>
              <Label>Total Rewards Paid</Label>
              <p className="text-2xl font-bold">98,765 STX</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
