type HoverCardProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
};

export default function HoverCard({
  content,
  children,
  position = 'top',
  className = '',
}: HoverCardProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className='inline-block relative group'>
      {children}
      <div
        className={`
          absolute z-20 invisible opacity-0 
          group-hover:visible group-hover:opacity-100
          transition-all duration-200 ease-in-out
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          rounded-lg shadow-lg
          ${positionClasses[position]}
          ${className}
        `}
      >
        {content}
      </div>
    </div>
  );
}
