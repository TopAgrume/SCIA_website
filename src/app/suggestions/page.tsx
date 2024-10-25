import Card from '@/components/Card';
import { type Suggestion } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

function AddSuggestion() {
  return (
    <div className='flex justify-center items-center w-screen'>
      <div className='flex mr-auto ml-auto'>
        <p className='p-2 font-bold'>{'-> ->'}</p>
        <button className='hover:bg-gray-300 p-2 rounded-sm font-bold'>
          Ajouter une suggestion
        </button>
        <p className='p-2 font-bold'>{'<- <-'}</p>
      </div>
    </div>
  );
}

type SuggestionProps = {
  indice: number;
  suggestion: Suggestion;
};

function SuggestionCard({ indice, suggestion }: SuggestionProps) {
  return (
    <Card
      className={`block grid-area-[${Math.floor((indice + 1) / 3)}_${(indice % 3) + 1}_${Math.floor((indice + 1) / 3) + 1}_${(indice % 3) + 2}]`}
    >
      <div className='flex'>
        <h1 className='font-bold text-lg'>{suggestion.name}</h1>
        {suggestion.isAuthor ? (
          <button className='ml-4 hover:scale-110 duration-300'>
            <Image
              src='/settings.png'
              alt='settings logo'
              width={20}
              height={20}
            />
          </button>
        ) : null}
      </div>
      {suggestion.type === 'article' ? (
        <Link
          href={suggestion.link}
          target='_blank'
          className='text-red-400 text-sm'
        >
          {"📰 Lien vers l'article"}
        </Link>
      ) : (
        <div className='flex items-center'>
          <Image
            className='mr-2'
            src='/youtube.png'
            alt='youtube logo'
            width={20}
            height={20}
          />
          <Link
            href={suggestion.link}
            target='_blank'
            className='text-red-400 text-sm'
          >
            {'Lien vers la vidéo'}
          </Link>
        </div>
      )}
      <p className='mt-3'>{suggestion.summary}</p>
      <p className='mt-5 text-sm'>{`par ${suggestion.by}`}</p>
      <p className='mt-1 text-xs'>{`posté le ${suggestion.date.toLocaleString().split(',')[0]}`}</p>
    </Card>
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
    <div className='pt-4'>
      <AddSuggestion />
      <div
        className={`grid grid-cols-3 grid-rows-${Math.ceil(suggestions.length / 4)} gap-6 pad-5 p-5`}
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
