import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, ArrowLeft } from 'lucide-react';
import { Short, loadShorts } from '../data/shorts';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

const Shorts: React.FC = () => {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShorts = async () => {
      const data = await loadShorts();
      setShorts(data);
      setLoading(false);
    };
    fetchShorts();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">YouTube Shorts</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
          Discover our latest vertical video content
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {shorts.map((short) => (
          <ShortCard key={short.id} short={short} />
        ))}
      </div>
    </div>
  );
};

interface ShortCardProps {
  short: Short;
}

const ShortCard: React.FC<ShortCardProps> = ({ short }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.8 });

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      if (isMobile) {
        video.muted = true;
        video.playsInline = true;
        video
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            console.log('Autoplay blocked');
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [inView, isMobile]);

  const togglePlay = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative aspect-[9/16] rounded-lg overflow-hidden shadow-lg group"
      ref={inViewRef}
    >
      <video
        ref={videoRef}
        src={short.videoUrl}
        className="w-full h-full object-cover cursor-pointer"
        loop
        muted={true}
        playsInline
        preload="auto"
        onClick={togglePlay}
        poster={short.thumbnail}
      />

      {/* Play/Pause Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        onClick={togglePlay}
      >
        {isPlaying ? (
          <Pause size={48} className="text-white" />
        ) : (
          <Play size={48} className="text-white" />
        )}
      </div>

      {/* Info - Visible only on hover */}
      <div className="absolute inset-0 pointer-events-none text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-4 left-4 text-sm font-semibold drop-shadow-md">
          {short.title}
        </div>
        <div className="absolute bottom-4 left-4 text-xs drop-shadow-md">
          Created by: {short.creator}
        </div>
        <div className="absolute bottom-4 right-4 text-xs drop-shadow-md">
          ID: {short.id}
        </div>
      </div>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100"
      >
        {isMuted ? (
          <VolumeX size={20} className="text-white" />
        ) : (
          <Volume2 size={20} className="text-white" />
        )}
      </button>
    </motion.div>
  );
};

export default Shorts;
