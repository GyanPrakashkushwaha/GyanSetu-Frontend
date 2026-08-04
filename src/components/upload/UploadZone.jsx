import { useState, useRef, useCallback } from 'react';
import { FiUploadCloud, FiFile, FiX, FiZap } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { uploadDocument } from '../../api/teacherApi';

const DEMO_JOB_ID = '__DEMO__';

export default function UploadZone({ onJobStarted }) {
  const [file, setFile]           = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f) return;
    if (f.type !== 'application/pdf') {
      setUploadError('Only PDF files are supported.');
      console.log('Only PDF files are supported.');
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      setUploadError('File size must be under 50 MB.');
      console.log('File size must be under 50 MB.');
      return;
    }
    setUploadError(null);
    setFile(f);
    console.log("set file")
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  }, [handleFile]);

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);
    try {
      const { job_id } = await uploadDocument(file);
      onJobStarted(job_id);
    } catch (e) {
      setUploadError(e?.response?.data?.detail || 'Upload failed. Please try again.');
      setIsUploading(false);
    }
  };

  const handleDemo = () => {
    onJobStarted(DEMO_JOB_ID);
  };

  const formatBytes = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay:'1.5s'}}/>
      </div>

      {/* Header */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-violet-600/20 border border-violet-500/30">
            <HiOutlineAcademicCap className="w-8 h-8 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black gradient-text tracking-tight">
            Teacher AI
          </h1>
        </div>
        <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
          Upload a PDF and get a complete AI-generated educational analysis — knowledge base, teaching plan, learning gap diagnostics, and full period scripts.
        </p>
      </div>

      {/* Upload card */}
      <div className="w-full max-w-2xl animate-slide-up" style={{animationDelay:'0.1s'}}>
        <div
          className={`glass-card p-1 transition-all duration-300 ${isDragging ? 'drag-active neon-border' : 'neon-border'}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
        >
          <div
            className={`rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer p-12 text-center
              ${isDragging
                ? 'border-violet-400 bg-violet-500/5'
                : file
                  ? 'border-emerald-500/50 bg-emerald-500/5'
                  : 'border-navy-600 hover:border-violet-500/50 hover:bg-violet-500/5'
              }`}
            onClick={() => !file && inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {file ? (
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30">
                  <FiFile className="w-10 h-10 text-emerald-400" />
                </div>
                <div>
                  <p className="text-slate-100 font-semibold text-lg truncate max-w-xs">{file.name}</p>
                  <p className="text-slate-400 text-sm mt-1">{formatBytes(file.size)}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="flex items-center gap-2 text-rose-400 hover:text-rose-300 text-sm transition-colors"
                >
                  <FiX className="w-4 h-4" /> Remove file
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className={`p-5 rounded-2xl border transition-all duration-300 ${isDragging ? 'bg-violet-500/30 border-violet-400' : 'bg-navy-800 border-navy-600'}`}>
                  <FiUploadCloud className={`w-12 h-12 transition-colors ${isDragging ? 'text-violet-300 animate-bounce-subtle' : 'text-slate-500'}`} />
                </div>
                <div>
                  <p className="text-slate-200 font-semibold text-lg">
                    {isDragging ? 'Drop it here!' : 'Drag & drop your PDF'}
                  </p>
                  <p className="text-slate-500 text-sm mt-1">or <span className="text-violet-400 underline cursor-pointer">browse files</span> — max 50 MB</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {uploadError && (
          <div className="mt-3 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm animate-fade-in">
            ⚠️ {uploadError}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-base transition-all duration-300
              ${file && !isUploading
                ? 'bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-navy-800 text-slate-500 cursor-not-allowed'
              }`}
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                <FiUploadCloud className="w-5 h-5" />
                Analyze Document
              </>
            )}
          </button>

          <button
            onClick={handleDemo}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-sm border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:-translate-y-0.5"
          >
            <FiZap className="w-4 h-4" />
            Try Demo
          </button>
        </div>

        {/* Feature chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs text-slate-500 animate-fade-in" style={{animationDelay:'0.3s'}}>
          {['📚 Knowledge Base', '📅 Teaching Plan', '🧠 Learning Gaps', '📝 Period Scripts', '❓ Assessments'].map(f => (
            <span key={f} className="px-3 py-1.5 rounded-full bg-navy-800 border border-navy-700">{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
