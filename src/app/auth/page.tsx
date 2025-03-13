import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterForm } from '@/components/auth/register-form';
import { LoginForm } from '@/components/auth/login-form';
import { FC } from 'react';

const AuthPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-md">
        <h1 className="mb-8 text-center text-3xl font-bold">EatWise 账户</h1>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-2">
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="register">注册</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
