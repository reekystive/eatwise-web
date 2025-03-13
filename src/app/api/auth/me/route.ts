import { userService } from '@/services/user-service';
import { userResponseSchema } from '@/schemas/api';
import { createErrorResponse } from '@/utils/api';
import { verifyToken } from '@/utils/auth/jwt';
import { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  try {
    // 从 cookie 中获取令牌
    const token = request.cookies.get('session_token')?.value;

    if (!token) {
      return createErrorResponse('未授权', 401);
    }

    // 验证令牌
    const payload = verifyToken(token);

    if (!payload) {
      return createErrorResponse('无效的令牌', 401);
    }

    // 查找用户
    const user = userService.findByEmail(payload.email);

    if (!user) {
      return createErrorResponse('用户不存在', 404);
    }

    // 创建响应数据
    const responseData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    // 验证响应数据
    const validatedResponse = userResponseSchema.parse(responseData);

    // 返回用户信息
    return Response.json(validatedResponse);
  } catch (error) {
    console.error('获取用户信息错误:', error);
    return createErrorResponse('获取用户信息过程中发生错误', 500);
  }
}
