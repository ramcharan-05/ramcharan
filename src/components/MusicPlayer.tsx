import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRACKS } from '../constants';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  return (
    <div className="w-full max-w-[400px] border border-[#FF00FF]/30 p-6 bg-black/50 backdrop-blur-md relative overflow-hidden">
      {/* Background Glitch Image */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[#FF00FF]/50 animate-pulse" />
      
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 border-2 border-[#FF00FF] rounded-full overflow-hidden border-glow-magenta"
            >
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-full h-full object-cover scale-150 grayscale contrast-150"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full border border-[#FF00FF]" />
            </div>
          </div>
          
          <div className="flex flex-col flex-1 overflow-hidden">
            <h3 className="text-2xl text-[#FF00FF] truncate tracking-tighter chromatic" data-text={currentTrack.title}>
              {currentTrack.title}
            </h3>
            <p className="text-[#00FFFF] text-sm opacity-60 flex items-center gap-2">
              <Disc className="w-3 h-3 animate-spin-slow" />
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-1 bg-white/10 w-full relative">
            <motion.div
              className="absolute left-0 top-0 h-full bg-[#FF00FF] shadow-[0_0_10px_rgba(255,0,255,0.8)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-[#00FFFF]/40 uppercase tracking-widest">
            <span>BIT_STREAM_ACTIVE</span>
            <span>FREQ_NORMAL_v2</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            className="p-2 hover:text-[#FF00FF] transition-colors"
            title="PREV_TRACK"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full border-2 border-[#FF00FF] flex items-center justify-center hover:bg-[#FF00FF] hover:text-black transition-all group scale-100 hover:scale-110 active:scale-95"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 translate-x-1 fill-current" />
            )}
          </button>

          <button
            onClick={handleNext}
            className="p-2 hover:text-[#FF00FF] transition-colors"
            title="NEXT_TRACK"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#00FFFF]/50 mt-2">
          <Volume2 className="w-4 h-4" />
          <div className="h-1 bg-[#00FFFF]/20 flex-1 relative">
             <div className="absolute inset-y-0 left-0 w-3/4 bg-[#00FFFF]/60" />
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={handleNext}
      />
    </div>
  );
}
