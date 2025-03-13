import { successResponseSchema } from '@/schemas/api';
import { createErrorResponse } from '@/utils/api';
import { NextResponse } from 'next/server';

export function POST() {
  try {
    // 创建响应数据
    const responseData = { success: true };

    // 验证响应数据
    const validatedResponse = successResponseSchema.parse(responseData);

    // 创建响应
    const response = NextResponse.json(validatedResponse);

    // 清除 session_token cookie
    response.cookies.set({
      name: 'session_token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0, // 立即过期
    });

    return response;
  } catch (error) {
    console.error('注销错误:', error);
    return createErrorResponse('注销过程中发生错误', 500);
  }
}
