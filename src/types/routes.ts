import { z } from 'zod';

export const routesEnum = z.enum([
  // auth
  '/auth',
  '/auth/login',
  '/auth/register',
  '/auth/logout',
  '/auth/me',
  // main
  '/',
  '/capture',
  '/discover',
  '/history',
  '/profile',
  // dev
  '/demo',
] as const);

export type Routes = z.infer<typeof routesEnum>;
