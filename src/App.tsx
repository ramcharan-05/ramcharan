import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Terminal, Cpu, Share2, Activity } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Glitch Effects Layer */}
      <div className="noise-overlay" />
      <div className="scanlines" />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Header */}
      <header className="absolute top-8 left-8 flex items-center gap-4 z-50">
        <div className="w-12 h-12 border border-[#00FFFF] flex items-center justify-center animate-pulse">
           <Cpu className="w-6 h-6 text-[#00FFFF]" />
        </div>
        <div>
          <h1 className="text-2xl leading-none tracking-tighter text-[#00FFFF] font-pixel chromatic" data-text="NEO-SYNTH TERMINAL v4.0.2">
            NEO-SYNTH TERMINAL v4.0.2
          </h1>
          <div className="flex items-center gap-2 text-[10px] text-white opacity-40 uppercase tracking-[0.3em]">
            <span className="flex items-center gap-1"><Activity className="w-2 h-2" /> CORE_STABLE</span>
            <span>//</span>
            <span>UPLINK_ESTABLISHED</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col lg:flex-row items-center justify-center gap-12 z-10 w-full max-w-7xl">
        {/* Sidebar / Left Decorative */}
        <div className="hidden xl:flex flex-col gap-8 w-48 opacity-30 select-none">
          <div className="space-y-4">
            <div className="h-px bg-[#00FFFF] w-full" />
            <div className="text-[10px] space-y-1">
              <p>USER_ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
              <p>AUTH_LEVEL: LEVEL_9_OVERRIDE</p>
              <p>LATENCY: {Math.floor(Math.random() * 50)}ms</p>
            </div>
            <div className="h-px bg-[#00FFFF] w-1/2" />
          </div>
          <div className="animate-pulse space-y-2">
            <div className="h-2 bg-[#FF00FF]/50 w-full" />
            <div className="h-2 bg-[#00FFFF]/50 w-3/4" />
            <div className="h-2 bg-[#FF00FF]/50 w-5/6" />
          </div>
        </div>

        {/* Center: Snake Game */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative p-1 bg-gradient-to-br from-[#00FFFF] via-[#FF00FF] to-[#00FFFF] bg-[length:400%_400%] animate-gradient">
             <div className="bg-black p-2">
               <SnakeGame />
             </div>
          </div>
        </div>

        {/* Right: Music Player */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-[#FF00FF]/30 pb-2">
            <span className="text-xs uppercase tracking-widest text-[#FF00FF] flex items-center gap-2">
              <Terminal className="w-3 h-3" /> AUDIO_STREAM
            </span>
            <span className="text-[8px] text-[#00FFFF]/50">BUFFER_AUTO</span>
          </div>
          <MusicPlayer />
          
          {/* Quick Stats Panel */}
          <div className="border border-[#00FFFF]/20 p-4 bg-white/5 space-y-3">
             <div className="flex items-center justify-between text-[10px] text-[#00FFFF] opacity-60">
                <span>SYSTEM_TICKS</span>
                <span className="font-mono">84,921,029</span>
             </div>
             <div className="h-px bg-white/10" />
             <div className="flex items-center gap-2">
                <Share2 className="w-3 h-3 text-[#FF00FF]" />
                <span className="text-[10px] tracking-widest">ENCRYPTED_COMMS_ON</span>
             </div>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-8 right-8 text-right opacity-30 pointer-events-none select-none">
        <p className="text-[10px] uppercase tracking-[0.5em] mb-1">DESIGNED_BY_AI_AGENT</p>
        <p className="text-xs text-[#00FFFF]">PROPRIETARY_HARDWARE_INTERFACE</p>
      </footer>

      {/* Distant Tearing Effect (Floating random lines) */}
      <div className="absolute top-1/4 left-0 w-full h-[2px] bg-[#FF00FF]/20 glitch-anim pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute top-3/4 left-0 w-full h-[1px] bg-[#00FFFF]/20 glitch-anim pointer-events-none" style={{ animationDelay: '4s' }} />
    </div>
  );
}
