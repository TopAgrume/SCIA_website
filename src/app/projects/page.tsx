'use client';

import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { type Project } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

function Integrations() {
  return (
    <div className='w-1/2 h-[calc(100vh-42px)] overflow-y-auto p-4 bg-gray-200'>
      <h1 className='text-xl font-bold mb-4'>Intégrations</h1>
    </div>
  );
}

type PresentationCardProps = {
  project: Project;
};

function PresentationCard({ project }: PresentationCardProps) {
  return (
    <div className='bg-secondary border rounded-sm border-black p-5 mt-5 flex'>
      <div className={`w-${project.photo != null ? '2/3' : 'full'}`}>
        <div className='flex'>
          <h2 className='text-xl font-bold'>{project.name}</h2>
          {project.is_author ? (
            <button className='ml-2 hover:scale-110 duration-300'>
              <Image
                src='/settings.png'
                alt='event settings'
                width={18}
                height={18}
              />
            </button>
          ) : null}
        </div>
        <div className='mt-2 flex items-center'>
          <Image src='/github.png' alt='github logo' height={16} width={16} />
          <Link
            target='_blank'
            className='text-sm text-red-400 ml-2 font-bold'
            href={project.link}
          >
            lien vers le projet
          </Link>
        </div>
        <p className='mt-3'>{project.about}</p>
        <p className='mt-4 text-sm'>{`par ${project.by}`}</p>
        <p className='mt-1 text-xs'>{`posté le ${project.date.toLocaleString().split(',')[0]}`}</p>
      </div>
      {project.photo != null ? (
        <div className='w-1/3 relative'>
          <Image
            fill
            objectFit='cover'
            src={project.photo}
            alt='project image'
          />
        </div>
      ) : null}
    </div>
  );
}

type PresentationsProps = {
  presentations: Array<Project>;
};

function Presentations({ presentations }: PresentationsProps) {
  return (
    <div className='w-1/2 h-[calc(100vh-42px)] overflow-y-auto p-4 bg-gray-200'>
      <div className='flex mb-4'>
        <h1 className='text-xl font-bold'>Présentations</h1>
        <button className='ml-auto text-sm mt-auto mb-auto hover:bg-gray-300 p-1 rounded-sm'>
          Ajouter un projet
        </button>
      </div>
      {presentations.map((e, i) => {
        return <PresentationCard key={`presentation_${i}`} project={e} />;
      })}
    </div>
  );
}

export default function Projects() {
  const [loading, setLoading] = useState<boolean>(true);

  const projects: Array<Project> = [];
  for (const i of [1, 2, 3, 4, 5]) {
    projects.push({
      name: 'Jax Transformer',
      about:
        "Ce projet est l'implémentation d'un transformer, decoder-only, en vanilla jax. Il permet de générer des petites histoires.",
      link: 'https://github.com/DjDonPablo/jax-transformer',
      by: 'Maël Reynaud',
      photo: '/transformer.png',
      date: new Date(2024, 9, 21),
      is_author: i % 2 == 0,
    } as Project);
  }

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div className='h-[calc(100vh-42px)] flex'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Integrations />
          <div className='w-[2px] h-[calc(100vh-42px)] bg-gray-400'></div>
          <Presentations presentations={projects} />
        </>
      )}
    </div>
  );
}
