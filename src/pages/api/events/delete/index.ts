import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'DELETE')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification
    // TODO : check that req.sender == event.created_by

    const name = req.body['name'];

    const event = await prisma.event.findFirst({
      where: {
        name: name,
      },
    });

    if (event == null || event == undefined) {
      return res.status(HttpStatus.BAD_REQUEST).end();
    }

    await prisma.event.delete({
      where: {
        id: event.id,
      },
    });

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
