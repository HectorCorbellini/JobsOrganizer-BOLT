import { PrismaClient } from '@prisma/client';
import { mockJobs } from '../../../src/data/mockJobs';
import { transformJobToDB } from '../utils/transformers';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Clear existing data
  await prisma.response.deleteMany();
  await prisma.job.deleteMany();

  console.log('Cleared existing data');

  // Insert mock jobs
  for (const mockJob of mockJobs) {
    try {
      const jobData = transformJobToDB(mockJob);
      
      const job = await prisma.job.create({
        data: jobData
      });

      // Insert responses if they exist
      if (mockJob.responses && mockJob.responses.length > 0) {
        for (const response of mockJob.responses) {
          await prisma.response.create({
            data: {
              jobId: job.id,
              date: new Date(response.date),
              type: response.type.toUpperCase(),
              message: response.message,
              sender: response.sender
            }
          });
        }
      }

      console.log(`Created job: ${job.title} at ${job.company}`);
    } catch (error) {
      console.error(`Error creating job ${mockJob.title}:`, error);
    }
  }

  console.log('Database seed completed!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });