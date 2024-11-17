import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';
import { type Event } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'PUT')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification
    // TODO : req.sender == event.created_by

    const event = {
      ...req.body,
      startDate: new Date(req.body['startDate']),
      endDate: new Date(req.body['endDate']),
    } as Event;

    const id = (
      await prisma.event.findFirst({
        where: {
          name: event.name,
        },
      })
    )?.id;

    if (
      id == null ||
      id == undefined ||
      event.link === '' ||
      event.place === '' ||
      event.about === '' ||
      event.by === '' ||
      event.startDate.toString() === 'Invalid Date' ||
      event.endDate.toString() === 'Invalid Date'
    )
      return res.status(HttpStatus.BAD_REQUEST).end();

    await prisma.event.update({
      where: {
        id: id,
      },
      data: {
        about: event.about,
        link: event.link,
        by: event.by,
        place: event.place,
        start_date: event.startDate, // eslint-disable-line
        end_date: event.endDate, // eslint-disable-line
      },
    });

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
