/**
 * Colored badge / chip component.
 * variant: 'violet' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'slate' | 'indigo'
 */
const VARIANTS = {
  violet:  'bg-violet-500/20 text-violet-300 border border-violet-500/30',
  cyan:    'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  emerald: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  rose:    'bg-rose-500/20 text-rose-300 border border-rose-500/30',
  amber:   'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  slate:   'bg-slate-500/20 text-slate-300 border border-slate-500/30',
  indigo:  'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  red:     'bg-red-500/20 text-red-300 border border-red-500/30',
  orange:  'bg-orange-500/20 text-orange-300 border border-orange-500/30',
};

export default function Badge({ children, variant = 'violet', className = '', icon: Icon }) {
  return (
    <span className={`badge ${VARIANTS[variant] || VARIANTS.violet} ${className}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}
