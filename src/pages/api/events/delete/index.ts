import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'DELETE')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED);

    // need some kind of authentification
    // check that req.sender == event.created_by

    const event = await prisma.event.findFirst({
      where: {
        name: 'Tech Expo 2024',
      },
    });

    if (event == null || event == undefined) {
      return res.status(HttpStatus.BAD_REQUEST);
    }

    await prisma.event.delete({
      where: {
        id: event.id,
      },
    });

    return res.status(HttpStatus.OK);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
