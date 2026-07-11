import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

export default function AudioPlayer({ track, isPlaying, onPlayPauseToggle, onClose }) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Play/Pause effect
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => console.log('Audio playback error:', err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, track]);

  // Track change effect
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(err => console.log('Audio playback error:', err));
    }
  }, [track]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (audioRef.current) {
      audioRef.current.volume = vol;
      audioRef.current.muted = vol === 0;
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  // Format time (e.g. 03:45)
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a202c] text-white py-4 px-6 border-t border-gray-800 shadow-2xl z-[90] flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => onPlayPauseToggle(false)}
      />

      {/* Track info */}
      <div className="flex items-center gap-3 w-full md:w-1/4 min-w-0">
        <img 
          src={track.thumbnail} 
          alt={track.title} 
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-700" 
        />
        <div className="min-w-0">
          <h4 className="font-bold text-sm truncate text-gray-100">{track.title}</h4>
          <p className="text-xs text-gray-400 truncate">{track.artist}</p>
        </div>
      </div>

      {/* Player controls & Progress */}
      <div className="flex flex-col items-center gap-2 w-full md:w-2/4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onPlayPauseToggle(!isPlaying)}
            className="w-10 h-10 rounded-full bg-[#FF6A00] text-white flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>
        
        {/* Progress Slider */}
        <div className="w-full flex items-center gap-3 text-xs text-gray-400 font-mono">
          <span>{formatTime(currentTime)}</span>
          <input 
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-grow h-1.5 rounded-lg bg-gray-700 appearance-none cursor-pointer accent-[#FF6A00] focus:outline-none"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume & Close */}
      <div className="flex items-center justify-end gap-4 w-full md:w-1/4">
        <div className="flex items-center gap-2">
          <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input 
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 rounded-lg bg-gray-700 appearance-none cursor-pointer accent-[#FF6A00]"
          />
        </div>
        
        <button onClick={onClose} className="text-gray-400 hover:text-white hover:bg-gray-800 p-1.5 rounded-full transition-all">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
