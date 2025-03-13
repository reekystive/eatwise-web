import { neonConfig, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { env } from '@/env';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

export const dbPool = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle(dbPool);
