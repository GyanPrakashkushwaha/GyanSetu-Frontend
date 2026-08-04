import { useEffect, useRef } from 'react';
import katex from 'katex';
import SectionCard from '../shared/SectionCard';
import Badge from '../shared/Badge';
import {
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineLightBulb,
  HiOutlineBookmarkSquare,
  HiOutlineExclamationTriangle,
  HiOutlineBeaker,
} from 'react-icons/hi2';

/* ── KaTeX renderer ── */
function Formula({ src }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    try {
      // Try to render as LaTeX; fall back to plain text
      katex.render(src, ref.current, { throwOnError: false, displayMode: false });
    } catch {
      ref.current.textContent = src;
    }
  }, [src]);
  return <span ref={ref} />;
}

/* ── Sub-section wrapper ── */
function SubSection({ icon: Icon, title, color, children }) {
  const colorMap = {
    violet:  { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400' },
    cyan:    { bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20',   text: 'text-cyan-400'   },
    emerald: { bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',text: 'text-emerald-400'},
    amber:   { bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  text: 'text-amber-400'  },
    rose:    { bg: 'bg-rose-500/10',   border: 'border-rose-500/20',   text: 'text-rose-400'   },
    indigo:  { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
  };
  const c = colorMap[color] || colorMap.violet;
  return (
    <div className="mb-8 last:mb-0">
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${c.bg} border ${c.border} mb-4`}>
        <Icon className={`w-4 h-4 ${c.text}`} />
        <h3 className={`text-xs font-bold uppercase tracking-widest ${c.text}`}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function KnowledgeBaseSection({ knowledgeBase }) {
  if (!knowledgeBase) return null;
  const { learning_objectives, prerequisites, concepts, key_terms, formulae, misconceptions } = knowledgeBase;

  return (
    <SectionCard accent="cyan" className="animate-slide-up">
      <h2 className="section-title mb-8">
        <span className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <HiOutlineBeaker className="w-5 h-5 text-cyan-400" />
        </span>
        Knowledge Base
      </h2>

      {/* Learning Objectives */}
      {learning_objectives?.length > 0 && (
        <SubSection icon={HiOutlineCheckCircle} title="Learning Objectives" color="violet">
          <ol className="space-y-3">
            {learning_objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 group">
                <span className="shrink-0 w-7 h-7 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-400 group-hover:bg-violet-600/40 transition-colors">
                  {i + 1}
                </span>
                <p className="text-slate-300 text-sm leading-relaxed pt-0.5">{obj}</p>
              </li>
            ))}
          </ol>
        </SubSection>
      )}

      {/* Prerequisites */}
      {prerequisites?.length > 0 && (
        <SubSection icon={HiOutlineClipboardDocumentList} title="Prerequisites" color="cyan">
          <ul className="space-y-2.5">
            {prerequisites.map((p, i) => (
              <li key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-800/60 border border-white/5 hover:border-cyan-500/20 transition-colors group">
                <span className="shrink-0 w-5 h-5 rounded border-2 border-cyan-500/50 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                  <span className="w-2 h-2 rounded-sm bg-cyan-400/0 group-hover:bg-cyan-400 transition-colors" />
                </span>
                <p className="text-slate-300 text-sm">{p}</p>
              </li>
            ))}
          </ul>
        </SubSection>
      )}

      {/* Concepts */}
      {concepts?.length > 0 && (
        <SubSection icon={HiOutlineLightBulb} title="Key Concepts" color="emerald">
          <div className="flex flex-wrap gap-2">
            {concepts.map((c, i) => (
              <Badge key={i} variant="emerald" className="text-sm py-1.5 px-3 hover:scale-105 transition-transform cursor-default">
                {c}
              </Badge>
            ))}
          </div>
        </SubSection>
      )}

      {/* Key Terms */}
      {key_terms?.length > 0 && (
        <SubSection icon={HiOutlineBookmarkSquare} title="Key Terms & Definitions" color="indigo">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {key_terms.map((kt, i) => (
              <div
                key={i}
                className="px-4 py-4 rounded-xl bg-navy-800/60 border border-white/5 hover:border-indigo-500/30 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 group"
              >
                <p className="text-indigo-300 font-semibold text-sm mb-1.5 group-hover:text-indigo-200 transition-colors">{kt.term}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{kt.definition}</p>
              </div>
            ))}
          </div>
        </SubSection>
      )}

      {/* Formulae */}
      {formulae?.length > 0 && (
        <SubSection icon={HiOutlineBeaker} title="Formulae" color="cyan">
          <div className="space-y-3">
            {formulae.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3 rounded-xl bg-navy-900 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors font-mono"
              >
                <span className="text-cyan-500/40 text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                <div className="text-cyan-300 text-sm overflow-x-auto">
                  <Formula src={f} />
                </div>
              </div>
            ))}
          </div>
        </SubSection>
      )}

      {/* Misconceptions */}
      {misconceptions?.length > 0 && (
        <SubSection icon={HiOutlineExclamationTriangle} title="Common Misconceptions" color="amber">
          <div className="space-y-3">
            {misconceptions.map((m, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-4 rounded-xl bg-amber-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-colors group"
              >
                <HiOutlineExclamationTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-slate-300 text-sm leading-relaxed">{m}</p>
              </div>
            ))}
          </div>
        </SubSection>
      )}
    </SectionCard>
  );
}
