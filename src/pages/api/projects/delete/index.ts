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
    // TODO : check that req.sender == project.created_by

    const name = req.body['name'];

    const project = await prisma.project.findFirst({
      where: {
        name: name,
      },
    });

    if (project == null || project == undefined) {
      return res.status(HttpStatus.BAD_REQUEST).end();
    }

    await prisma.project.delete({
      where: {
        id: project.id,
      },
    });

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
