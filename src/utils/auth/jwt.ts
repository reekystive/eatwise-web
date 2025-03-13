import jwt, { SignOptions } from 'jsonwebtoken';
import ms, { StringValue } from 'ms';
import { env } from '@/env';
import { z } from 'zod';

const tokenPayloadSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
});

export type TokenPayload = z.infer<typeof tokenPayloadSchema>;

const getJwtSecret = (): string => {
  const secret = env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return secret;
};

const getJwtExpiresIn = (): number => {
  let expiresIn = 0;
  try {
    expiresIn = ms(env.JWT_EXPIRES_IN as StringValue);
  } catch {
    throw new Error('JWT_EXPIRES_IN format error');
  }
  if (expiresIn <= 0 || Number.isNaN(expiresIn)) {
    throw new Error('JWT_EXPIRES_IN format error');
  }
  return expiresIn;
};

export const generateToken = (payload: TokenPayload): string => {
  const options: SignOptions = {};
  options.expiresIn = getJwtExpiresIn();
  return jwt.sign(payload, getJwtSecret(), options);
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    const result = tokenPayloadSchema.safeParse(decoded);

    if (result.success) {
      return result.data;
    }

    return null;
  } catch {
    return null;
  }
};

export const getTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader) return null;
  if (!authHeader.startsWith('Bearer ')) return null;

  const parts = authHeader.split(' ');
  if (parts.length <= 1) return null;

  return parts[1] ?? null;
};
