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
    // TODO : check that req.sender == suggestion.created_by

    const name = req.body['name'];

    const suggestion = await prisma.suggestion.findFirst({
      where: {
        name: name,
      },
    });

    if (suggestion == null || suggestion == undefined) {
      return res.status(HttpStatus.BAD_REQUEST).end();
    }

    await prisma.suggestion.delete({
      where: {
        id: suggestion.id,
      },
    });

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
