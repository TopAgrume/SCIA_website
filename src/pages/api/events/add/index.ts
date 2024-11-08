import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { type Event } from '@/lib/types';
import HttpStatus from '@/lib/status';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification
    const event = {
      ...req.body,
      startDate: new Date(req.body['startDate']),
      endDate: new Date(req.body['endDate']),
      attending: false,
      participants: [],
      isAuthor: false,
    } as Event;

    if (
      event.name === '' ||
      event.link === '' ||
      event.place === '' ||
      event.about === '' ||
      event.by === '' ||
      event.startDate.toString() === 'Invalid Date' ||
      event.endDate.toString() === 'Invalid Date'
    )
      return res.status(HttpStatus.BAD_REQUEST).end();

    const existing = await prisma.event.findFirst({
      where: {
        name: event.name,
      },
    });
    if (existing)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Event with same name already exist' });

    // TODO : change created_by by current_user
    await prisma.event.create({
      data: {
        name: event.name,
        link: event.link,
        place: event.place,
        about: event.about,
        by: event.by,
        start_date: event.startDate, // eslint-disable-line
        end_date: event.endDate, // eslint-disable-line
        created_by: 'JOHN DOE', // eslint-disable-line
      },
    });

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
