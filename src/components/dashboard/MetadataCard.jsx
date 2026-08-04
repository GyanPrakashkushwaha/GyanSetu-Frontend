import SectionCard from '../shared/SectionCard';
import Badge from '../shared/Badge';
import {
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineGlobeAlt,
  HiOutlineTag,
  HiOutlinePuzzlePiece,
} from 'react-icons/hi2';
import { FiLayers } from 'react-icons/fi';

const DIFFICULTY_COLORS = {
  beginner:     'emerald',
  easy:         'emerald',
  intermediate: 'amber',
  medium:       'amber',
  advanced:     'rose',
  hard:         'rose',
};

const META_ICONS = {
  subject:    { icon: HiOutlineBookOpen,    color: 'violet' },
  grade:      { icon: HiOutlineAcademicCap, color: 'cyan'   },
  difficulty: { icon: FiLayers,             color: 'amber'  },
  topic:      { icon: HiOutlineTag,         color: 'violet' },
  chapter:    { icon: HiOutlinePuzzlePiece, color: 'indigo' },
  category:   { icon: HiOutlineGlobeAlt,    color: 'emerald'},
  language:   { icon: HiOutlineGlobeAlt,    color: 'slate'  },
};

export default function MetadataCard({ metadata }) {
  if (!metadata) return null;

  const difficultyColor = DIFFICULTY_COLORS[metadata.difficulty?.toLowerCase()] || 'amber';

  return (
    <SectionCard accent="violet" className="animate-slide-up">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-1">Document Analysis</p>
          <h2 className="text-2xl font-bold text-slate-100">{metadata.topic}</h2>
          <p className="text-slate-400 mt-1">{metadata.chapter} · {metadata.subject}</p>
        </div>
        <Badge variant={difficultyColor} className="text-sm px-4 py-1.5 shrink-0">
          {metadata.difficulty}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {Object.entries(metadata).map(([key, value]) => {
          const meta   = META_ICONS[key] || { icon: HiOutlineTag, color: 'slate' };
          const Icon   = meta.icon;
          const color  = key === 'difficulty' ? difficultyColor : meta.color;
          return (
            <div
              key={key}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-800/60 border border-white/5 hover:border-violet-500/20 transition-all duration-200 group"
            >
              <div className={`p-2 rounded-lg bg-${color}-500/10 border border-${color}-500/20 group-hover:scale-110 transition-transform shrink-0`}>
                <Icon className={`w-4 h-4 text-${color}-400`} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold">{key}</p>
                <p className="text-sm text-slate-200 font-medium truncate">{value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
