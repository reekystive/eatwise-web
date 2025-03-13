import { parseRequestBody, createAuthResponse, createErrorResponse } from '@/utils/api';
import { verifyPassword } from '@/utils/auth/password';
import { userService } from '@/services/user-service';
import { authResponseSchema } from '@/schemas/api';
import { generateToken } from '@/utils/auth/jwt';
import { loginSchema } from '@/schemas/auth';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 解析并验证请求体
    const parseResult = await parseRequestBody(request, loginSchema);
    if (!parseResult.success) {
      return parseResult.response;
    }

    const validatedData = parseResult.data;

    // 查找用户
    const user = userService.findByEmail(validatedData.email);
    if (!user?.password) {
      return createErrorResponse('邮箱或密码不正确', 401);
    }

    // 验证密码
    const isPasswordValid = await verifyPassword(validatedData.password, user.password);
    if (!isPasswordValid) {
      return createErrorResponse('邮箱或密码不正确', 401);
    }

    // 生成 JWT 令牌
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    // 创建响应数据
    const responseData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };

    // 验证响应数据
    const validatedResponse = authResponseSchema.parse(responseData);

    // 创建带有 JWT token 的响应
    return createAuthResponse(validatedResponse, token);
  } catch (error) {
    // 处理其他错误
    console.error('登录错误:', error);
    return createErrorResponse('登录过程中发生错误', 500);
  }
}
