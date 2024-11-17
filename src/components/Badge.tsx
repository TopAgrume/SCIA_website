type BadgeProps = {
  startDate: Date;
  endDate: Date | null;
  onClick?: () => void;
};

export default function Badge({ startDate, endDate, onClick }: BadgeProps) {
  const isUpcoming = startDate.getTime() > new Date().getTime();
  const isOngoing =
    (endDate == null &&
      new Date().getTime() >= startDate.getTime() &&
      new Date().getTime() <= startDate.getTime() + 86400000) ||
    (endDate != null && new Date().getTime() <= endDate.getTime() + 86400000);

  return (
    <button
      onClick={onClick}
      className={`
        ml-auto p-2 border rounded-lg font-bold 
        transition-all duration-200 
        shadow-sm hover:shadow-md 
        active:scale-95
        ${
          isUpcoming
            ? 'bg-blue-100 hover:bg-blue-200 border-blue-400 text-blue-700'
            : isOngoing
              ? 'bg-green-100 hover:bg-green-200 border-green-400 text-green-700'
              : 'bg-red-100 hover:bg-red-200 border-red-400 text-red-700'
        }
      `}
    >
      {isUpcoming ? 'A venir ⌛' : isOngoing ? 'En cours 😜' : 'Terminé 😔'}
    </button>
  );
}
