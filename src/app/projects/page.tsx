'use client';

import Loading from '@/components/Loading';
import { type Project } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function Integrations() {
  return (
    <div className='bg-gray-200 p-4 w-1/2 h-[calc(100vh-42px)] overflow-y-auto'>
      <h1 className='mb-4 font-bold text-xl'>Intégrations</h1>
    </div>
  );
}

type PresentationCardProps = {
  project: Project;
};

function PresentationCard({ project }: PresentationCardProps) {
  return (
    <div className='flex bg-secondary mt-5 p-5 border border-black rounded-sm'>
      <div className={`w-${project.photo != null ? '2/3' : 'full'}`}>
        <div className='flex'>
          <h2 className='font-bold text-xl'>{project.name}</h2>
          {project.isAuthor ? (
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
        <div className='flex items-center mt-2'>
          <Image src='/github.png' alt='github logo' height={16} width={16} />
          <Link
            target='_blank'
            className='ml-2 font-bold text-red-400 text-sm'
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
        <div className='relative w-1/3'>
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
    <div className='bg-gray-200 p-4 w-1/2 h-[calc(100vh-42px)] overflow-y-auto'>
      <div className='flex mb-4'>
        <h1 className='font-bold text-xl'>Présentations</h1>
        <button className='hover:bg-gray-300 mt-auto mb-auto ml-auto p-1 rounded-sm text-sm'>
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
  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/projects');
      const json = (await data.json()) as Array<Project>;
      setProjects(
        json.map(project => {
          return {
            ...project,
            photo: '/transformer.png',
            date: new Date(project.date),
          } as Project;
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
    <div className='flex h-[calc(100vh-42px)]'>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Integrations />
          <div className='bg-gray-400 w-[2px] h-[calc(100vh-42px)]'></div>
          <Presentations presentations={projects} />
        </>
      )}
    </div>
  );
}
