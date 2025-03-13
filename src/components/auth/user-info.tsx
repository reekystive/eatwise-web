'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

export const UserInfo: FC = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    void (async () => {
      await logout();
      router.push('/auth');
    })();
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">加载中...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p className="text-card-foreground">未登录</p>
        <Button
          onClick={() => {
            router.push('/auth');
          }}
          className="mt-2"
        >
          去登录
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h2 className="text-card-foreground mb-4 text-2xl font-bold">用户信息</h2>

      <div className="mb-6">
        <div className="mb-2">
          <span className="text-card-foreground font-medium">姓名：</span>
          <span className="text-card-foreground">{user.name}</span>
        </div>
        <div className="mb-2">
          <span className="text-card-foreground font-medium">邮箱：</span>
          <span className="text-card-foreground">{user.email}</span>
        </div>
      </div>

      <Button onClick={handleLogout} variant="destructive">
        注销
      </Button>
    </div>
  );
};
