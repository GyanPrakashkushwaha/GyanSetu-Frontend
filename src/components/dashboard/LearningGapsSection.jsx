import { useState } from 'react';
import SectionCard from '../shared/SectionCard';
import Badge from '../shared/Badge';
import { HiOutlineExclamationCircle, HiOutlineQuestionMarkCircle, HiOutlineLightBulb, HiOutlineChevronDown } from 'react-icons/hi2';

const SEVERITY_CONFIG = {
  High:   { variant: 'red',    label: '🔴 High',    border: 'border-rose-500/30',   bg: 'bg-rose-500/5',   icon: 'text-rose-400'    },
  Medium: { variant: 'orange', label: '🟠 Medium',  border: 'border-amber-500/30',  bg: 'bg-amber-500/5',  icon: 'text-amber-400'   },
  Low:    { variant: 'cyan',   label: '🟡 Low',     border: 'border-cyan-500/30',   bg: 'bg-cyan-500/5',   icon: 'text-cyan-400'    },
};

function GapCard({ gap, index }) {
  const [expanded, setExpanded] = useState(false);
  const config = SEVERITY_CONFIG[gap.severity_level] || SEVERITY_CONFIG.Medium;

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${config.border} ${config.bg} hover:shadow-lg`}
    >
      {/* Card header */}
      <button
        onClick={() => setExpanded(p => !p)}
        className="w-full text-left flex items-start gap-4 p-5"
      >
        <div className={`shrink-0 p-2 rounded-xl border ${config.border}`}>
          <HiOutlineExclamationCircle className={`w-5 h-5 ${config.icon}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant={config.variant}>{gap.severity_level} Severity</Badge>
            <span className="text-[10px] text-slate-500">Gap #{index + 1}</span>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed font-medium">{gap.misconception}</p>
        </div>

        <HiOutlineChevronDown
          className={`w-5 h-5 text-slate-500 shrink-0 mt-1 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4 animate-fade-in">
          {/* Diagnostic question */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-navy-800/80 border border-white/5">
            <HiOutlineQuestionMarkCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1 font-semibold">Diagnostic Question</p>
              <p className="text-slate-300 text-sm leading-relaxed italic">"{gap.diagnostic_question}"</p>
            </div>
          </div>

          {/* Remedial action */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <HiOutlineLightBulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1 font-semibold">Remedial Action</p>
              <p className="text-slate-300 text-sm leading-relaxed">{gap.remedial_action}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LearningGapsSection({ learningGaps }) {
  if (!learningGaps?.gaps?.length) return null;

  const gaps = learningGaps.gaps;
  const highCount   = gaps.filter(g => g.severity_level === 'High').length;
  const mediumCount = gaps.filter(g => g.severity_level === 'Medium').length;
  const lowCount    = gaps.filter(g => g.severity_level === 'Low').length;

  return (
    <SectionCard accent="rose" className="animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <h2 className="section-title">
          <span className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <HiOutlineExclamationCircle className="w-5 h-5 text-rose-400" />
          </span>
          Learning Gaps
        </h2>
        {/* Severity summary */}
        <div className="flex gap-2 shrink-0">
          {highCount   > 0 && <Badge variant="red"    className="text-xs">🔴 {highCount} High</Badge>}
          {mediumCount > 0 && <Badge variant="orange" className="text-xs">🟠 {mediumCount} Medium</Badge>}
          {lowCount    > 0 && <Badge variant="cyan"   className="text-xs">🟡 {lowCount} Low</Badge>}
        </div>
      </div>

      <div className="space-y-4">
        {gaps.map((gap, i) => (
          <GapCard key={i} gap={gap} index={i} />
        ))}
      </div>
    </SectionCard>
  );
}
