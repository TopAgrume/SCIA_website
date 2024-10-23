type BadgeProps = {
  start_date: Date;
  end_date: Date | null;
};

export default function Badge({ start_date, end_date }: BadgeProps) {
  return start_date.getTime() > new Date().getTime() ? (
    <div className='ml-auto border-blue-400 border p-2 rounded-sm bg-blue-200 font-bold'>
      A venir ⌛
    </div>
  ) : (end_date == null &&
      new Date().getTime() >= start_date.getTime() &&
      new Date().getTime() <= start_date.getTime() + 86400000) ||
    (end_date != null &&
      new Date().getTime() <= end_date.getTime() + 86400000) ? (
    <div className='ml-auto border-green-400 border p-2 rounded-sm bg-green-200 font-bold'>
      En cours 😜
    </div>
  ) : (
    <div className='ml-auto border-red-400 border p-2 rounded-sm bg-red-200 font-bold'>
      Terminé 😔
    </div>
  );
}
