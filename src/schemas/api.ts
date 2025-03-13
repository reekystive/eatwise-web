import { z } from 'zod';

// 用户数据验证模式
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

// 认证响应验证模式
export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});

// 错误响应验证模式
export const errorResponseSchema = z.object({
  error: z.string(),
  details: z
    .array(
      z.object({
        path: z.string(),
        message: z.string(),
      })
    )
    .optional(),
});

// 用户信息响应验证模式
export const userResponseSchema = z.object({
  user: userSchema,
});

// 成功响应验证模式
export const successResponseSchema = z.object({
  success: z.boolean(),
});

// 类型定义
export type User = z.infer<typeof userSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type SuccessResponse = z.infer<typeof successResponseSchema>;
