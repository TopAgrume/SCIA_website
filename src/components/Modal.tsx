import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex justify-center items-center p-4 min-h-full text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='bg-white dark:bg-gray-800 shadow-xl p-6 rounded-2xl w-full max-w-md text-left transform transition-all overflow-hidden align-middle'>
                <Dialog.Title
                  as='h3'
                  className='flex justify-between items-center font-medium text-gray-900 text-lg dark:text-gray-100 leading-6'
                >
                  {title}
                  <button
                    onClick={onClose}
                    className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400 transition-colors'
                  >
                    <X className='w-5 h-5' />
                  </button>
                </Dialog.Title>
                <div className='mt-4'>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
