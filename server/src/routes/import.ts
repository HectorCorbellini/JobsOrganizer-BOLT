import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { PrismaClient, JobType, JobStatus, Priority } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Helper to parse job type
function getJobType(type: string): JobType {
  const upper = type.toUpperCase();
  if (Object.values(JobType).includes(upper as JobType)) {
    return upper as JobType;
  }
  console.warn(`Invalid job type "${type}". Defaulting to FULL_TIME.`);
  return JobType.FULL_TIME;
}

// POST /api/import/markdown - Import jobs from JOBS_SOURCE.md
router.post('/', async (req, res, next) => {
  try {
    const filePath = path.join(__dirname, '../../../JOBS_SOURCE.md');
    const content = await fs.readFile(filePath, 'utf-8');
    const blocks = content.split('---').slice(1).filter(b => b.trim());

    let created = 0;
    let skipped = 0;
    const errors: string[] = [];

    for (const block of blocks) {
      const lines = block.trim().split('\n');
      const titleLine = lines.find(line => line.startsWith('## '));
      if (!titleLine) continue;
      const jobData: any = {
        title: titleLine.substring(3).trim(),
        company: 'Unknown',
        location: 'Unknown',
        contactWebsite: '#',
        description: '',
        type: JobType.FULL_TIME,
        status: JobStatus.APPLIED,
        priority: Priority.MEDIUM,
      };
      const details = lines.filter(line => line.startsWith('- **'));
      for (const line of details) {
        const m = line.match(/- \*\*(.*?)\*\*: (.*)/);
        if (!m) continue;
        const key = m[1].toLowerCase().trim();
        const val = m[2].trim();
        switch (key) {
          case 'company': jobData.company = val; break;
          case 'location': jobData.location = val; break;
          case 'url': case 'website': jobData.contactWebsite = val; break;
          case 'description': jobData.description = val; break;
          case 'type': jobData.type = getJobType(val); break;
        }
      }
      if (!jobData.description) {
        jobData.description = `Details for ${jobData.title}`;
      }
      // Prevent duplicates
      const exists = await prisma.job.findFirst({
        where: { title: jobData.title, company: jobData.company }
      });
      if (exists) {
        skipped++;
        continue;
      }
      await prisma.job.create({ data: jobData });
      created++;
    }

    res.json({ created, skipped, errors });
  } catch (err) {
    next(err);
  }
});

export default router;
