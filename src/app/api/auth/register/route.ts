import { authResponseSchema, AuthResponse } from '@/schemas/api';
import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/services/user-service';
import { hashPassword } from '@/utils/auth/password';
import { generateToken } from '@/utils/auth/jwt';
import { registerSchema } from '@/schemas/auth';

// 创建认证响应的辅助函数
const createAuthResponse = (data: AuthResponse, token: string, status: number) => {
  return NextResponse.json(data, {
    status,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const { error: parseError, data: parseResult } = registerSchema.safeParse(await request.json());

    if (parseError) {
      return NextResponse.json({ error: parseError.message }, { status: 400 });
    }

    const validatedData = parseResult.data;

    // 检查邮箱是否已被注册
    const existingUser = userService.findByEmail(validatedData.email);
    if (existingUser) {
      return createErrorResponse('该邮箱已被注册', 409);
    }

    // 加密密码 (注意：在实际应用中应该使用 bcrypt 或 argon2 并存储盐值)
    const hashedPassword = hashPassword(validatedData.password, 'salt-should-be-stored');

    // 创建新用户
    const newUser = userService.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
    });

    // 生成 JWT 令牌
    const token = generateToken({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    // 创建响应数据
    const responseData = {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    };

    // 验证响应数据
    const validatedResponse = authResponseSchema.parse(responseData);

    // 创建带有 JWT token 的响应
    return createAuthResponse(validatedResponse, token, 201);
  } catch (error) {
    // 处理其他错误
    console.error('注册错误:', error);
    return createErrorResponse('注册过程中发生错误', 500);
  }
}
