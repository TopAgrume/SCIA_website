import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';
import { type Event } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET') return res.status(HttpStatus.METHOD_NOT_ALLOWED);

    // need some kind of authentification

    const events = await prisma.event.findMany({
      orderBy: [
        {
          start_date: 'desc', // eslint-disable-line
        },
      ],
    });
    const eventsMapped = events.map(event => {
      return {
        name: event.name,
        link: event.link,
        place: event.place,
        about: event.about,
        startDate: event.start_date,
        endDate: event.end_date,
        by: event.by,
        attending: false, // check event_attending with req.sender
        participants: [], // join on event_attending
        isAuthor: false, // req.sender == event.created_by
      } as Event;
    });

    return res.status(HttpStatus.OK).json(eventsMapped);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
