import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { type Suggestion } from '@/lib/types';
import HttpStatus from '@/lib/status';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification

    const suggestion = req.body as Suggestion;

    if (
      (suggestion.type !== 'ARTICLE' && suggestion.type !== 'VIDEO') ||
      suggestion.name === '' ||
      suggestion.link === '' ||
      suggestion.summary === ''
    )
      return res.status(HttpStatus.BAD_REQUEST).end();

    const existing = await prisma.suggestion.findFirst({
      where: {
        name: suggestion.name,
      },
    });
    if (existing)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Suggestion with same name already exists' });

    // TODO : change created_by by current_user
    await prisma.suggestion.create({
      data: {
        name: suggestion.name,
        link: suggestion.link,
        summary: suggestion.summary,
        type: suggestion.type,
        created_by: 'JOHN DOE', // eslint-disable-line
      },
    });

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
