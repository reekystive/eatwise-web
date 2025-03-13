'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

export const AuthStatus: FC = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="bg-card mb-8 flex items-center justify-between rounded-lg p-4 shadow-sm">
        <p className="text-muted-foreground">正在检查登录状态...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-card mb-8 flex items-center justify-between rounded-lg p-4 shadow-sm">
        <p className="text-card-foreground">您尚未登录，请登录或注册以访问更多功能</p>
        <div className="flex space-x-2">
          <Button
            onClick={() => {
              router.push('/login?tab=login');
            }}
            variant="default"
            size="sm"
          >
            登录
          </Button>
          <Button
            onClick={() => {
              router.push('/login?tab=register');
            }}
            variant="outline"
            size="sm"
          >
            注册
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card mb-8 flex items-center justify-between rounded-lg p-4 shadow-sm">
      <div>
        <p className="text-card-foreground">
          欢迎回来，<span className="font-medium">{user.name}</span>
        </p>
        <p className="text-muted-foreground text-sm">{user.email}</p>
      </div>
    </div>
  );
};
