import { useState } from 'react';
import SectionCard from '../shared/SectionCard';
import {
  HiOutlineDocumentText,
  HiOutlineChevronDown,
  HiOutlinePlayCircle,
  HiOutlineClipboardDocumentCheck,
  HiOutlinePuzzlePiece,
} from 'react-icons/hi2';
import { FiUsers } from 'react-icons/fi';

const PERIOD_ACCENT = ['violet','cyan','emerald','amber','rose','indigo'];

/* ── Script block ── */
function ScriptBlock({ script }) {
  if (!script) return null;
  return (
    <div className="space-y-5">
      {/* Introduction */}
      {script.introduction && (
        <div className="relative pl-4 border-l-2 border-violet-500/40">
          <p className="text-[10px] text-violet-400 uppercase tracking-widest font-bold mb-1">Introduction</p>
          <p className="text-slate-300 text-sm leading-relaxed">{script.introduction}</p>
        </div>
      )}

      {/* Main body */}
      {script.main_body?.length > 0 && (
        <div>
          <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold mb-3">Main Body</p>
          <div className="space-y-3">
            {script.main_body.map((para, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-navy-700 flex items-center justify-center text-[10px] font-bold text-slate-400 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed">{para}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conclusion */}
      {script.conclusion && (
        <div className="relative pl-4 border-l-2 border-emerald-500/40">
          <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Conclusion</p>
          <p className="text-slate-300 text-sm leading-relaxed">{script.conclusion}</p>
        </div>
      )}
    </div>
  );
}

/* ── Activity block ── */
function ActivityBlock({ activity }) {
  if (!activity) return null;
  return (
    <div className="px-5 py-5 rounded-2xl bg-navy-800/60 border border-white/5 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <FiUsers className="w-4 h-4 text-amber-400" />
          <p className="text-amber-300 font-bold text-sm">{activity.title}</p>
        </div>
        <span className="text-xs text-slate-400 bg-navy-700 px-3 py-1 rounded-full border border-white/5">
          ⏱ {activity.duration_minutes} min
        </span>
      </div>

      {activity.materials_needed?.length > 0 && (
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2">Materials</p>
          <div className="flex flex-wrap gap-2">
            {activity.materials_needed.map((m, i) => (
              <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">{m}</span>
            ))}
          </div>
        </div>
      )}

      {activity.instructions?.length > 0 && (
        <ol className="space-y-2">
          {activity.instructions.map((ins, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
              <span className="shrink-0 w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[10px] text-amber-400 font-bold">{i + 1}</span>
              <span className="leading-relaxed">{ins}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* ── Assessment block ── */
function AssessmentBlock({ assessment }) {
  if (!assessment) return null;
  const [showAnswers, setShowAnswers] = useState(false);
  return (
    <div className="space-y-4">
      {assessment.questions?.map((q, i) => (
        <div key={i} className="px-4 py-4 rounded-xl bg-navy-800/60 border border-white/5 hover:border-violet-500/20 transition-colors">
          <div className="flex items-start gap-3">
            <span className="shrink-0 w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs text-violet-400 font-bold">Q{i + 1}</span>
            <div className="flex-1">
              <p className="text-slate-200 text-sm mb-2">{q}</p>
              {showAnswers && assessment.answer_key?.[i] && (
                <div className="mt-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 animate-fade-in">
                  <p className="text-[10px] text-emerald-400 uppercase tracking-wide mb-1 font-bold">Answer</p>
                  <p className="text-emerald-200 text-sm">{assessment.answer_key[i]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {assessment.questions?.length > 0 && (
        <button
          onClick={() => setShowAnswers(p => !p)}
          className="flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors px-2 py-1"
        >
          <HiOutlineClipboardDocumentCheck className="w-4 h-4" />
          {showAnswers ? 'Hide Answer Key' : 'Reveal Answer Key'}
        </button>
      )}
    </div>
  );
}

/* ── Single period accordion item ── */
function PeriodItem({ periodContent, index }) {
  const [open, setOpen]       = useState(false);
  const [activeTab, setActiveTab] = useState('script');
  const accentColor = PERIOD_ACCENT[index % PERIOD_ACCENT.length];

  const accentMap = {
    violet:  { badge: 'bg-violet-600/20 text-violet-300 border-violet-500/30', border: 'border-violet-500/30', text: 'text-violet-400', dot: 'bg-violet-500' },
    cyan:    { badge: 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30',       border: 'border-cyan-500/30',   text: 'text-cyan-400',   dot: 'bg-cyan-500'   },
    emerald: { badge: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30',border:'border-emerald-500/30',text:'text-emerald-400', dot: 'bg-emerald-500'},
    amber:   { badge: 'bg-amber-600/20 text-amber-300 border-amber-500/30',    border: 'border-amber-500/30',  text: 'text-amber-400',  dot: 'bg-amber-500'  },
    rose:    { badge: 'bg-rose-600/20 text-rose-300 border-rose-500/30',       border: 'border-rose-500/30',   text: 'text-rose-400',   dot: 'bg-rose-500'   },
    indigo:  { badge: 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30', border: 'border-indigo-500/30', text: 'text-indigo-400', dot: 'bg-indigo-500' },
  };
  const c = accentMap[accentColor];

  const tabs = [
    { id: 'script',     label: 'Script',      icon: HiOutlineDocumentText },
    { id: 'activity',   label: 'Activity',    icon: FiUsers               },
    { id: 'assessment', label: 'Assessment',  icon: HiOutlineClipboardDocumentCheck },
  ];

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${open ? c.border : 'border-white/5 hover:border-white/10'}`}>
      {/* Header */}
      <button
        onClick={() => setOpen(p => !p)}
        className={`w-full flex items-center gap-4 px-6 py-5 text-left transition-colors duration-200 ${open ? 'bg-navy-800/80' : 'bg-navy-800/40 hover:bg-navy-800/60'}`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border text-sm font-black ${c.badge}`}>
          P{periodContent.period_number}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-base font-semibold ${open ? c.text : 'text-slate-200'} transition-colors`}>
            {periodContent.script?.introduction
              ? `Period ${periodContent.period_number}`
              : `Period ${periodContent.period_number}`
            }
          </p>
          {!open && periodContent.activity?.title && (
            <p className="text-sm text-slate-500 truncate">{periodContent.activity.title}</p>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {periodContent.activity && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-slate-500 border border-white/5 rounded-full px-3 py-1">
              <HiOutlinePuzzlePiece className="w-3.5 h-3.5" /> {periodContent.activity.title}
            </span>
          )}
          <HiOutlineChevronDown
            className={`w-5 h-5 ${c.text} transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Accordion body */}
      {open && (
        <div className="border-t border-white/5 animate-slide-up">
          {/* Tabs */}
          <div className="flex border-b border-white/5 px-6 bg-navy-900/40">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200
                    ${activeTab === tab.id
                      ? `${c.text} border-current`
                      : 'text-slate-500 border-transparent hover:text-slate-300'
                    }`}
                >
                  <Icon className="w-4 h-4" /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="px-6 py-6">
            {activeTab === 'script'     && <ScriptBlock     script={periodContent.script}         />}
            {activeTab === 'activity'   && <ActivityBlock   activity={periodContent.activity}     />}
            {activeTab === 'assessment' && <AssessmentBlock assessment={periodContent.assessment} />}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main export ── */
export default function PeriodContentAccordion({ periodContents }) {
  if (!periodContents?.length) return null;

  return (
    <SectionCard accent="amber" className="animate-slide-up">
      <h2 className="section-title mb-6">
        <span className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <HiOutlinePlayCircle className="w-5 h-5 text-amber-400" />
        </span>
        Period-by-Period Content
        <span className="ml-auto text-sm font-normal text-slate-400">{periodContents.length} periods</span>
      </h2>

      <div className="space-y-3">
        {periodContents
          .sort((a, b) => a.period_number - b.period_number)
          .map((pc, i) => (
            <PeriodItem key={pc.period_number} periodContent={pc} index={i} />
          ))}
      </div>
    </SectionCard>
  );
}
