'use client';

import Link from 'next/link';
import Card from '@/components/Card';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useAINews } from '@/hooks/useAINews';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function Presentation() {
  return (
    <Card>
      <h2 className='mb-4 font-bold text-2xl text-gray-800 dark:text-gray-100'>
        Bienvenue sur le site de la majeure SCIA d'EPITA !
      </h2>
      <p className='mb-4 text-gray-600 dark:text-gray-300'>
        Ce site est le site officiel de la majeure SCIA d'EPITA, sur lequel vous
        pourrez retrouver pleins d'informations et de projets super intéressants
        ! N'hésitez pas à faire des suggestions d'article scientifique, vidéo,
        ou de quelconque ressource en rapport avec l'IA ou la Data dans la
        partie Suggestions !
      </p>
      <p className='mb-4 text-gray-600 dark:text-gray-300'>
        Pour tout problème, proposition d'amélioration, demande ou réclamation,
        veuillez vous adresser directement à Mr Devaux-Rivière.
      </p>
      <p className='font-semibold text-gray-800 dark:text-gray-100'>
        This website is all you need.
      </p>
    </Card>
  );
}

function Links() {
  return (
    <Card>
      <h2 className='mb-4 font-bold text-2xl text-gray-800 dark:text-gray-100'>
        Liens utiles
      </h2>
      <ul className='space-y-4'>
        <li>
          <Link
            href='https://discord.gg/B4hdx4HV'
            target='_blank'
            className='flex items-center text-gray-600 hover:text-gray-800 dark:hover:text-white dark:text-gray-300 transition-colors group'
          >
            <Image
              src='/discord.png'
              alt='discord logo'
              width={24}
              height={24}
              className='mr-2'
            />
            <span className='flex-grow'>Serveur discord SCIA 2025</span>
            <ExternalLink className='opacity-0 group-hover:opacity-100 w-4 h-4 transition-opacity' />
          </Link>
        </li>
        <li>
          <Link
            href='https://www.wolframalpha.com/'
            target='_blank'
            className='flex items-center text-gray-600 hover:text-gray-800 dark:hover:text-white dark:text-gray-300 transition-colors group'
          >
            <Image
              src='/wolfram.png'
              alt='wolfram logo'
              width={24}
              height={24}
              className='mr-2'
            />
            <span className='flex-grow'>Wolfram alpha</span>
            <ExternalLink className='opacity-0 group-hover:opacity-100 w-4 h-4 transition-opacity' />
          </Link>
        </li>
      </ul>
    </Card>
  );
}

function AiNewsContent() {
  const { data: news } = useAINews();
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleExpand = (uri: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(uri)) {
        newSet.delete(uri);
      } else {
        newSet.add(uri);
      }
      return newSet;
    });
  };

  return (
    <div className='space-y-4'>
      {news.map(item => {
        const isExpanded = expandedItems.has(item.uri);
        const summaryText = item.summary?.eng || 'No summary available';
        const shouldTruncate = summaryText.length > 200;
        const displayText =
          shouldTruncate && !isExpanded
            ? `${summaryText.slice(0, 200)}...`
            : summaryText;

        return (
          <div
            key={item.uri}
            className='border-gray-200 dark:border-gray-800 last:border-0 pb-4 last:pb-0 border-b'
          >
            <div className='flex items-center group'>
              <div className='flex-grow'>
                <div className='flex items-start'>
                  <div>
                    <h3 className='font-medium text-gray-800 dark:text-gray-100'>
                      {item.title?.eng || 'No title'}
                    </h3>
                    <p className='mt-1 text-gray-600 text-sm dark:text-gray-300'>
                      {displayText}
                      {shouldTruncate && (
                        <button
                          onClick={() => toggleExpand(item.uri)}
                          className='ml-2 font-medium text-blue-500 hover:text-blue-600 dark:hover:text-blue-300 dark:text-blue-400'
                        >
                          {isExpanded ? 'View less' : 'View more'}
                        </button>
                      )}
                    </p>
                    <div className='flex items-center mt-2 text-gray-500 text-xs dark:text-gray-400'>
                      <span>
                        {format(new Date(item.eventDate), 'dd MMMM yyyy', {
                          locale: fr,
                        })}
                      </span>
                      <span className='mx-2'>•</span>
                      <span>{item.totalArticleCount} articles</span>
                      {item.sentiment !== null && (
                        <>
                          <span className='mx-2'>•</span>
                          <span>
                            Sentiment: {(item.sentiment * 100).toFixed(1)}%
                          </span>
                        </>
                      )}
                    </div>
                    <div className='flex flex-wrap gap-2 mt-2'>
                      {item.concepts?.slice(0, 3).map(concept => (
                        <span
                          key={concept.uri}
                          className='bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-700 text-xs dark:text-gray-300'
                        >
                          {concept.label?.eng || concept.uri}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AiNewsError() {
  return (
    <p className='text-gray-600 dark:text-gray-400'>
      Impossible de charger les actualités
    </p>
  );
}

function AiNewsLoading() {
  return (
    <div className='space-y-4'>
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className='border-gray-200 dark:border-gray-600 last:border-0 pb-4 last:pb-0 border-b'
        >
          <div className='animate-pulse'>
            <div className='bg-gray-300 dark:bg-gray-600 mb-3 rounded w-3/4 h-6'></div>
            <div className='space-y-2'>
              <div className='bg-gray-300 dark:bg-gray-600 rounded w-full h-4'></div>
              <div className='bg-gray-300 dark:bg-gray-600 rounded w-full h-4'></div>
              <div className='bg-gray-300 dark:bg-gray-600 rounded w-2/3 h-4'></div>
            </div>
            <div className='flex items-center space-x-2 mt-4'>
              <div className='bg-gray-300 dark:bg-gray-600 rounded w-24 h-3'></div>
              <div className='bg-gray-300 dark:bg-gray-600 rounded w-16 h-3'></div>
            </div>
            <div className='flex gap-2 mt-3'>
              <div className='bg-gray-300 dark:bg-gray-600 rounded w-16 h-5'></div>
              <div className='bg-gray-300 dark:bg-gray-600 rounded w-16 h-5'></div>
              <div className='bg-gray-300 dark:bg-gray-600 rounded w-16 h-5'></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AiNews() {
  return (
    <Card className='mt-8'>
      <h2 className='font-bold text-2xl text-gray-800 dark:text-gray-100'>
        Actualités IA
      </h2>
      <h2 className='mb-4 font-bold text-gray-500 dark:text-gray-400'>
        Les actualités proviennent de{' '}
        <a
          href='https://www.artificialintelligence-news.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 dark:text-blue-400'
        >
          AI News
        </a>
      </h2>
      <ErrorBoundary fallback={<AiNewsError />}>
        <Suspense fallback={<AiNewsLoading />}>
          <AiNewsContent />
        </Suspense>
      </ErrorBoundary>
    </Card>
  );
}

export default function Home() {
  return (
    <main className='mx-auto px-4 py-8 container'>
      <div className='gap-8 grid md:grid-cols-2'>
        <Presentation />
        <Links />
      </div>
      <AiNews />
    </main>
  );
}
