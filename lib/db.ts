import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const libsql = createClient({
  url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
});

const adapter = new PrismaLibSQL(libsql);

const db = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

export default db;