interface CardStatusRingProps {
  current?: number;
  total?: number;
  ringColor?: string;
}

const CardStatusRing: React.FC<CardStatusRingProps> = ({
  current = 0,
  total = 1,
  ringColor = "#3B82F6",
}) => {
  // Calculate percentage and clamp between 0 and 100
  const percentage = total > 0 ? (current / total) * 100 : 0;
  const clampedProgress = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <path
          className="text-slate-100"
          strokeWidth="3.5"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="transition-all duration-1000 ease-out"
          style={{ color: ringColor }}
          strokeDasharray={`${clampedProgress}, 100`}
          strokeWidth="3.5"
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <span
        className="absolute text-xs font-black"
        style={{ color: ringColor }}
      >
        {clampedProgress.toFixed(1)}%
      </span>
    </div>
  );
};

export default CardStatusRing;
