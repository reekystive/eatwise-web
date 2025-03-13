'use client';

import { useState, FC, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export const RegisterForm: FC = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

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
        const success = await register(name, email, password);
        if (success) {
          // 注册成功，重定向到首页
          router.push('/');
        } else {
          setError('注册失败，请稍后重试');
        }
      } catch (err) {
        setError('注册过程中发生错误');
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
          <label htmlFor="name" className="text-card-foreground mb-1 block text-sm font-medium">
            姓名
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            className="border-input bg-background text-foreground focus:border-ring focus:ring-ring/50 w-full rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
            required
          />
        </div>

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
            minLength={8}
            required
          />
          <p className="text-muted-foreground mt-1 text-xs">密码至少需要 8 个字符</p>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? '注册中...' : '注册'}
        </Button>
      </form>
    </div>
  );
};
