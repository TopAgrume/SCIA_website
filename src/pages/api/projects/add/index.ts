import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { type Project } from '@/lib/types';
import HttpStatus from '@/lib/status';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification
    const project = {
      ...req.body,
      photo: null,
      date: new Date(),
      isAuthor: false,
    } as Project;

    if (
      project.name === '' ||
      project.link === '' ||
      project.about === '' ||
      project.by === ''
    )
      return res.status(HttpStatus.BAD_REQUEST).end();

    const existing = await prisma.project.findFirst({
      where: {
        name: project.name,
      },
    });
    if (existing)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Project with same name already exist' });

    // TODO : change created_by by current_user
    await prisma.project.create({
      data: {
        name: project.name,
        link: project.link,
        about: project.about,
        by: project.by,
        created_by: 'JOHN DOE', // eslint-disable-line
      },
    });

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
