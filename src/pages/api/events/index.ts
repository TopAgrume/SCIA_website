import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') return res.status(HttpStatus.METHOD_NOT_ALLOWED);

  const events = await prisma.event.findMany();
  console.log(events);
  return res.status(200).json({ data: 'test' });
}
