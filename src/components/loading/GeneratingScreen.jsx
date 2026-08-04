import ProgressBar from '../shared/ProgressBar';

const PIPELINE_STAGES = [
  { key: 'parse',       label: 'Parsing Document',         icon: '📄' },
  { key: 'metadata',    label: 'Extracting Metadata',      icon: '🏷️' },
  { key: 'knowledge',   label: 'Building Knowledge Base',  icon: '📚' },
  { key: 'teaching',    label: 'Generating Teaching Plan', icon: '📅' },
  { key: 'gaps',        label: 'Analyzing Learning Gaps',  icon: '🔍' },
  { key: 'period1',     label: 'Writing Period 1',         icon: '✏️' },
  { key: 'period2',     label: 'Writing Period 2',         icon: '✏️' },
  { key: 'period3',     label: 'Writing Period 3',         icon: '✏️' },
  { key: 'period4',     label: 'Writing Period 4',         icon: '✏️' },
  { key: 'period5',     label: 'Writing Period 5',         icon: '✏️' },
  { key: 'period6',     label: 'Writing Period 6',         icon: '✏️' },
  { key: 'complete',    label: 'Finalizing',               icon: '✅' },
];

function SkeletonBlock({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded"
          style={{ width: `${60 + Math.random() * 35}%`, animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function SkeletonCard({ title, lines = 4 }) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="skeleton h-5 w-40 rounded" />
      <SkeletonBlock lines={lines} />
    </div>
  );
}

export default function GeneratingScreen({ stage, progress, partialData }) {
  const currentStageIdx = PIPELINE_STAGES.findIndex(s =>
    (stage || '').toLowerCase().includes(s.key.toLowerCase()) ||
    (stage || '').toLowerCase().includes(s.label.toLowerCase().split(' ')[0].toLowerCase())
  );
  const activeIdx = currentStageIdx === -1 ? Math.floor((progress / 100) * PIPELINE_STAGES.length) : currentStageIdx;

  return (
    <div className="min-h-screen px-4 py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-violet-600/20 border border-violet-500/30 mb-6">
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-violet-300 font-semibold text-sm tracking-wide">AI GENERATING</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-100 mb-2">
            Building your <span className="gradient-text">Teacher Knowledge Package</span>
          </h2>
          <p className="text-slate-400 text-base">
            {stage ? `Currently: ${stage}` : 'Initializing pipeline…'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <ProgressBar value={progress} color="mixed" label={`Pipeline Progress`} />
        </div>

        {/* Stage dots */}
        <div className="relative mb-16 overflow-x-auto pb-2 timeline-scroll">
          <div className="flex items-start min-w-max mx-auto gap-0">
            {PIPELINE_STAGES.map((s, i) => {
              const isDone   = i < activeIdx;
              const isActive = i === activeIdx;
              const isPending = i > activeIdx;
              return (
                <div key={s.key} className="flex items-center">
                  <div className="flex flex-col items-center gap-2 w-20">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500
                      ${isDone   ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : ''}
                      ${isActive ? 'bg-violet-600/30 border-violet-400 stage-active text-violet-200' : ''}
                      ${isPending ? 'bg-navy-800 border-navy-600 text-slate-600' : ''}
                    `}>
                      {isDone ? '✓' : s.icon}
                    </div>
                    <p className={`text-[10px] text-center leading-tight font-medium transition-colors
                      ${isDone ? 'text-emerald-400' : isActive ? 'text-violet-300' : 'text-slate-600'}`}>
                      {s.label}
                    </p>
                  </div>
                  {i < PIPELINE_STAGES.length - 1 && (
                    <div className={`w-4 h-0.5 mt-[-20px] transition-colors duration-500 ${i < activeIdx ? 'bg-emerald-500' : 'bg-navy-700'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live data preview (populates as data arrives) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Metadata */}
          {partialData.metadata ? (
            <div className="glass-card p-6 animate-slide-up border-violet-500/20">
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">📋 Metadata — Detected</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(partialData.metadata).map(([k, v]) => (
                  <span key={k} className="px-2 py-1 text-xs rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-200">
                    <span className="text-violet-400">{k}:</span> {v}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <SkeletonCard title="Metadata" lines={3} />
          )}

          {/* Knowledge Base */}
          {partialData.knowledge_base ? (
            <div className="glass-card p-6 animate-slide-up border-cyan-500/20">
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">📚 Knowledge Base — Ready</p>
              <p className="text-slate-300 text-sm">
                {partialData.knowledge_base.learning_objectives?.length || 0} objectives,{' '}
                {partialData.knowledge_base.concepts?.length || 0} concepts,{' '}
                {partialData.knowledge_base.key_terms?.length || 0} key terms
              </p>
            </div>
          ) : (
            <SkeletonCard title="Knowledge Base" lines={4} />
          )}

          {/* Teaching Plan */}
          {partialData.teaching_plan ? (
            <div className="glass-card p-6 animate-slide-up border-emerald-500/20">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">📅 Teaching Plan — Ready</p>
              <p className="text-slate-300 text-sm">
                {partialData.teaching_plan.total_periods} periods scheduled
              </p>
            </div>
          ) : (
            <SkeletonCard title="Teaching Plan" lines={2} />
          )}

          {/* Learning Gaps */}
          {partialData.learning_gaps ? (
            <div className="glass-card p-6 animate-slide-up border-rose-500/20">
              <p className="text-xs font-semibold text-rose-400 uppercase tracking-widest mb-3">🔍 Learning Gaps — Analyzed</p>
              <p className="text-slate-300 text-sm">
                {partialData.learning_gaps.gaps?.length || 0} gaps identified
              </p>
            </div>
          ) : (
            <SkeletonCard title="Learning Gaps" lines={3} />
          )}
        </div>

        {/* Period contents progress */}
        {partialData.period_contents && partialData.period_contents.length > 0 && (
          <div className="mt-6 glass-card p-6 animate-slide-up">
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">✏️ Period Scripts</p>
            <div className="flex gap-3">
              {Array.from({ length: 6 }).map((_, i) => {
                const ready = i < (partialData.period_contents?.length || 0);
                return (
                  <div
                    key={i}
                    className={`flex-1 h-10 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-500
                      ${ready ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300' : 'skeleton text-slate-600'}`}
                  >
                    {ready ? `P${i + 1} ✓` : `P${i + 1}`}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
