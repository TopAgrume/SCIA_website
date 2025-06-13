'use client';

import { Bell, Calendar, Folder, Home, Moon, Sun, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useDarkMode } from '@/providers/DarkModeProvider';
import { useSession } from 'next-auth/react';

function NavItem({
  icon,
  label,
  href,
  isActive = false,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${isActive
        ? 'bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
        : 'hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function NavigationBar() {
  const pathname = usePathname();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { data: session, status } = useSession();

  return (
    <header className='top-0 z-50 sticky bg-gray-200 dark:bg-gray-700 shadow'>
      <div className='flex justify-between items-center mx-auto px-4 py-4 container'>
        <div className='flex items-center'>
          <Image src='/logo.png' alt='logo' width={34} height={40} />
          <h1 className='ml-2 font-bold text-2xl'>SCIA</h1>
        </div>
        <nav className='md:flex space-x-2 hidden'>
          <NavItem
            icon={<Home className='w-4 h-4' />}
            label='Accueil'
            href='/'
            isActive={pathname === '/'}
          />
          <NavItem
            icon={<Calendar className='w-4 h-4' />}
            label='Evenements'
            href='/events'
            isActive={pathname === '/events/'}
          />
          <NavItem
            icon={<Folder className='w-4 h-4' />}
            label='Projets'
            href='/projects'
            isActive={pathname === '/projects/'}
          />
          <NavItem
            icon={<Bell className='w-4 h-4' />}
            label='Suggestions'
            href='/suggestions'
            isActive={pathname === '/suggestions/'}
          />
        </nav>
        <div className='flex items-center space-x-4'>
          <button
            onClick={toggleDarkMode}
            className='bg-gray-300 dark:bg-gray-600 p-2 rounded-full'
            aria-label='Toggle dark mode'
          >
            {isDarkMode ? <Sun className='w-5 h-5' /> : <Moon className='w-5 h-5' />}
          </button>

          <div className='flex items-center space-x-2'>
            {status === 'loading' && (
              <div className='h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse'></div>
            )}

            {status === 'authenticated' && (
              <Link href="/dashboard" className="flex items-center space-x-2">
                <User className='w-5 h-5' />
                <span className='md:inline hidden font-medium'>
                  {session.user.email}
                </span>
              </Link>
            )}

            {status === 'unauthenticated' && (
              <div className="flex items-center space-x-3">
                <Link href="/login" className="flex items-center space-x-2 font-medium hover:text-blue-600">
                  <span>Login</span>
                </Link>
                <Link href="/register" className="font-medium hover:text-blue-600">
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
