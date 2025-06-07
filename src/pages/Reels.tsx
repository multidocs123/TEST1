import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, ArrowLeft, X, Maximize, Minimize } from 'lucide-react';
import { Reel, loadReels } from '../data/reels';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

interface FullScreenModalProps {
  reel: Reel | null;
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ reel, isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          onClose();
        }
      }
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      }
      if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      }
      if (e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.overflow = 'hidden';
      
      // Auto-play when modal opens
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.overflow = 'unset';
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isOpen, isFullscreen]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
    showControlsTemporarily();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    showControlsTemporarily();
  };

  const toggleFullscreen = async () => {
    if (!modalRef.current) return;

    try {
      if (!isFullscreen) {
        await modalRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error('Exit fullscreen error:', error);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || isDragging) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleSeekStart = () => {
    setIsDragging(true);
  };

  const handleSeekEnd = () => {
    setIsDragging(false);
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleMouseMove = () => {
    showControlsTemporarily();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!reel) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 bg-black flex items-center justify-center ${
            isFullscreen ? 'cursor-none' : ''
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Background Click Area for Play/Pause */}
          <div 
            className="absolute inset-0 z-10"
            onClick={togglePlay}
          />

          {/* Video */}
          <video
            ref={videoRef}
            src={reel.videoUrl}
            className="w-full h-full object-contain relative z-20"
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            poster={reel.thumbnail}
          />

          {/* Controls Overlay */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-30 pointer-events-none"
            style={{ cursor: showControls ? 'default' : 'none' }}
          >
            {/* Top Controls */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 pointer-events-auto z-40">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-lg font-semibold truncate flex-1 mr-4">
                  {reel.title}
                </h2>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Exit button clicked'); // Debug log
                    onClose();
                  }}
                  className="p-2 text-white hover:bg-white/20 rounded-full transition-colors z-50 relative"
                  style={{ pointerEvents: 'auto' }}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Center Play/Pause */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-auto z-30">
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: showControls && !isPlaying ? 1 : 0.8,
                  opacity: showControls && !isPlaying ? 1 : 0
                }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="p-4 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                style={{ pointerEvents: 'auto' }}
              >
                <Play size={48} />
              </motion.button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-auto z-40">
              <div className="space-y-4">
                {/* Seek Bar */}
                <div className="flex items-center space-x-2 text-white text-sm">
                  <span className="min-w-[40px] text-right">
                    {formatTime(currentTime)}
                  </span>
                  <div className="flex-1 relative group">
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleSeekStart();
                      }}
                      onMouseUp={(e) => {
                        e.stopPropagation();
                        handleSeekEnd();
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        handleSeekStart();
                      }}
                      onTouchEnd={(e) => {
                        e.stopPropagation();
                        handleSeekEnd();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                               [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                               [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
                               [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
                               [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none
                               group-hover:[&::-webkit-slider-thumb]:scale-125 group-hover:[&::-moz-range-thumb]:scale-125
                               transition-all duration-150"
                      style={{
                        background: `linear-gradient(to right, white 0%, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`,
                        pointerEvents: 'auto'
                      }}
                    />
                  </div>
                  <span className="min-w-[40px]">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                      style={{ pointerEvents: 'auto' }}
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                      style={{ pointerEvents: 'auto' }}
                    >
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>

                    <div className="text-white text-sm">
                      Created by: {reel.creator}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-white text-xs">
                      ID: {reel.id}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFullscreen();
                      }}
                      className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                      style={{ pointerEvents: 'auto' }}
                    >
                      {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Reels: React.FC = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReels = async () => {
      try {
        console.log('Loading reels...');
        const data = await loadReels();
        console.log('Reels loaded:', data);
        setReels(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading reels:', err);
        setError('Failed to load reels');
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  const openModal = (reel: Reel) => {
    setSelectedReel(reel);
  };

  const closeModal = () => {
    setSelectedReel(null);
  };

  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!reels || reels.length === 0) {
    return (
      <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Works</span>
          </button>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Instagram Reels</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
            No reels available at the moment.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Works</span>
        </button>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Instagram Reels</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
          Discover our latest vertical video content
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reels.map((reel, index) => (
          <ReelCard 
            key={reel.id} 
            reel={reel} 
            index={index}
            onReelClick={openModal}
          />
        ))}
      </div>

      {/* Full Screen Modal */}
      <FullScreenModal
        reel={selectedReel}
        isOpen={!!selectedReel}
        onClose={closeModal}
      />
    </div>
  );
};

interface ReelCardProps {
  reel: Reel;
  index: number;
  onReelClick: (reel: Reel) => void;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, index, onReelClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (inView && isMobile) {
      videoRef.current.play().catch(() => {
        console.log('Autoplay blocked');
      });
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [inView, isMobile]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleCardClick = () => {
    onReelClick(reel);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-lg group cursor-pointer hover:shadow-xl transition-shadow"
      ref={inViewRef}
      onClick={handleCardClick}
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        poster={reel.thumbnail}
      />

      {/* Play/Pause Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          onClick={togglePlay}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          {isPlaying ? (
            <Pause size={32} className="text-white" />
          ) : (
            <Play size={32} className="text-white" />
          )}
        </button>
      </div>

      {/* Info Overlay (only visible on hover) */}
      <div className="absolute inset-0 pointer-events-none text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-4 left-4 text-sm font-semibold drop-shadow-md">
          {reel.title}
        </div>
        <div className="absolute bottom-4 left-4 text-xs drop-shadow-md">
          Created by: {reel.creator}
        </div>
        <div className="absolute bottom-4 right-4 text-xs drop-shadow-md">
          ID: {reel.id}
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100 pointer-events-auto"
      >
        {isMuted ? (
          <VolumeX size={20} className="text-white" />
        ) : (
          <Volume2 size={20} className="text-white" />
        )}
      </button>

      {/* Click to expand hint */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        Click to expand
      </div>
    </motion.div>
  );
};

export default Reels;