import { useState, useEffect } from 'react';
import { 
  Video, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sliders, 
  Film, 
  ArrowRight,
  ShieldCheck,
  Terminal
} from 'lucide-react';

interface HealthStatus {
  status: 'idle' | 'checking' | 'connected' | 'error';
  data?: { status: string };
  error?: string;
  timestamp?: string;
}

export default function App() {
  const [apiUrl, setApiUrl] = useState<string>('http://localhost:8000');
  const [health, setHealth] = useState<HealthStatus>({ status: 'idle' });

  const checkBackendHealth = async (urlToTest = apiUrl) => {
    setHealth({ status: 'checking' });
    try {
      const endpoint = `${urlToTest.replace(/\/+$/, '')}/api/health`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setHealth({
        status: 'connected',
        data,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      setHealth({
        status: 'error',
        error: err instanceof Error ? err.message : 'Failed to connect to backend',
        timestamp: new Date().toLocaleTimeString(),
      });
    }
  };

  useEffect(() => {
    // Initial connection attempt on load
    checkBackendHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                VIDEO QUALITY ENHANCER
              </h1>
              <p className="text-xs text-slate-400">Minimalist 720p Video Pipeline</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              MVP Development
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full space-y-8">
        {/* MVP Notification Banner */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 sm:p-5 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-amber-300 uppercase tracking-wider">
              Phase 1: Architecture & Foundation Verification
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              This application is in active MVP foundation staging. Video transcode pipelines are locked while frontend (React + Vite) and backend (FastAPI) communications are verified.
            </p>
          </div>
        </div>

        {/* Hero & Description */}
        <div className="text-center space-y-3 max-w-2xl mx-auto py-2">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
            Simple, Reliable Video Enhancement
          </h2>
          <p className="text-base text-slate-400">
            Convert user videos to a standard, verified 720p output using native FFmpeg transcoding and FFprobe validation. No convoluted queues, no duplicate servers.
          </p>
        </div>

        {/* Pipeline Architecture Indicator */}
        <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Core Target Pipeline (Phase 1 → Phase 2)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-indigo-300 font-medium">
              <span className="w-5 h-5 rounded-full bg-indigo-600/40 text-indigo-200 flex items-center justify-center text-[10px]">1</span>
              <span>Upload Video</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px]">2</span>
              <span>Analyze (FFprobe)</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px]">3</span>
              <span>Target: 720p</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px]">4</span>
              <span>FFmpeg Convert</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/40 border border-slate-800 text-slate-400">
              <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[10px]">5</span>
              <span>Validate & Download</span>
            </div>
          </div>
        </div>

        {/* Video Upload & Enhancer Control (Placeholder Form) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upload Placeholder Area */}
          <div className="md:col-span-2 space-y-4">
            <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl bg-slate-900/40 p-8 sm:p-12 text-center transition-colors">
              <div className="w-16 h-16 rounded-full bg-indigo-950/50 border border-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center mb-4">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-200">
                Upload Area (Placeholder)
              </h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                Drag and drop your video file here, or select from disk.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Film className="w-4 h-4" />
                <span>Planned formats: MP4, MOV, MKV (Max 500MB)</span>
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  disabled
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-500 text-xs font-medium cursor-not-allowed border border-slate-700/50"
                >
                  Upload Disabled in Phase 1
                </button>
              </div>
            </div>
          </div>

          {/* Settings & Enhance Action */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 space-y-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200 border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Processing Profile</span>
              </div>

              {/* Supported: 720p */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 block">
                  Target Resolution
                </label>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/40 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-indigo-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                        720p HD
                      </div>
                      <p className="text-xs text-slate-400">1280 × 720 • Standard MVP Profile</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      Supported
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 opacity-60 flex items-center justify-between cursor-not-allowed">
                    <div>
                      <div className="text-sm font-medium text-slate-400">1080p Full HD</div>
                      <p className="text-xs text-slate-500">Future upgrade (Not in MVP)</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-500">
                      Disabled
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhance Button (Placeholder) */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span>Enhance to 720p</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2">
                  Enhance action disabled during Phase 1
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* API Communication Verification Section */}
        <section className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-slate-100">
                  React ↔ FastAPI Communication Verification
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Phase 1 verification: Confirm frontend can reach the backend health endpoint.
              </p>
            </div>

            <button
              onClick={() => checkBackendHealth()}
              disabled={health.status === 'checking'}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${health.status === 'checking' ? 'animate-spin' : ''}`} />
              Test Connection
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Endpoint configuration */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-400 block">
                Backend API URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  placeholder="http://localhost:8000"
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => checkBackendHealth(apiUrl)}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 border border-slate-700 transition"
                >
                  Ping
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span>Target endpoint:</span>
                <code className="text-indigo-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                  GET {apiUrl}/api/health
                </code>
              </div>
            </div>

            {/* Live Status Response */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 block">
                Health Status Response
              </label>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Service Status:</span>
                  {health.status === 'checking' && (
                    <span className="text-amber-400 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Checking...
                    </span>
                  )}
                  {health.status === 'connected' && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                    </span>
                  )}
                  {health.status === 'error' && (
                    <span className="text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Offline / Unreachable
                    </span>
                  )}
                  {health.status === 'idle' && (
                    <span className="text-slate-500">Not checked yet</span>
                  )}
                </div>

                <div className="text-slate-300">
                  <span className="text-slate-500">Payload: </span>
                  {health.data ? (
                    <code className="text-emerald-300">{JSON.stringify(health.data)}</code>
                  ) : health.error ? (
                    <span className="text-rose-400">{health.error}</span>
                  ) : (
                    <span className="text-slate-600">No response yet</span>
                  )}
                </div>

                {health.timestamp && (
                  <div className="text-[10px] text-slate-500 text-right">
                    Last pinged: {health.timestamp}
                  </div>
                )}
              </div>
            </div>
          </div>

          {health.status === 'error' && (
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">FastAPI backend not running?</p>
              <p>Start the backend using:</p>
              <code className="block bg-slate-900 text-indigo-300 p-2 rounded border border-slate-800 font-mono text-[11px]">
                cd backend &amp;&amp; uvicorn app.main:app --reload --port 8000
              </code>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Video Quality Enhancer • Minimalist Architecture (React + Vite → FastAPI → FFmpeg/FFprobe)</p>
      </footer>
    </div>
  );
}
