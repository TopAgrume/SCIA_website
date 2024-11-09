'use client';

import Loading from '@/components/Loading';
import { type Suggestion } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function AddSuggestion() {
  return (
    <div className='w-screen flex items-center justify-center'>
      <div className='ml-auto mr-auto flex'>
        <p className='p-2 font-bold'>{'-> ->'}</p>
        <button className='p-2 rounded-sm hover:bg-gray-300 font-bold'>
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
    <div
      style={{
        gridArea: `${Math.floor((indice + 1) / 3)} ${(indice % 3) + 1} ${Math.floor((indice + 1) / 3) + 1} ${(indice % 3) + 2}`,
      }}
      className='bg-secondary border rounded-sm border-black block p-5'
    >
      <div className='flex'>
        <h1 className='text-lg font-bold'>{suggestion.name}</h1>
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
      {suggestion.type === 'ARTICLE' ? (
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
            width={16}
            height={16}
            style={{ width: 'auto', height: '100%' }}
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
      <p className='text-sm mt-5'>{`par ${suggestion.by}`}</p>
      <p className='mt-1 text-xs'>{`posté le ${suggestion.date.toLocaleString().split(',')[0]}`}</p>
    </div>
  );
}

export default function Suggestions() {
  const [loading, setLoading] = useState<boolean>(true);
  const [suggestions, setSuggestions] = useState<Array<Suggestion>>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/suggestions');
      if (data.status !== 200) {
        console.error(`Fetch returned ${data.status}`);
        return;
      }
      const json = (await data.json()) as Array<Suggestion>;
      setSuggestions(
        json.map(suggestion => {
          return {
            ...suggestion,
            date: new Date(suggestion.date),
          } as Suggestion;
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
    <div className='pt-4'>
      {loading ? null : <AddSuggestion />}
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
}
