import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';
import { type Suggestion } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification

    const suggestions = await prisma.suggestion.findMany({
      orderBy: [
        {
          created_by: 'desc', // eslint-disable-line
        },
      ],
    });
    const suggestionsMapped = suggestions.map(suggestion => {
      return {
        name: suggestion.name,
        link: suggestion.link,
        type: suggestion.type,
        summary: suggestion.summary,
        date: suggestion.created_at,
        by: suggestion.created_by,
        isAuthor: false, // TODO : check that req.sender == suggestion.created_by
      } as Suggestion;
    });

    return res.status(HttpStatus.OK).json(suggestionsMapped);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
