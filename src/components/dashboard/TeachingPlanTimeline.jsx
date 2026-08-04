import { useState } from 'react';
import SectionCard from '../shared/SectionCard';
import { HiOutlineCalendarDays, HiOutlineClock } from 'react-icons/hi2';
import { FiTarget } from 'react-icons/fi';

const PERIOD_COLORS = [
  { ring: 'ring-violet-500', bg: 'bg-violet-600/20', text: 'text-violet-300', border: 'border-violet-500/40', dot: 'bg-violet-500', glow: 'shadow-violet-500/40' },
  { ring: 'ring-cyan-500',   bg: 'bg-cyan-600/20',   text: 'text-cyan-300',   border: 'border-cyan-500/40',   dot: 'bg-cyan-500',   glow: 'shadow-cyan-500/40'   },
  { ring: 'ring-emerald-500',bg: 'bg-emerald-600/20',text: 'text-emerald-300',border: 'border-emerald-500/40',dot: 'bg-emerald-500',glow: 'shadow-emerald-500/40'},
  { ring: 'ring-amber-500',  bg: 'bg-amber-600/20',  text: 'text-amber-300',  border: 'border-amber-500/40',  dot: 'bg-amber-500',  glow: 'shadow-amber-500/40'  },
  { ring: 'ring-rose-500',   bg: 'bg-rose-600/20',   text: 'text-rose-300',   border: 'border-rose-500/40',   dot: 'bg-rose-500',   glow: 'shadow-rose-500/40'   },
  { ring: 'ring-indigo-500', bg: 'bg-indigo-600/20', text: 'text-indigo-300', border: 'border-indigo-500/40', dot: 'bg-indigo-500', glow: 'shadow-indigo-500/40' },
];

export default function TeachingPlanTimeline({ teachingPlan }) {
  const [selected, setSelected] = useState(0);
  if (!teachingPlan) return null;

  const { total_periods, rationale, periods } = teachingPlan;
  const totalMinutes = periods?.reduce((sum, p) => sum + (p.estimated_minutes || 0), 0) || 0;
  const period = periods?.[selected];
  const color  = PERIOD_COLORS[selected % PERIOD_COLORS.length];

  return (
    <SectionCard accent="emerald" className="animate-slide-up">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h2 className="section-title mb-1">
            <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <HiOutlineCalendarDays className="w-5 h-5 text-emerald-400" />
            </span>
            Teaching Plan
          </h2>
          <p className="text-slate-400 text-sm ml-12 pl-1">{rationale}</p>
        </div>
        <div className="flex gap-4 shrink-0">
          <div className="text-center px-4 py-3 rounded-xl bg-navy-800 border border-white/5">
            <p className="text-2xl font-black text-emerald-400">{total_periods}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Periods</p>
          </div>
          <div className="text-center px-4 py-3 rounded-xl bg-navy-800 border border-white/5">
            <p className="text-2xl font-black text-cyan-400">{totalMinutes}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wide">Minutes</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mb-8 overflow-x-auto pb-3 timeline-scroll">
        <div className="flex gap-3 min-w-max">
          {periods?.map((p, i) => {
            const c       = PERIOD_COLORS[i % PERIOD_COLORS.length];
            const isSelected = i === selected;
            return (
              <button
                key={p.period_number}
                onClick={() => setSelected(i)}
                className={`relative flex flex-col items-start gap-2 px-4 py-4 rounded-2xl border-2 transition-all duration-300 w-48 text-left
                  ${isSelected
                    ? `${c.bg} ${c.border} ring-2 ${c.ring} shadow-lg ${c.glow}`
                    : 'bg-navy-800/60 border-white/5 hover:border-white/15'
                  }`}
              >
                {/* Period number */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2
                  ${isSelected ? `${c.bg} ${c.border} ${c.text}` : 'bg-navy-700 border-navy-600 text-slate-500'}`}>
                  {p.period_number}
                </div>

                <p className={`text-sm font-semibold leading-tight ${isSelected ? c.text : 'text-slate-400'}`}>
                  {p.focus_topic}
                </p>

                <div className="flex items-center gap-1">
                  <HiOutlineClock className="w-3 h-3 text-slate-500" />
                  <span className="text-[11px] text-slate-500">{p.estimated_minutes} min</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected period detail */}
      {period && (
        <div className={`rounded-2xl border ${color.border} ${color.bg} p-6 transition-all duration-300 animate-fade-in`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-2.5 h-2.5 rounded-full ${color.dot} shadow-lg ${color.glow}`} />
            <h3 className={`text-lg font-bold ${color.text}`}>
              Period {period.period_number}: {period.focus_topic}
            </h3>
          </div>

          {/* Learning outcome */}
          <div className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl bg-navy-900/50 border border-white/5">
            <FiTarget className={`w-5 h-5 ${color.text} shrink-0 mt-0.5`} />
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1">Learning Outcome</p>
              <p className="text-slate-200 text-sm leading-relaxed">{period.learning_outcome}</p>
            </div>
          </div>

          {/* Concepts covered */}
          {period.concepts_covered?.length > 0 && (
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-3">Concepts Covered</p>
              <div className="flex flex-wrap gap-2">
                {period.concepts_covered.map((c, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${color.border} ${color.bg} ${color.text}`}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </SectionCard>
  );
}
