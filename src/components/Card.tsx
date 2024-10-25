type CardProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export default function Card({ children, className = '', style }: CardProps) {
  return (
    <section
      className={`bg-gray-250 dark:bg-gray-200 shadow p-6 rounded-lg ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}
