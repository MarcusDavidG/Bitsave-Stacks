import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface NotificationProps {
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  onDismiss?: () => void;
}

function Notification({ type, title, message, onDismiss }: NotificationProps) {
  const getVariant = () => {
    switch (type) {
      case 'success': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Card className={`border-l-4 ${
      type === 'success' ? 'border-l-green-500' :
      type === 'warning' ? 'border-l-yellow-500' :
      type === 'error' ? 'border-l-red-500' :
      'border-l-blue-500'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm">{title}</CardTitle>
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss}>×</Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}

interface NotificationCenterProps {
  userAddress?: string;
  currentBlock: number;
}

export function NotificationCenter({ userAddress, currentBlock }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<(NotificationProps & { id: string })[]>([]);

  useEffect(() => {
    // Mock notifications - in real app, these would come from contract events
    const mockNotifications = [
      {
        id: '1',
        type: 'success' as const,
        title: 'Deposit Confirmed',
        message: 'Your 10 STX deposit has been confirmed and is now earning rewards.',
      },
      {
        id: '2',
        type: 'info' as const,
        title: 'Lock Period Update',
        message: 'Your savings will mature in 5 days. You can withdraw after block 150,000.',
      },
      {
        id: '3',
        type: 'warning' as const,
        title: 'Badge Eligible',
        message: 'You have earned enough reputation points for a badge! Withdraw to claim it.',
      },
    ];

    setNotifications(mockNotifications);
  }, [userAddress, currentBlock]);

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (!userAddress) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Connect your wallet to see notifications
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Notifications
          <Badge variant="secondary">{notifications.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            No new notifications
          </p>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Notification
                key={notification.id}
                {...notification}
                onDismiss={() => dismissNotification(notification.id)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
