import { z } from 'zod';

// 注册请求验证模式
export const registerSchema = z.object({
  name: z.string().min(2, '姓名至少需要 2 个字符').max(50, '姓名最多 50 个字符'),
  email: z.string().email('请提供有效的邮箱地址'),
  password: z.string().min(8, '密码至少需要 8 个字符').max(100, '密码最多 100 个字符'),
});

// 登录请求验证模式
export const loginSchema = z.object({
  email: z.string().email('请提供有效的邮箱地址'),
  password: z.string().min(1, '请输入密码'),
});

// 类型定义
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
