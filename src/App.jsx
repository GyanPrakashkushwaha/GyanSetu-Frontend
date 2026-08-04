import { useState, useEffect, useCallback } from 'react';
import UploadZone from './components/upload/UploadZone';
import GeneratingScreen from './components/loading/GeneratingScreen';
import Dashboard from './components/dashboard/Dashboard';
import { useJobPoller } from './hooks/useJobPoller';
import { MOCK_DATA, DEMO_STAGES } from './data/mockData';

const DEMO_JOB_ID = '__DEMO__';

/* ─────────────────────────────────────────────
   Demo mode: simulates streaming stage-by-stage
───────────────────────────────────────────── */
function useDemoMode(isDemo) {
  const [demoStatus, setDemoStatus]       = useState('IDLE');
  const [demoStage, setDemoStage]         = useState('');
  const [demoPartial, setDemoPartial]     = useState({});
  const [demoProgress, setDemoProgress]   = useState(0);

  useEffect(() => {
    if (!isDemo) return;
    setDemoStatus('IN_PROGRESS');
    let cancelled = false;

    const run = async () => {
      for (let i = 0; i < DEMO_STAGES.length; i++) {
        if (cancelled) return;
        const s = DEMO_STAGES[i];
        const progressVal = Math.round(((i + 1) / DEMO_STAGES.length) * 100);

        setDemoStage(s.stage);
        setDemoProgress(progressVal);
        if (typeof s.partial === 'function') {
          setDemoPartial(s.partial(MOCK_DATA));
        }

        await new Promise(r => setTimeout(r, s.delay));
      }
      if (!cancelled) {
        setDemoStatus('SUCCESS');
        setDemoPartial(MOCK_DATA);
        setDemoProgress(100);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [isDemo]);

  return { demoStatus, demoStage, demoPartial, demoProgress };
}

/* ─────────────────────────────────────────────
   View state machine: upload → loading → done
───────────────────────────────────────────── */
export default function App() {
  const [view, setView]     = useState('upload');   // 'upload' | 'generating' | 'dashboard'
  const [jobId, setJobId]   = useState(null);
  const [isDemo, setIsDemo] = useState(false);
  const [finalData, setFinalData] = useState(null);

  /* Real polling (only active when jobId is set and not demo) */
  const {
    status:      pollStatus,
    stage:       pollStage,
    partialData: pollPartial,
    error:       pollError,
    progress:    pollProgress,
  } = useJobPoller(jobId && !isDemo ? jobId : null);

  /* Demo mode simulation */
  const {
    demoStatus,
    demoStage,
    demoPartial,
    demoProgress,
  } = useDemoMode(isDemo);

  /* Merged state (real or demo) */
  const status   = isDemo ? demoStatus   : pollStatus;
  const stage    = isDemo ? demoStage    : pollStage;
  const partial  = isDemo ? demoPartial  : pollPartial;
  const progress = isDemo ? demoProgress : pollProgress;
  const error    = isDemo ? null         : pollError;

  /* Transition to dashboard when generation completes */
  useEffect(() => {
    if (status === 'SUCCESS' && partial && Object.keys(partial).length > 0) {
      setFinalData(partial);
      // Small delay for a polished feel
      const t = setTimeout(() => setView('dashboard'), 600);
      return () => clearTimeout(t);
    }
  }, [status, partial]);

  const handleJobStarted = useCallback((id) => {
    if (id === DEMO_JOB_ID) {
      setIsDemo(true);
      setJobId(null);
    } else {
      setIsDemo(false);
      setJobId(id);
    }
    setView('generating');
    setFinalData(null);
  }, []);

  const handleReset = useCallback(() => {
    setView('upload');
    setJobId(null);
    setIsDemo(false);
    setFinalData(null);
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100">
      {view === 'upload' && (
        <UploadZone onJobStarted={handleJobStarted} />
      )}

      {view === 'generating' && (
        <>
          <GeneratingScreen stage={stage} progress={progress} partialData={partial} />
          {/* Error state overlay */}
          {error && (
            <div className="fixed inset-0 flex items-center justify-center bg-navy-950/80 backdrop-blur-sm z-50">
              <div className="glass-card max-w-md w-full mx-4 p-8 text-center border-rose-500/30">
                <div className="text-5xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-rose-300 mb-2">Pipeline Failed</h3>
                <p className="text-slate-400 text-sm mb-6">{error}</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {view === 'dashboard' && finalData && (
        <Dashboard data={finalData} onReset={handleReset} />
      )}
    </div>
  );
}
