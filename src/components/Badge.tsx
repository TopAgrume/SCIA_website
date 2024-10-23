type BadgeProps = {
  startDate: Date;
  endDate: Date | null;
};

export default function Badge({ startDate, endDate }: BadgeProps) {
  return startDate.getTime() > new Date().getTime() ? (
    <div className='bg-blue-200 ml-auto p-2 border border-blue-400 rounded-sm font-bold'>
      A venir ⌛
    </div>
  ) : (endDate == null &&
      new Date().getTime() >= startDate.getTime() &&
      new Date().getTime() <= startDate.getTime() + 86400000) ||
    (endDate != null &&
      new Date().getTime() <= endDate.getTime() + 86400000) ? (
    <div className='border-green-400 bg-green-200 ml-auto p-2 border rounded-sm font-bold'>
      En cours 😜
    </div>
  ) : (
    <div className='bg-red-200 ml-auto p-2 border border-red-400 rounded-sm font-bold'>
      Terminé 😔
    </div>
  );
}
