import { PrismaClient } from '@prisma/client';

declare global {
  var db: PrismaClient;
}

const db = new PrismaClient();

if (process.env.NODE_ENV === 'development') global.db = db;

export default db;
