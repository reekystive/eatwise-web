'use client';

import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const LoginForm: FC = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    void (async () => {
      try {
        const success = await login(email, password);
        if (success) {
          // 登录成功，重定向到首页
          router.push('/');
        } else {
          setError('登录失败，请检查您的邮箱和密码');
        }
      } catch (err) {
        setError('登录过程中发生错误');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className="w-full">
      {error && (
        <div className="border-destructive bg-destructive/10 text-destructive mb-4 rounded border p-3">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="text-card-foreground mb-1 block text-sm font-medium">
            邮箱
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring/50 w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="text-card-foreground mb-1 block text-sm font-medium">
            密码
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring/50 w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
            required
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? '登录中...' : '登录'}
        </Button>
      </form>
    </div>
  );
};
