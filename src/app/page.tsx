'use client';

import { FloatingActionButton } from '@/components/floating-action-button';
import { Camera, Utensils } from 'lucide-react';
import { FC } from 'react';

const HomePage: FC = () => {
  return (
    <div className="relative container h-full w-full overflow-auto overscroll-contain">
      <div className="h-6 w-full md:h-0"></div>

      <h1 className="mb-4 p-4 text-2xl font-bold md:mb-6 md:p-6">今日</h1>

      <div className="space-y-6 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-muted rounded-full p-4">
            <Utensils className="text-muted-foreground size-8" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">今日暂无记录</h2>
          <p className="text-muted-foreground mt-2 max-w-md">点击右下角的按钮拍摄食物，开始记录您的饮食</p>
        </div>
      </div>

      <div className="h-24 w-full md:h-12"></div>

      {/* 悬浮操作按钮 */}
      <FloatingActionButton href="/capture" icon={<Camera className="size-6" />} />
    </div>
  );
};

export default HomePage;
