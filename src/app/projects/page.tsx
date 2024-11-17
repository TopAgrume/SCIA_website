'use client';

import Loading from '@/components/Loading';
import { type Project } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDarkMode } from '@/providers/DarkModeProvider';
import AnimatedButton from '@/components/buttons/AnimatedButton';
import PlusIcon from '@/components/icons/PlusIcon';
import { useRouter } from 'next/navigation';
import LinkPreview from '@/components/LinkPreview';
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid';

function AddProject() {
  const router = useRouter();

  return (
    <div className='flex justify-center mb-8 w-full'>
      <AnimatedButton
        icon={<PlusIcon />}
        size='lg'
        onClick={() => {
          router.push('/projects/add');
        }}
      >
        Ajouter un projet
      </AnimatedButton>
    </div>
  );
}

type PresentationCardProps = {
  project: Project;
  className?: string;
};

function PresentationCard({ project, className = '' }: PresentationCardProps) {
  const { isDarkMode } = useDarkMode();
  const githubIcon = isDarkMode ? '/github_white.png' : '/github_black.png';

  const header = (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex justify-center items-center bg-gradient-to-br from-violet-500 to-blue-500 rounded-full w-12 h-12 font-bold text-white text-xl'>
          {project.by.charAt(0)}
        </div>
        {project.isAuthor && (
          <AnimatedButton
            variant='secondary'
            size='sm'
            className='ml-auto'
            icon={
              <Image
                src='/settings.png'
                alt='project settings'
                width={18}
                height={18}
              />
            }
          >
            Modifier
          </AnimatedButton>
        )}
      </div>
      <div className='bg-gray-200 dark:bg-gray-700 my-4 h-px' />
    </>
  );

  return (
    <BentoGridItem
      className={`${className} hover:dark:border-neutral-600 hover:border-neutral-300`}
      header={header}
      title={project.name}
      description={
        <div className='space-y-3'>
          <p>{project.about}</p>
          <div className='flex items-center'>
            <Image src={githubIcon} alt='github logo' height={16} width={16} />
            <LinkPreview
              url={project.link}
              width={300}
              height={200}
              className='ml-2 font-bold text-red-400 text-sm hover:text-red-500 transition-colors duration-200'
            >
              Voir le projet
            </LinkPreview>
          </div>
          <div className='space-y-1'>
            <p className='text-sm'>{`par ${project.by}`}</p>
            <p className='text-gray-500 text-xs'>{`posté le ${project.date.toLocaleString().split(',')[0]}`}</p>
          </div>
        </div>
      }
    />
  );
}

export default function Projects() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const projects: Array<Project> = [];

  for (let i = 0; i < 5; i++) {
    projects.push({
      name: 'Site SCIA',
      about:
        "C'est le développement du site internet de la majeure SCIA pour en faire un endroit accueillant, regroupant plein d'informations, de projets et de connaissances !",
      link: 'https://github.com/TopAgrume/SCIA_website',
      by: 'Maël Reynaud',
      photo: null,
      date: new Date(),
      isAuthor: true,
    } satisfies Project);
  }

  return (
    <div className='bg-gray-200 dark:bg-gray-800 p-8'>
      <AddProject />
      {loading ? (
        <Loading />
      ) : (
        <BentoGrid className='md:grid-cols-2 lg:grid-cols-3 w-full'>
          {projects.map((project, i) => (
            <PresentationCard
              key={i}
              project={project}
              className={i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}
            />
          ))}
        </BentoGrid>
      )}
    </div>
  );
}
