'use client';

import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export function LoadingCard({ message = 'Loading...' }: { message?: string }) {
  return (
    <Card className="p-8 flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </Card>
  );
}
