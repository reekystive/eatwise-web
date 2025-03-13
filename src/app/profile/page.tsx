'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SettingsPanel } from '@/components/settings/settings-panel';
import { AuthStatus } from '@/components/auth/auth-status';
import { UserInfo } from '@/components/auth/user-info';
import { FC, useState } from 'react';

const ProfilePage: FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold">个人资料</h1>
        <AuthStatus />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="profile">个人信息</TabsTrigger>
            <TabsTrigger value="settings">设置</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserInfo />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
