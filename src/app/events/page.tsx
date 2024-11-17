'use client';

import Badge from '@/components/Badge';
import Loading from '@/components/Loading';
import { type Event } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ExternalLinkIcon, GearIcon } from '@radix-ui/react-icons';
import Card from '@/components/Card';
import HoverCard from '@/components/HoverCard';

type EventCardProps = {
  event: Event;
  index: number;
};

function ParticipantsList({ participants }: { participants: string[] }) {
  return (
    <div className='p-3 min-w-[200px]'>
      <h3 className='mb-2 font-semibold text-gray-800 dark:text-gray-200'>
        Participants
      </h3>
      {participants.map((participant, i) => (
        <p
          key={`participant_${i}`}
          className='px-2 py-1 text-gray-600 text-sm dark:text-gray-300'
        >
          {participant}
        </p>
      ))}
    </div>
  );
}

function EventCard({ event, index: i }: EventCardProps) {
  const [attending, setAttending] = useState<boolean>(event.attending);

  return (
    <Card className={`block mt-5 ${i % 2 == 0 ? '' : 'ml-auto'} w-8/12`}>
      <div className='flex'>
        <h1 className='mt-auto mr-4 mb-auto font-bold text-2xl'>
          {event.name}
        </h1>
        <Link
          href={event.link}
          target='_blank'
          className='mt-auto mb-auto hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400 duration-300'
        >
          <ExternalLinkIcon className='w-4 h-4' />
        </Link>
        {event.isAuthor ? (
          <button className='ml-4 hover:scale-110 hover:text-gray-600 dark:hover:text-gray-400 duration-300'>
            <GearIcon className='w-5 h-5' />
          </button>
        ) : null}
        <Badge
          startDate={event.startDate}
          endDate={event.endDate}
          onClick={() => {
            console.log('Badge clicked');
          }}
        />
      </div>
      <h2 className='text-lg'>{event.place}</h2>
      <h3 className='mb-4 text-sm'>
        {event.endDate == null
          ? event.startDate.toLocaleString().split(',')[0]
          : `du ${event.startDate.toLocaleString().split(',')[0]} au ${
              event.endDate.toLocaleString().split(',')[0]
            }`}
      </h3>
      <p className='mb-4'>{event.about}</p>
      <p className='mb-5 text-sm'>{`par ${event.by}`}</p>

      <div className='relative flex'>
        <button
          className={`${
            attending
              ? 'bg-red-100 hover:bg-red-200 text-red-700 border-red-300'
              : 'bg-green-100 hover:bg-green-200 text-green-700 border-green-300'
          } mr-4 px-4 py-2 border rounded-lg font-bold text-sm transition-all duration-200 hover:shadow-md`}
          onClick={() => {
            setAttending(!attending);
          }}
        >
          {!attending ? "😊 J'y serai !" : "Je n'y serai pas 😞"}
        </button>

        <HoverCard
          content={<ParticipantsList participants={event.participants} />}
          position='bottom'
        >
          <span className='mt-auto mb-auto text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:cursor-pointer'>
            Voir la liste des participants
          </span>
        </HoverCard>
      </div>
    </Card>
  );
}

function AddEvent() {
  return (
    <div className='flex justify-center mb-8 w-full'>
      <button className='relative before:-z-10 before:absolute before:inset-0 bg-black dark:bg-white before:bg-gradient-to-r before:from-blue-600 before:to-violet-600 before:opacity-0 hover:before:opacity-100 hover:shadow-xl before:blur-xl px-8 py-3 rounded-xl before:rounded-xl font-bold text-white dark:text-black transform transition-all before:transition-opacity hover:-translate-y-1 duration-300 before:duration-300 group'>
        <span className='flex items-center'>
          <svg
            className='group-hover:rotate-180 mr-2 w-5 h-5 transform transition-transform duration-300'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 4v16m8-8H4'
            />
          </svg>
          Ajouter un événement
        </span>
      </button>
    </div>
  );
}

export default function Events() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const events: Array<Event> = [];
  for (const i of [1, 2, 3, 4, 5]) {
    events.push({
      name: 'Développement du site SCIA',
      link: 'https://github.com/TopAgrume/SCIA_website',
      place: 'Paris',
      about:
        "C'est le développement du site internet de la majeure SCIA pour en faire un endroit accueillant, regroupant plein d'informations, de projets et de connaissances !",
      startDate: new Date(2024, 9, 23 - i),
      endDate: null,
      by: 'Maël Reynaud & Alexandre Devaux-Rivière & Pierre-Louis Favreau',
      attending: false,
      participants: [
        'mael.reynaud',
        'alexandre.devaux-riviere',
        'pierre-louis.favreau',
      ],
      isAuthor: i % 2 == 0,
    } as unknown as Event);
  }

  return (
    <div className='flex flex-wrap bg-gray-200 dark:bg-gray-800 p-5'>
      <AddEvent />
      {loading ? (
        <Loading />
      ) : (
        events.map((event, i) => {
          return (
            <div key={i} className='flex mb-5 w-full'>
              {i % 2 === 0 ? (
                <>
                  <EventCard key={i} event={event} index={i} />
                  <div className={`ml-5 relative w-4/12 mt-5 group`}>
                    <div className='absolute inset-0 opacity-80 hover:opacity-100 rounded-2xl transition-opacity duration-300 overflow-hidden'>
                      <div className='z-10 absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                      <Image
                        src={`/cats/${i}.jpg`}
                        alt='goofy cat'
                        layout='fill'
                        objectFit='cover'
                        className='group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={`mr-5 relative w-4/12 mt-5 group`}>
                    <div className='absolute inset-0 opacity-80 hover:opacity-100 rounded-2xl transition-opacity duration-300 overflow-hidden'>
                      <div className='z-10 absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                      <Image
                        src={`/cats/${i}.jpg`}
                        alt='goofy cat'
                        layout='fill'
                        objectFit='cover'
                        className='group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                  </div>
                  <EventCard key={i} event={event} index={i} />
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
