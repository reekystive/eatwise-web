import { FC, ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录 | EatWise',
  description: '登录或注册 EatWise 账户',
};

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout: FC<LoginLayoutProps> = ({ children }) => {
  return <div className="bg-background h-full">{children}</div>;
};

export default LoginLayout;
