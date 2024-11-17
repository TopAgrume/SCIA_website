'use client';

import AnimatedButton from '@/components/buttons/AnimatedButton';
import Card from '@/components/Card';
import CardHeader from '@/components/cards/CardHeader';
import PlusIcon from '@/components/icons/PlusIcon';
import ExternalLink from '@/components/links/ExternalLink';
import { type Suggestion } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type SuggestionProps = {
  indice: number;
  suggestion: Suggestion;
};

function SuggestionCard({ indice, suggestion }: SuggestionProps) {
  return (
    <Card
      className={`block grid-area-[${Math.floor((indice + 1) / 3)}_${(indice % 3) + 1}_${Math.floor((indice + 1) / 3) + 1}_${(indice % 3) + 2}]`}
    >
      <CardHeader
        title={suggestion.name}
        action={
          suggestion.isAuthor && (
            <AnimatedButton
              variant='secondary'
              size='sm'
              icon={
                <Image
                  src='/settings.png'
                  alt='settings logo'
                  width={20}
                  height={20}
                />
              }
            >
              Modifier
            </AnimatedButton>
          )
        }
      />

      <ExternalLink
        href={suggestion.link}
        icon={suggestion.type === 'article' ? undefined : '/youtube.png'}
      >
        {suggestion.type === 'article'
          ? "📰 Lien vers l'article"
          : 'Lien vers la vidéo'}
      </ExternalLink>

      <p className='mt-3 text-gray-700 dark:text-gray-300'>
        {suggestion.summary}
      </p>
      <div className='space-y-1 mt-5'>
        <p className='text-gray-600 text-sm dark:text-gray-400'>
          par {suggestion.by}
        </p>
        <p className='text-gray-500 text-xs dark:text-gray-500'>
          posté le {suggestion.date.toLocaleString().split(',')[0]}
        </p>
      </div>
    </Card>
  );
}

function AddSuggestion() {
  const router = useRouter();

  return (
    <div className='flex justify-center mb-8 w-full'>
      <AnimatedButton
        icon={<PlusIcon />}
        size='lg'
        onClick={() => {
          router.push('/suggestions/add');
        }}
      >
        Ajouter une suggestion
      </AnimatedButton>
    </div>
  );
}

export default function Suggestions() {
  const suggestions: Array<Suggestion> = [];

  for (let i = 0; i < 4; i++) {
    suggestions.push({
      name: 'Attention is all you need',
      type: 'article',
      by: 'Maël Reynaud',
      date: new Date(21, 9, 2024),
      isAuthor: true,
      link: 'https://arxiv.org/pdf/1706.03762',
      summary:
        'Article presenting a new architecture called Transformer which uses attention mechanism.',
    } as Suggestion);
  }

  return (
    <div className='flex flex-wrap bg-gray-200 dark:bg-gray-800 p-5'>
      <AddSuggestion />
      <div
        className={`grid grid-cols-3 grid-rows-${Math.ceil(
          suggestions.length / 4,
        )} gap-6 pad-5 p-5`}
      >
        {suggestions.map((suggestion, i) => {
          return (
            <SuggestionCard
              key={`suggestion_${i}`}
              indice={i}
              suggestion={suggestion}
            />
          );
        })}
      </div>
    </div>
  );
}
