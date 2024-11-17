import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  icon?: string;
  className?: string;
};

export default function ExternalLink({
  href,
  children,
  icon,
  className = '',
}: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target='_blank'
      className={`
        inline-flex items-center text-sm text-red-400 hover:text-red-500
        transition-colors duration-200
        ${className}
      `}
    >
      {icon && (
        <Image
          src={icon}
          alt='link icon'
          width={20}
          height={20}
          className='mr-2'
        />
      )}
      {children}
      <ExternalLinkIcon className='ml-1 w-4 h-4' />
    </Link>
  );
}
