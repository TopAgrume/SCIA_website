'use client';

import Badge from '@/components/Badge';
import Card from '@/components/Card';
import HoverCard from '@/components/HoverCard';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import AnimatedButton from '@/components/buttons/AnimatedButton';
import PlusIcon from '@/components/icons/PlusIcon';
import { type Event } from '@/lib/types';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center'>
          <h1 className='font-bold text-2xl'>{event.name}</h1>
          <Link
            href={event.link}
            target='_blank'
            className='ml-4 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400 duration-300'
          >
            <ExternalLinkIcon className='w-4 h-4' />
          </Link>
          {event.isAuthor && (
            <AnimatedButton
              variant='secondary'
              size='sm'
              className='ml-4'
              icon={
                <Image
                  src='/settings.png'
                  alt='event settings'
                  width={18}
                  height={18}
                />
              }
            >
              Modifier
            </AnimatedButton>
          )}
        </div>
        <Badge
          startDate={event.startDate}
          endDate={event.endDate}
          onClick={() => {
            console.log('Badge clicked');
          }}
        />
      </div>
      <div className='space-y-2 mb-6'>
        <h2 className='text-gray-800 text-lg dark:text-gray-200'>
          {event.place}
        </h2>
        <h3 className='text-gray-600 text-sm dark:text-gray-400'>
          {event.endDate == null
            ? event.startDate.toLocaleString().split(',')[0]
            : `du ${event.startDate.toLocaleString().split(',')[0]} au ${
                event.endDate.toLocaleString().split(',')[0]
              }`}
        </h3>
      </div>
      <p className='mb-4 text-gray-700 dark:text-gray-300'>{event.about}</p>
      <p className='mb-5 text-gray-600 text-sm dark:text-gray-400'>{`par ${event.by}`}</p>

      <div className='flex items-center'>
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
          <span className='text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:cursor-pointer'>
            Voir la liste des participants
          </span>
        </HoverCard>
      </div>
    </Card>
  );
}

function AddEventForm({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: Event) => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Event>();

  const startDate = watch('startDate');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300'>
          Nom de l'événement
        </label>
        <input
          {...register('name', {
            required: "Le nom de l'événement est requis",
          })}
          className='border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-blue-500 w-full'
        />
        {errors.name && (
          <p className='mt-1 text-red-600 text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300'>
          Lieu
        </label>
        <input
          {...register('place', { required: 'Le lieu est requis' })}
          className='border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-blue-500 w-full'
        />
        {errors.place && (
          <p className='mt-1 text-red-600 text-sm'>{errors.place.message}</p>
        )}
      </div>

      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300'>
          Description
        </label>
        <textarea
          {...register('about', { required: 'La description est requise' })}
          rows={4}
          className='border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-blue-500 w-full'
        />
        {errors.about && (
          <p className='mt-1 text-red-600 text-sm'>{errors.about.message}</p>
        )}
      </div>

      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300'>
          Lien (optionnel)
        </label>
        <input
          {...register('link', {
            pattern: {
              value: /^https?:\/\/.+/,
              message: 'Le lien doit commencer par http:// ou https://',
            },
          })}
          className='border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-blue-500 w-full'
        />
        {errors.link && (
          <p className='mt-1 text-red-600 text-sm'>{errors.link.message}</p>
        )}
      </div>

      <div className='gap-4 grid grid-cols-2'>
        <div>
          <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300'>
            Date de début
          </label>
          <input
            type='datetime-local'
            {...register('startDate', {
              required: 'La date de début est requise',
            })}
            className='border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-blue-500 w-full'
          />
          {errors.startDate && (
            <p className='mt-1 text-red-600 text-sm'>
              {errors.startDate.message}
            </p>
          )}
        </div>

        <div>
          <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300 whitespace-nowrap'>
            Date de fin (optionnelle)
          </label>
          <input
            type='datetime-local'
            {...register('endDate', {
              validate: value =>
                !value ||
                new Date(value) > new Date(startDate) ||
                'La date de fin doit être après la date de début',
            })}
            className='border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-blue-500 w-full'
          />
          {errors.endDate && (
            <p className='mt-1 text-red-600 text-sm'>
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      <div className='flex justify-end space-x-3'>
        <AnimatedButton variant='secondary' onClick={onClose}>
          Annuler
        </AnimatedButton>
        <AnimatedButton variant='primary'>Créer</AnimatedButton>
      </div>
    </form>
  );
}

function AddEvent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: Event) => {
    // Here you would typically make an API call to save the event
    console.log('New event:', {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      attending: false,
      participants: [],
      isAuthor: true,
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='flex justify-center mb-8 w-full'>
        <AnimatedButton
          icon={<PlusIcon />}
          size='lg'
          onClick={() => setIsModalOpen(true)}
        >
          Ajouter un événement
        </AnimatedButton>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Nouvel événement'
      >
        <AddEventForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
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
