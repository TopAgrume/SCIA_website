'use client';

import { useState } from 'react';
import { Bell, Calendar, Folder, Home, Moon, Sun, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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
      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${
        isActive
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
  const [isDarkMode, setIsDarkMode] = useState(false);

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
            href='/home'
            isActive={pathname === '/home'}
          />
          <NavItem
            icon={<Calendar className='w-4 h-4' />}
            label='Evenements'
            href='/events'
            isActive={pathname === '/events'}
          />
          <NavItem
            icon={<Folder className='w-4 h-4' />}
            label='Projets'
            href='/projects'
            isActive={pathname === '/projects'}
          />
          <NavItem
            icon={<Bell className='w-4 h-4' />}
            label='Suggestions'
            href='/suggestions'
            isActive={pathname === '/suggestions'}
          />
        </nav>
        <div className='flex items-center space-x-4'>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className='bg-gray-300 dark:bg-gray-600 p-2 rounded-full'
            aria-label='Toggle dark mode'
          >
            {isDarkMode ? (
              <Sun className='w-5 h-5' />
            ) : (
              <Moon className='w-5 h-5' />
            )}
          </button>
          <div className='flex items-center space-x-2'>
            <User className='w-5 h-5' />
            <span className='md:inline hidden'>mael.reynaud</span>
          </div>
        </div>
      </div>
      <div className='bg-black w-full h-0.5' />
    </header>
  );
}
