type CardHeaderProps = {
  title: string;
  action?: React.ReactNode;
};

export default function CardHeader({ title, action }: CardHeaderProps) {
  return (
    <div className='flex justify-between items-center mb-4'>
      <h2 className='font-bold text-gray-800 text-lg dark:text-gray-200'>
        {title}
      </h2>
      {action}
    </div>
  );
}
