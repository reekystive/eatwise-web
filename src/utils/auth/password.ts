import { randomBytes, createHash, timingSafeEqual } from 'crypto';

/**
 * Generates a random salt for password hashing
 */
export const generateSalt = (): string => {
  return randomBytes(16).toString('hex');
};

/**
 * Hashes a password with the given salt
 */
export const hashPassword = (password: string, salt: string): string => {
  return createHash('sha256')
    .update(password + salt)
    .digest('hex');
};

/**
 * Verifies a password against a hashed password and salt
 */
export const verifyPassword = (password: string, hashedPassword: string, salt: string): boolean => {
  const hashedAttempt = hashPassword(password, salt);
  return timingSafeEqual(Buffer.from(hashedAttempt), Buffer.from(hashedPassword));
};
