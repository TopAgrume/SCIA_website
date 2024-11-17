'use client';

import AnimatedButton from '@/components/buttons/AnimatedButton';
import Card from '@/components/Card';
import CardHeader from '@/components/cards/CardHeader';
import PlusIcon from '@/components/icons/PlusIcon';
import ExternalLink from '@/components/links/ExternalLink';
import Modal from '@/components/Modal';
import { type Suggestion } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type SuggestionFormProps = {
  onClose: () => void;
  onSubmit: (data: Suggestion) => void;
  onDelete?: () => void;
  initialData?: Suggestion;
  mode: 'create' | 'edit';
};

function SuggestionForm({
  onClose,
  onSubmit,
  onDelete,
  initialData,
  mode,
}: SuggestionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Suggestion>({
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300'>
          Titre
        </label>
        <input
          {...register('name', { required: 'Le titre est requis' })}
          className='border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-blue-500 w-full'
        />
        {errors.name && (
          <p className='mt-1 text-red-600 text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300'>
          Type
        </label>
        <select
          {...register('type', { required: 'Le type est requis' })}
          className='border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-blue-500 w-full'
        >
          <option value='article'>Article</option>
          <option value='video'>Vidéo</option>
          <option value='other'>Autre</option>
        </select>
      </div>

      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300'>
          Lien
        </label>
        <input
          {...register('link', {
            required: 'Le lien est requis',
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

      <div>
        <label className='block mb-1 font-medium text-gray-700 text-sm dark:text-gray-300'>
          Résumé
        </label>
        <textarea
          {...register('summary', { required: 'Le résumé est requis' })}
          rows={4}
          className='border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm px-3 py-2 border focus:border-blue-500 rounded-md focus:ring-blue-500 w-full'
        />
        {errors.summary && (
          <p className='mt-1 text-red-600 text-sm'>{errors.summary.message}</p>
        )}
      </div>

      <div className='flex justify-end space-x-3'>
        {mode === 'edit' && onDelete && (
          <AnimatedButton
            variant='danger'
            onClick={() => {
              if (
                confirm('Êtes-vous sûr de vouloir supprimer cette suggestion ?')
              ) {
                onDelete();
              }
            }}
          >
            Supprimer
          </AnimatedButton>
        )}
        <AnimatedButton variant='secondary' onClick={onClose}>
          Annuler
        </AnimatedButton>
        <AnimatedButton variant='primary'>
          {mode === 'create' ? 'Créer' : 'Modifier'}
        </AnimatedButton>
      </div>
    </form>
  );
}

type SuggestionProps = {
  indice: number;
  suggestion: Suggestion;
};

function SuggestionCard({ indice, suggestion }: SuggestionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = (data: Suggestion) => {
    // Here you would typically make an API call to update the suggestion
    console.log('Updated suggestion:', {
      ...data,
      date: new Date(),
      isAuthor: true,
    });
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    // Here you would typically make an API call to delete the suggestion
    console.log('Deleting suggestion:', suggestion);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <Card
        className={`block grid-area-[${Math.floor((indice + 1) / 3)}_${
          (indice % 3) + 1
        }_${Math.floor((indice + 1) / 3) + 1}_${(indice % 3) + 2}]`}
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
                onClick={() => setIsEditModalOpen(true)}
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

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title='Modifier la suggestion'
      >
        <SuggestionForm
          mode='edit'
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEdit}
          onDelete={handleDelete}
          initialData={suggestion}
        />
      </Modal>
    </>
  );
}

function AddSuggestion() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (data: Suggestion) => {
    // Here you would typically make an API call to save the suggestion
    console.log('New suggestion:', {
      ...data,
      date: new Date(),
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
          Ajouter une suggestion
        </AnimatedButton>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Nouvelle suggestion'
      >
        <SuggestionForm
          mode='create'
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
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
        {suggestions.map((suggestion, i) => (
          <SuggestionCard
            key={`suggestion_${i}`}
            indice={i}
            suggestion={suggestion}
          />
        ))}
      </div>
    </div>
  );
}
