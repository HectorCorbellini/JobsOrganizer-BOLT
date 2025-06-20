import { PrismaClient } from '@prisma/client';

// Instantiate a single, shared instance of the PrismaClient
const prisma = new PrismaClient();

export default prisma;
