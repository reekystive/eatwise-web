'use client';

import { ToggleSwitch } from '@/components/settings/toggle-switch';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { FC, useState } from 'react';

export const SettingsPanel: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // 这里可以添加保存设置的逻辑
    console.log('保存设置:', formData);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h2 className="text-card-foreground mb-4 text-2xl font-bold">设置</h2>

      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-xl font-semibold">应用设置</h3>
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
              <ToggleSwitch />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-semibold">个人信息</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  姓名
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="bg-background border-input text-foreground w-full rounded-md border px-3 py-2"
                  placeholder="请输入姓名"
                />
              </div>
              <div>
                <label htmlFor="age" className="mb-1 block text-sm font-medium">
                  年龄
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="bg-background border-input text-foreground w-full rounded-md border px-3 py-2"
                  placeholder="请输入年龄"
                />
              </div>
              <div>
                <label htmlFor="height" className="mb-1 block text-sm font-medium">
                  身高 (cm)
                </label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="bg-background border-input text-foreground w-full rounded-md border px-3 py-2"
                  placeholder="请输入身高"
                />
              </div>
              <div>
                <label htmlFor="weight" className="mb-1 block text-sm font-medium">
                  体重 (kg)
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="bg-background border-input text-foreground w-full rounded-md border px-3 py-2"
                  placeholder="请输入体重"
                />
              </div>
            </div>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              保存设置
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
