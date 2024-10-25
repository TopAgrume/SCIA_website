type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Card({ children, className = '', style }: CardProps) {
  return (
    <section
      className={`bg-white dark:bg-gray-900 shadow-md dark:shadow-lg dark:shadow-gray-900/30 p-6 rounded-lg ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
