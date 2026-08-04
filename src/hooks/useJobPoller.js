import { useState, useEffect, useRef, useCallback } from 'react';
import { getJobStatus } from '../api/teacherApi';

const POLL_INTERVAL_MS = 2000;

/**
 * Custom hook that polls the backend for job status and accumulates
 * partial data as pipeline stages complete.
 *
 * @param {string|null} jobId - The job ID returned after upload
 * @returns {{ status, stage, partialData, error, progress }}
 */
export function useJobPoller(jobId) {
  const [status, setStatus]         = useState('IDLE');   // IDLE | PENDING | IN_PROGRESS | SUCCESS | FAILED
  const [stage, setStage]           = useState('');
  const [partialData, setPartialData] = useState({});
  const [error, setError]           = useState(null);
  const [progress, setProgress]     = useState(0);
  const intervalRef                 = useRef(null);
  const isMounted                   = useRef(true);

  const STAGE_ORDER = [
    'Initialized',
    'Extracting Text',
    'Generating Metadata',
    'Building Knowledge Base',
    'Generating Teaching Plan',
    'Analyzing Learning Gaps',
    'Generating Period 1',
    'Generating Period 2',
    'Generating Period 3',
    'Generating Period 4',
    'Generating Period 5',
    'Generating Period 6',
    'Completed',
  ];

  const calcProgress = useCallback((stageName) => {
    const idx = STAGE_ORDER.findIndex(s =>
      s.toLowerCase().includes((stageName || '').toLowerCase())
    );
    if (idx === -1) return 10;
    return Math.round(((idx + 1) / STAGE_ORDER.length) * 100);
  }, []);

  const mergeData = useCallback((prev, incoming) => {
    if (!incoming) return prev;
    const merged = { ...prev };
    // Only overwrite a key if the incoming value is non-null/non-empty
    Object.entries(incoming).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        if (Array.isArray(val) && val.length > 0) merged[key] = val;
        else if (!Array.isArray(val) && typeof val === 'object') merged[key] = val;
        else if (typeof val !== 'object') merged[key] = val;
      }
    });
    return merged;
  }, []);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const poll = useCallback(async () => {
    if (!jobId || !isMounted.current) return;
    try {
      const response = await getJobStatus(jobId);
      if (!isMounted.current) return;

      const { status: s, stage: stg, result, details, error: err } = response;

      setStatus(s);
      setStage(stg || '');
      setProgress(calcProgress(stg));

      if (s === 'SUCCESS') {
        // Full data comes in result.data
        const finalData = result?.data || result || {};
        setPartialData(prev => mergeData(prev, finalData));
        setProgress(100);
        stopPolling();
        return;
      }

      if (s === 'FAILED') {
        setError(err || 'The pipeline encountered an unexpected error.');
        stopPolling();
        return;
      }

      // IN_PROGRESS — merge partial data
      if (details?.data) {
        setPartialData(prev => mergeData(prev, details.data));
      }

    } catch (e) {
      if (!isMounted.current) return;
      // Don't stop polling on transient network errors
      console.warn('[Poller] Transient error:', e.message);
    }
  }, [jobId, calcProgress, mergeData, stopPolling]);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    if (!jobId) return;
    setStatus('PENDING');
    setStage('Queued');
    setProgress(5);
    setError(null);
    setPartialData({});

    // Start polling immediately, then repeat
    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);

    return () => stopPolling();
  }, [jobId, poll, stopPolling]);

  return { status, stage, partialData, error, progress };
}
