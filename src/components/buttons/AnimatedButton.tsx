type AnimatedButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export default function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}: AnimatedButtonProps) {
  const baseStyles =
    'font-bold transition-all duration-300 rounded-xl relative group';

  const variantStyles = {
    primary: 'bg-black dark:bg-white text-white dark:text-black',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    success:
      'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200',
    danger: 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3 text-lg',
  };

  const gradientEffect =
    variant === 'primary'
      ? `
    before:absolute before:inset-0 before:-z-10 before:rounded-xl
    before:bg-gradient-to-r before:from-blue-600 before:to-violet-600
    before:opacity-0 before:transition-opacity before:duration-300
    hover:before:opacity-100 before:blur-xl
  `
      : '';

  return (
    <button
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${gradientEffect}
        hover:-translate-y-1 hover:shadow-xl
        active:scale-95
        ${className}
      `}
    >
      <span className='flex justify-center items-center'>
        {icon && (
          <span
            className={`
            transform transition-transform duration-300
            ${variant === 'primary' ? 'group-hover:rotate-180' : ''}
            ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}
            ${children ? 'mr-2' : ''}
          `}
          >
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  );
}
