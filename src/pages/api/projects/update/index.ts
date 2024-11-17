import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';
import { type Project } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'PUT')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification
    // TODO : req.sender == project.created_by

    const project = req.body as Project;

    const id = (
      await prisma.project.findFirst({
        where: {
          name: project.name,
        },
      })
    )?.id;

    if (
      id == null ||
      id == undefined ||
      project.link === '' ||
      project.about === '' ||
      project.by === ''
    )
      return res.status(HttpStatus.BAD_REQUEST).end();

    await prisma.project.update({
      where: {
        id: id,
      },
      data: {
        about: project.about,
        link: project.link,
        by: project.by,
      },
    });

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
