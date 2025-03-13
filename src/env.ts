import { createEnv } from '@t3-oss/env-core';
import { config } from 'dotenv-flow';
import { z } from 'zod';

config();

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(1),
    JWT_EXPIRES_IN: z.string().optional().default('30d'),
  },

  client: {},

  clientPrefix: 'PUBLIC_',
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
