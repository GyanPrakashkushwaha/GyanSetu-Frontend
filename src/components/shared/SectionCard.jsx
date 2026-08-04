/**
 * Reusable section card wrapper with optional gradient accent top-border.
 */
export default function SectionCard({ children, className = '', accent = 'violet' }) {
  const accentColors = {
    violet: 'from-violet-600 to-violet-400',
    cyan:   'from-cyan-500 to-cyan-300',
    emerald:'from-emerald-500 to-emerald-300',
    rose:   'from-rose-500 to-rose-300',
    amber:  'from-amber-500 to-amber-300',
    indigo: 'from-indigo-500 to-violet-400',
  };
  return (
    <div className={`glass-card overflow-hidden ${className}`}>
      {/* Accent top line */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${accentColors[accent] || accentColors.violet}`} />
      <div className="p-6">{children}</div>
    </div>
  );
}
