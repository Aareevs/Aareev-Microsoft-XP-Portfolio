




import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Plus, Minus, ListMusic, Volume2, AlertCircle, RefreshCw, ExternalLink, Search } from 'lucide-react';
import { MUSIC_TRACKS } from '../../constants';

// Declare standard window extension for YouTube IFrame API
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const MusicPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volume, setVolume] = useState(50); // 0-100
  const [errorCode, setErrorCode] = useState<number | null>(null);
  
  // Refs for both player engines
  const ytPlayerRef = useRef<any>(null);
  const filePlayerRef = useRef<HTMLVideoElement>(null);
  const ytReadyRef = useRef(false);

  const currentTrack = MUSIC_TRACKS[currentTrackIndex];

  // --- INITIALIZATION ---

  // Initialize YouTube API only once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
         // API is ready, but we wait for first 'youtube' track to init the actual player instance
         // or init it now if the current track is youtube
         if (currentTrack.type === 'youtube') {
            initYtPlayer(currentTrack.youtubeId);
         }
      };
    } else {
       if (currentTrack.type === 'youtube' && !ytPlayerRef.current) {
          initYtPlayer(currentTrack.youtubeId);
       }
    }
  }, []);

  const initYtPlayer = (videoId: string) => {
      if (ytPlayerRef.current || !window.YT) return;
      try {
          ytPlayerRef.current = new window.YT.Player('yt-player-iframe', {
              height: '100%',
              width: '100%',
              videoId: videoId,
              playerVars: {
                  'autoplay': 1,
                  'playsinline': 1,
                  'controls': 0,
                  'disablekb': 1,
                  'enablejsapi': 1,
                  'origin': window.location.origin
              },
              events: {
                  'onReady': onYtReady,
                  'onStateChange': onYtStateChange,
                  'onError': onYtError
              }
          });
      } catch (e) {
          console.error("Error creating YT Player:", e);
      }
  };

  // --- YOUTUBE EVENT HANDLERS ---

  const onYtReady = (event: any) => {
      ytReadyRef.current = true;
      event.target.setVolume(volume);
      if (currentTrack.type === 'youtube') {
        event.target.playVideo();
      }
  };

  const onYtStateChange = (event: any) => {
      // If we are currently playing a file, ignore YT events
      if (currentTrack.type !== 'youtube') return;

      if (event.data === 1) { // Playing
        setIsPlaying(true);
        setErrorCode(null);
      } else if (event.data === 2) { // Paused
        setIsPlaying(false);
      } else if (event.data === 0) { // Ended
          handleNext();
      }
  };

  const onYtError = (e: any) => {
    if (currentTrack.type !== 'youtube') return;
    const code = e.data;
    setErrorCode(code);
    setIsPlaying(false);
  };

  // --- FILE PLAYER EVENT HANDLERS ---
  
  const onFileEnded = () => {
      handleNext();
  };

  const onFileError = () => {
      if (currentTrack.type !== 'file') return;
      setErrorCode(404); // Generic error for file
      setIsPlaying(false);
  };

  // --- TRACK SWITCHING LOGIC ---

  useEffect(() => {
    setErrorCode(null);
    setIsPlaying(true); // Assume play on switch

    // Stop EVERYTHING first
    if (ytReadyRef.current && ytPlayerRef.current && ytPlayerRef.current.pauseVideo) {
        ytPlayerRef.current.pauseVideo();
    }
    if (filePlayerRef.current) {
        filePlayerRef.current.pause();
    }

    if (currentTrack.type === 'youtube') {
        // Handle YouTube
        if (!ytPlayerRef.current) {
             if (window.YT && window.YT.Player) {
                 initYtPlayer(currentTrack.youtubeId || "");
             }
        } else if (ytReadyRef.current) {
            ytPlayerRef.current.loadVideoById(currentTrack.youtubeId);
            ytPlayerRef.current.playVideo();
        }
    } else if (currentTrack.type === 'file') {
        // Handle File
        if (filePlayerRef.current) {
            filePlayerRef.current.src = currentTrack.url || "";
            filePlayerRef.current.play().catch(e => {
                setIsPlaying(false);
            });
        }
    }

  }, [currentTrackIndex]);


  // --- PLAY/PAUSE SYNC ---

  const handlePlayPause = () => {
    if (errorCode !== null) {
        // Retry logic
        if (currentTrack.type === 'youtube' && ytReadyRef.current) {
            ytPlayerRef.current.playVideo();
        } else if (currentTrack.type === 'file' && filePlayerRef.current) {
            filePlayerRef.current.play();
        }
        setErrorCode(null);
        return;
    }

    if (isPlaying) {
        // Pause current
        if (currentTrack.type === 'youtube' && ytReadyRef.current) {
            ytPlayerRef.current.pauseVideo();
        } else if (currentTrack.type === 'file' && filePlayerRef.current) {
            filePlayerRef.current.pause();
        }
        setIsPlaying(false);
    } else {
        // Play current
        if (currentTrack.type === 'youtube' && ytReadyRef.current) {
            ytPlayerRef.current.playVideo();
        } else if (currentTrack.type === 'file' && filePlayerRef.current) {
            filePlayerRef.current.play();
        }
        setIsPlaying(true);
    }
  };

  // --- VOLUME SYNC ---

  useEffect(() => {
    // Set YT Volume
    if (ytReadyRef.current && ytPlayerRef.current) {
        ytPlayerRef.current.setVolume(volume);
    }
    // Set File Volume
    if (filePlayerRef.current) {
        filePlayerRef.current.volume = volume / 100;
    }
  }, [volume]);


  // --- CONTROLS ---

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length);
  };

  const handleVolumeUp = () => {
    setVolume(prev => Math.min(prev + 10, 100));
  };

  const handleVolumeDown = () => {
    setVolume(prev => Math.max(prev - 10, 0));
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setShowPlaylist(false);
  };

  const getErrorMessage = (code: number) => {
      if (currentTrack.type === 'file') return "File Error";
      switch(code) {
          case 101:
          case 150: 
          case 153: return "Restricted";
          case 100: return "Video Not Found";
          case 2: return "Invalid ID";
          default: return "Playback Error";
      }
  };

  return (
    <div className="w-full h-full bg-[#1a1a1a] flex flex-col overflow-hidden relative font-sans select-none">
      
      {/* HIDDEN PLAYERS */}
      
      {/* 1. YouTube Iframe */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 z-[-1] overflow-hidden">
          <div id="yt-player-iframe"></div>
      </div>

      {/* 2. Native File Player (Video tag supports mp3 and mp4) */}
      <video 
        ref={filePlayerRef}
        className="hidden"
        onEnded={onFileEnded}
        onError={onFileError}
        playsInline
      />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center gap-1 px-3 pb-2 pt-0 h-full">
        
        {/* Left: Album Art & Info */}
        <div className="relative w-[140px] h-[140px] group shrink-0">
           <div className="w-full h-full rounded-md shadow-lg overflow-hidden border border-white/20 relative bg-black">
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title} 
                className={`w-full h-full object-cover transition-opacity duration-500 ${errorCode !== null ? 'opacity-30 grayscale' : 'opacity-100'}`}
              />
              
              {/* Error / Status Overlay */}
              {errorCode !== null && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-2 text-center animate-in fade-in z-20">
                    <AlertCircle className="text-red-500 w-6 h-6 mb-1 drop-shadow-md" />
                    <span className="text-red-400 text-[9px] font-bold uppercase tracking-wider mb-2 leading-tight px-1">{getErrorMessage(errorCode)}</span>
                    
                    {/* Error Actions */}
                    <div className="flex flex-col gap-1 items-center z-30 pointer-events-auto">
                        {/* Direct YouTube Link */}
                        {currentTrack.type === 'youtube' && (
                            <a 
                                href={`https://www.youtube.com/watch?v=${currentTrack.youtubeId}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[9px] bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-sm flex items-center gap-1 transition-colors shadow-sm font-medium cursor-pointer"
                            >
                                Watch on YouTube <ExternalLink size={8} />
                            </a>
                        )}

                        {/* Search Alternative Link */}
                        <a 
                           href={`https://www.youtube.com/results?search_query=${encodeURIComponent(currentTrack.title + " " + currentTrack.artist + " audio")}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-[9px] bg-[#333] hover:bg-[#444] text-gray-200 px-3 py-1.5 rounded-sm flex items-center gap-1 transition-colors shadow-sm font-medium cursor-pointer border border-white/10"
                        >
                           <Search size={8} /> Search Alt
                        </a>
                        
                        <button 
                           onClick={() => handleTrackSelect(currentTrackIndex)} // Reload current
                           className="mt-1 text-gray-400 hover:text-white text-[9px] flex items-center gap-1 cursor-pointer"
                        >
                            <RefreshCw size={8} /> Retry
                        </button>
                    </div>
                 </div>
              )}

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent pt-6 pointer-events-none">
                 <h2 className="text-white font-bold text-sm leading-none truncate drop-shadow-md">
                    {currentTrack.title}
                 </h2>
                 <p className="text-gray-300 text-[10px] mt-1 truncate drop-shadow-md">
                    {currentTrack.artist}
                 </p>
              </div>
           </div>
           
           {/* Playlist Toggle */}
           <button 
             onClick={() => setShowPlaylist(!showPlaylist)}
             className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-blue-600 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 transition-colors z-10"
             title="View Playlist"
           >
              <ListMusic size={12} />
           </button>
        </div>

        {/* Right: Circular Control Pad */}
        <div className="shrink-0 scale-95">
            <div className="relative w-[130px] h-[130px] bg-[#222] rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.5)] flex items-center justify-center border border-[#333]">
              
              {/* Outer Ring Decoration */}
              <div className="absolute inset-1 rounded-full border border-gray-600/20 pointer-events-none"></div>

              {/* Volume Up */}
              <button onClick={handleVolumeUp} className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white active:scale-90 transition-transform">
                  <Plus size={16} />
              </button>

              {/* Volume Down */}
              <button onClick={handleVolumeDown} className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white active:scale-90 transition-transform">
                  <Minus size={16} />
              </button>

              {/* Prev */}
              <button onClick={handlePrev} className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white active:scale-90 transition-transform">
                  <SkipBack size={16} fill="currentColor" />
              </button>

              {/* Next */}
              <button onClick={handleNext} className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white active:scale-90 transition-transform">
                  <SkipForward size={16} fill="currentColor" />
              </button>

              {/* Play/Pause (Center) */}
              <button 
                  onClick={handlePlayPause}
                  className={`
                    w-[48px] h-[48px] rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] 
                    shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_4px_8px_rgba(0,0,0,0.6)] 
                    flex items-center justify-center border border-[#333] active:scale-95 transition-transform group
                  `}
              >
                  {isPlaying ? (
                    <Pause size={18} className="text-gray-400 group-hover:text-blue-400 fill-current" />
                  ) : (
                    <Play size={18} className="text-gray-400 group-hover:text-blue-400 fill-current ml-0.5" />
                  )}
              </button>
            </div>
        </div>
      </div>

      {/* Playlist Overlay */}
      {showPlaylist && (
        <div className="absolute inset-0 z-20 bg-[#111]/95 backdrop-blur-sm flex flex-col animate-in fade-in duration-150">
           <div className="h-8 border-b border-gray-800 flex items-center justify-between px-3 bg-[#0a0a0a] shrink-0">
              <span className="text-white font-bold text-xs tracking-wide">Playlist</span>
              <button onClick={() => setShowPlaylist(false)} className="text-gray-400 hover:text-red-400 text-[10px] uppercase font-bold">Close</button>
           </div>
           <div className="flex-1 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-gray-700">
              {MUSIC_TRACKS.map((track, idx) => (
                 <div 
                   key={idx}
                   onClick={() => handleTrackSelect(idx)}
                   className={`flex items-center gap-2 p-1.5 rounded cursor-pointer mb-0.5 ${currentTrackIndex === idx ? 'bg-blue-900/40 border border-blue-700/50' : 'hover:bg-white/5 border border-transparent'}`}
                 >
                    <div className="w-6 h-6 rounded bg-gray-800 overflow-hidden shrink-0">
                       <img src={track.cover} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex flex-col overflow-hidden min-w-0">
                       <span className={`text-xs truncate ${currentTrackIndex === idx ? 'text-blue-300 font-bold' : 'text-gray-200'}`}>{track.title}</span>
                       <span className="text-[10px] text-gray-500 truncate">{track.artist}</span>
                    </div>
                    {currentTrackIndex === idx && isPlaying && (
                       <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                    )}
                 </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;