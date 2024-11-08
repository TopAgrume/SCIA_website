import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';
import { type Event } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification

    const events = await prisma.event.findMany({
      orderBy: [
        {
          start_date: 'desc', // eslint-disable-line
        },
      ],
    });
    const eventsMapped = await Promise.all(
      events.map(async event => {
        const participants = await prisma.eventAttending.findMany({
          where: { event_id: event.id }, // eslint-disable-line
        });
        const participantsOnlyNames = participants
          ? participants
              .filter(participant => participant.is_attending)
              .map(participant => participant.user_name)
          : [];

        return {
          name: event.name,
          link: event.link,
          place: event.place,
          about: event.about,
          startDate: event.start_date,
          endDate: event.end_date,
          by: event.by,
          attending: false, // TODO : check event_attending with req.sender
          participants: participantsOnlyNames,
          isAuthor: false, // TODO : check that req.sender == event.created_by
        } as Event;
      }),
    );

    return res.status(HttpStatus.OK).json(eventsMapped);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
