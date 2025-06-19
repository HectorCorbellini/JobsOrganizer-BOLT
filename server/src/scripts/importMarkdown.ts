import { PrismaClient, JobType, JobStatus, Priority } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

// Helper function to safely get enum values
function getJobType(type: string): JobType {
  const upperType = type.toUpperCase();
  if (Object.values(JobType).includes(upperType as JobType)) {
    return upperType as JobType;
  }
  console.warn(`Invalid job type \"${type}\" found. Defaulting to FULL_TIME.`);
  return JobType.FULL_TIME; // Default value
}

async function main() {
  console.log('Starting markdown import from JOBS_SOURCE.md...');

  // 1. Read the new markdown file
  const markdownFilePath = path.join(__dirname, '../../../JOBS_SOURCE.md');
  let fileContent;
  try {
    fileContent = await fs.readFile(markdownFilePath, 'utf-8');
    console.log('Successfully read JOBS_SOURCE.md');
  } catch (error) {
    console.error('Error reading JOBS_SOURCE.md. Make sure the file exists in the project root.');
    process.exit(1);
  }

  // 2. Parse the new, clean markdown format
  const jobsToCreate = [];
  const jobBlocks = fileContent.split('---').slice(1); // Split by '---' and skip the header

  for (const block of jobBlocks) {
    if (block.trim() === '') continue;

    const lines = block.trim().split('\n');
    const titleLine = lines.find(line => line.startsWith('## '));
    if (!titleLine) continue;

    const jobData: any = {
      title: titleLine.substring(3).trim(),
      company: 'Unknown',
      location: 'Unknown',
      contactWebsite: '#',
      description: '',
      type: JobType.FULL_TIME, // Default
      status: JobStatus.APPLIED,
      priority: Priority.MEDIUM,
    };

    const detailLines = lines.filter(line => line.startsWith('- **'));
    for (const line of detailLines) {
      const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
      if (match) {
        const key = match[1].toLowerCase().trim();
        const value = match[2].trim();

        switch (key) {
          case 'company':
            jobData.company = value;
            break;
          case 'location':
            jobData.location = value;
            break;
          case 'url':
          case 'website':
            jobData.contactWebsite = value;
            break;
          case 'description':
            jobData.description = value;
            break;
          case 'type':
            jobData.type = getJobType(value);
            break;
        }
      }
    }
    
    if (!jobData.description) {
        jobData.description = `Details for ${jobData.title}`;
    }

    jobsToCreate.push(jobData);
  }

  if (jobsToCreate.length === 0) {
    console.log('No jobs found to import.');
    return;
  }

  console.log(`Found ${jobsToCreate.length} jobs to import.`);

  // 3. Clear existing jobs before import to avoid duplicates
  console.log('Clearing existing jobs from the database...');
  await prisma.job.deleteMany({});
  console.log('Existing jobs cleared.');


  // 4. Save jobs to the database
  for (const jobData of jobsToCreate) {
    try {
      await prisma.job.create({
        data: jobData,
      });
      console.log(`Successfully imported job: \"${jobData.title}\"`);
    } catch (error) {
      console.error(`Failed to import job: \"${jobData.title}\"`, error);
    }
  }

  console.log('Markdown import finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
