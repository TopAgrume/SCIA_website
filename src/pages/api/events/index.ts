import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';
import { type Event } from '@/lib/types';
import fs from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'GET')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification
    const reqSender = 'JOHNDOE';

    const events = await prisma.event.findMany({
      orderBy: [
        {
          start_date: 'desc', // eslint-disable-line
        },
      ],
    });

    const images = fs.readdirSync('public/static/images/cats');
    const sample = (arr: Array<string>) =>
      arr[Math.floor(Math.random() * arr.length)];

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

        const eventAttending = await prisma.eventAttending.findFirst({
          where: { event_id: event.id, user_name: reqSender }, // eslint-disable-line
        });

        return {
          name: event.name,
          link: event.link,
          place: event.place,
          about: event.about,
          startDate: event.start_date,
          endDate: event.end_date,
          imagePath: sample(images),
          by: event.by,
          attending: eventAttending ? eventAttending.is_attending : false,
          participants: participantsOnlyNames,
          isAuthor: event.created_by === reqSender,
        } as Event;
      }),
    );

    return res.status(HttpStatus.OK).json(eventsMapped);
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
