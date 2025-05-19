'use client';

import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type PrimaryButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
  children,
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: PrimaryButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-black text-white hover:bg-gray-900 focus:ring-black',
    secondary:
      'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };

  const animationStyles = `
    hover:-translate-y-0.5
    active:scale-95
  `;

  return (
    <button
      {...props}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        animationStyles,
        className
      )}
    >
      {icon && (
        <span className="mr-2 flex items-center">{icon}</span>
      )}
      {children}
    </button>
  );
}
