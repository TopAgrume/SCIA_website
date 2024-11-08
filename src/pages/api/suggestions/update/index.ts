import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';
import { type Suggestion } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'PUT')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification
    // TODO : req.sender == suggestion.created_by

    const suggestion = req.body as Suggestion;

    const id = (
      await prisma.suggestion.findFirst({
        where: {
          name: suggestion.name,
        },
      })
    )?.id;

    if (
      id == null ||
      id == undefined ||
      (suggestion.type !== 'ARTICLE' && suggestion.type !== 'VIDEO') ||
      suggestion.link === '' ||
      suggestion.summary === ''
    )
      return res.status(HttpStatus.BAD_REQUEST).end();

    await prisma.suggestion.update({
      where: {
        id: id,
      },
      data: {
        link: suggestion.link,
        summary: suggestion.summary,
        type: suggestion.type,
      },
    });

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
