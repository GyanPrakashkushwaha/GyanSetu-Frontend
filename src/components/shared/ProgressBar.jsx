/**
 * Animated progress bar.
 */
export default function ProgressBar({ value = 0, label = '', showPercent = true, color = 'violet' }) {
  const colorMap = {
    violet: 'from-violet-600 to-violet-400',
    cyan:   'from-cyan-600 to-cyan-400',
    mixed:  'from-violet-600 via-indigo-500 to-cyan-400',
  };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-slate-400">{label}</span>}
          {showPercent && (
            <span className="text-sm font-semibold text-violet-400">{Math.round(value)}%</span>
          )}
        </div>
      )}
      <div className="relative h-2 bg-navy-800 rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${colorMap[color] || colorMap.violet} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: value < 100 ? 'shimmer 2s linear infinite' : 'none',
          }}
        />
      </div>
    </div>
  );
}
