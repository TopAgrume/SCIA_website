import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';
import { type Project } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification

    const projects = await prisma.project.findMany({
      orderBy: [
        {
          created_by: 'desc', // eslint-disable-line
        },
      ],
    });
    const projectsMapped = projects.map(project => {
      return {
        name: project.name,
        link: project.link,
        about: project.about,
        by: project.by,
        image: null, // TODO : deal with photo
        date: project.created_at,
        isAuthor: false, // TODO : check that req.sender == project.created_by
      } as Project;
    });

    return res.status(HttpStatus.OK).json(projectsMapped);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
