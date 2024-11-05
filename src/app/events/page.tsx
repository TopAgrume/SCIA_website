'use client';

import Badge from '@/components/Badge';
import Loading from '@/components/Loading';
import { type Event } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ExternalLinkIcon, GearIcon } from '@radix-ui/react-icons';

type EventCardProps = {
  event: Event;
  index: number;
};

function EventCard({ event, index: i }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [onParticipantsList, setOnParticipantsList] = useState<boolean>(false);
  const [attending, setAttending] = useState<boolean>(event.attending);

  return (
    <div
      ref={cardRef}
      className={`bg-secondary border rounded-sm border-black block p-5 mt-5 ${
        i % 2 == 0 ? '' : 'ml-auto'
      } w-8/12`}
    >
      <div className='flex'>
        <h1 className='mt-auto mr-4 mb-auto font-bold text-2xl'>
          {event.name}
        </h1>
        <Link
          href={event.link}
          target='_blank'
          className='mt-auto mb-auto hover:scale-110 duration-300'
        >
          <ExternalLinkIcon className='w-4 h-4' />
        </Link>
        {event.isAuthor ? (
          <button className='ml-4 hover:scale-110 duration-300'>
            <GearIcon className='w-5 h-5' />
          </button>
        ) : null}
        <Badge startDate={event.startDate} endDate={event.endDate} />
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
          className='bg-taskbar_button hover:bg-taskbar_button_hover mr-4 p-2 border border-black rounded-md font-bold text-xs'
          onClick={() => {
            setAttending(!attending);
            // while updating in DB, loading button
          }}
        >
          {!attending ? "😊 J'y serai !" : "Je n'y serai pas 😞"}
        </button>

        <p
          onMouseEnter={() => setOnParticipantsList(true)}
          onMouseLeave={() => setOnParticipantsList(false)}
          className='mt-auto mr-4 mb-auto text-xs hover:cursor-grab'
        >
          Voir la liste des participants
        </p>

        {/* Participants list absolutely positioned below the paragraph */}
        {onParticipantsList && (
          <div
            className={`absolute ${!attending ? 'left-36' : 'left-44'} top-full mt-2 w-max border border-yellow-100 bg-yellow-50 text-xs p-2 rounded-sm shadow-lg z-10`}
          >
            {event.participants.map((participant, i) => (
              <p key={`participant_${i}`} className='m-2'>
                {participant}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AddEvent() {
  return (
    <div className='flex mr-auto ml-auto'>
      <p className='p-2 font-bold'>{'-> ->'}</p>
      <button className='hover:bg-gray-300 p-2 rounded-sm font-bold'>
        Ajouter un évenement
      </button>
      <p className='p-2 font-bold'>{'<- <-'}</p>
    </div>
  );
}

export default function Events() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/hello');
      const json = await data.json();
      console.log(json);
    };

    fetchData().catch(console.error);

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
        'mael.reynaud',
        'alexandre.devaux-riviere',
      ],
      isAuthor: i % 2 == 0,
    } as unknown as Event);
  }

  return (
    <div className='flex flex-wrap bg-gray-200 p-5'>
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
                  <div className={`ml-5 relative w-4/12 mt-5`}>
                    <Image
                      src={`/cats/${i}.jpg`}
                      alt='goofy cat'
                      layout='fill'
                      objectFit='fill'
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={`mr-5 relative w-4/12 mt-5`}>
                    <Image
                      src={`/cats/${i}.jpg`}
                      alt='goofy cat'
                      layout='fill'
                      objectFit='fill'
                    />
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
