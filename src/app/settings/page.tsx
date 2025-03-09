'use client';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { FC } from 'react';

const SettingsPage: FC = () => {
  return (
    <div className="container h-full w-full overflow-auto overscroll-contain">
      <div className="h-6 w-full md:h-0"></div>

      <h1 className="mb-4 p-4 text-2xl font-bold md:mb-6 md:p-6">设置</h1>

      <div className="space-y-6 px-4 md:px-6">
        <div>
          <h2 className="mb-4 text-xl font-semibold">应用设置</h2>
          <div className="space-y-4">
            <div className="bg-muted/30 flex items-center justify-between rounded-lg p-4">
              <div>
                <div className="font-medium">主题</div>
                <div className="text-muted-foreground text-sm">切换应用的明暗主题</div>
              </div>
              <ThemeToggle />
            </div>

            <div className="bg-muted/30 flex items-center justify-between rounded-lg p-4">
              <div>
                <div className="font-medium">语言</div>
                <div className="text-muted-foreground text-sm">选择应用的显示语言</div>
              </div>
              <select className="bg-background rounded-md border px-3 py-1">
                <option value="zh">中文</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="bg-muted/30 flex items-center justify-between rounded-lg p-4">
              <div>
                <div className="font-medium">通知</div>
                <div className="text-muted-foreground text-sm">管理应用的通知设置</div>
              </div>
              <div className="bg-muted focus-visible:ring-ring focus-visible:ring-offset-background relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
                <span className="bg-background inline-block h-5 w-5 translate-x-1 rounded-full transition-transform" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold">个人信息</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">姓名</label>
                <input
                  type="text"
                  className="bg-background w-full rounded-md border px-3 py-2"
                  placeholder="请输入姓名"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">年龄</label>
                <input
                  type="number"
                  className="bg-background w-full rounded-md border px-3 py-2"
                  placeholder="请输入年龄"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">身高 (cm)</label>
                <input
                  type="number"
                  className="bg-background w-full rounded-md border px-3 py-2"
                  placeholder="请输入身高"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">体重 (kg)</label>
                <input
                  type="number"
                  className="bg-background w-full rounded-md border px-3 py-2"
                  placeholder="请输入体重"
                />
              </div>
            </div>
            <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 transition-opacity hover:opacity-90">
              保存设置
            </button>
          </div>
        </div>
      </div>

      <div className="h-24 w-full md:h-12"></div>
    </div>
  );
};

export default SettingsPage;
