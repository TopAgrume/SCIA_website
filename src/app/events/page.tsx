'use client';

import Badge from '@/components/Badge';
import Loading from '@/components/Loading';
import { type Event } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ExternalLinkIcon, GearIcon, SymbolIcon } from '@radix-ui/react-icons';

type EventCardProps = {
  event: Event;
  index: number;
};

function EventCard({ event, index: i }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [onParticipantsList, setOnParticipantsList] = useState<boolean>(false);
  const [attending, setAttending] = useState<boolean>(event.attending);
  const [attendingLoading, setAttendingLoading] = useState<boolean>(false);

  const attendEvent = async () => {
    setAttendingLoading(true);

    const data = await fetch('/api/events/attend', {
      method: 'POST',
      body: JSON.stringify({ name: event.name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (data.status === 200) {
      setAttending(!attending);
      if (!attending)
        event.participants.push('JOHN DOE'); // TODO: change with username
      else {
        const index = event.participants.indexOf('JOHN DOE'); // TODO: change with username
        if (index > -1) {
          event.participants.splice(index, 1);
        }
      }
    } else {
      console.error(`Fetch returned ${data.status}`);
    }
    setAttendingLoading(false);
  };

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
        {event.startDate.getTime() === event.endDate.getTime()
          ? event.startDate.toLocaleString('fr-FR').split(' ')[0]
          : `du ${event.startDate.toLocaleString('fr-FR').split(' ')[0]} au ${
              event.endDate.toLocaleString('fr-FR').split(' ')[0]
            }`}
      </h3>
      <p className='mb-4'>{event.about}</p>
      <p className='mb-5 text-sm'>{`par ${event.by}`}</p>

      <div className='relative flex'>
        <button
          className='bg-taskbar_button hover:bg-taskbar_button_hover mr-4 p-2 border border-black rounded-md font-bold text-xs'
          onClick={attendEvent}
        >
          {attendingLoading ? (
            <SymbolIcon className='animate-spin' />
          ) : !attending ? (
            "😊 J'y serai !"
          ) : (
            "Je n'y serai pas 😞"
          )}
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
            {event.participants.length == 0 ? (
              <p className='m-2'>Personne pour le moment</p>
            ) : (
              event.participants.map((participant, i) => (
                <p key={`participant_${i}`} className='m-2'>
                  {participant}
                </p>
              ))
            )}
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
  const [events, setEvents] = useState<Array<Event>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/events');
      if (data.status !== 200) {
        console.error(`Fetch returned ${data.status}`);
        return;
      }
      const json = (await data.json()) as Array<Event>;
      setEvents(
        json.map(event => {
          return {
            ...event,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
          } as Event;
        }),
      );
    };

    fetchData()
      .then(() => {
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className='flex flex-wrap bg-gray-200 p-5'>
      {loading ? null : <AddEvent />}
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
                      src={`/static/images/cats/${event.imagePath}`}
                      alt='goofy cat'
                      fill
                      sizes='100vh'
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={`mr-5 relative w-4/12 mt-5`}>
                    <Image
                      src={`/static/images/cats/${event.imagePath}`}
                      alt='goofy cat'
                      fill
                      sizes='100vh'
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
