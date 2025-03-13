import { createEnv } from '@t3-oss/env-core';
import { config } from 'dotenv-flow';
import { z } from 'zod';

config();

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
  },

  client: {},

  clientPrefix: 'PUBLIC_',
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
