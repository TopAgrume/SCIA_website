import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import HttpStatus from '@/lib/status';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== 'POST')
      return res.status(HttpStatus.METHOD_NOT_ALLOWED).end();

    // TODO : authentification

    const name = req.body['name'];

    const event = await prisma.event.findFirst({ where: { name: name } });

    if (event == null || event == undefined)
      return res.status(HttpStatus.BAD_REQUEST).end();

    // TODO : change user_name by current_user
    const eventAttending = await prisma.event_attending.findFirst({
      where: { event_id: event.id, user_name: 'JOHNDOE' }, // eslint-disable-line
    });

    // TODO : change user_name by current_user
    if (eventAttending == null || eventAttending == undefined) {
      await prisma.event_attending.create({
        data: { event_id: event.id, user_name: 'JOHNDOE', is_attending: true }, // eslint-disable-line
      });
    } else {
      await prisma.event_attending.update({
        where: { id: eventAttending.id },
        data: { is_attending: !eventAttending.is_attending }, // eslint-disable-line
      });
    }

    return res.status(HttpStatus.OK).end();
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
}
