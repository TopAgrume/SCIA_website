import type { NextApiRequest, NextApiResponse } from 'next';
import HttpStatus from '@/lib/status';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST') return res.status(HttpStatus.METHOD_NOT_ALLOWED);

    // need some kind of authentification

    return res.status(HttpStatus.OK);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}