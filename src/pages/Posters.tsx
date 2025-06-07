import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, User, ChevronRight, ChevronDown } from 'lucide-react';
import { Poster, loadPosters } from '../data/posters';
import { useNavigate } from 'react-router-dom';

const Posters: React.FC = () => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for header
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const fetchPosters = async () => {
      const data = await loadPosters();
      setPosters(data);
      setLoading(false);
    };
    fetchPosters();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center min-h-screen">
        <motion.div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  }

  // Container variants for stagger animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors mb-8"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Works</span>
        </motion.button>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Poster Gallery
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Explore our creative poster designs and visual artwork
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {posters.map((poster, index) => (
          <PosterCard key={poster.id} poster={poster} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

interface PosterCardProps {
  poster: Poster;
  index: number;
}

const PosterCard: React.FC<PosterCardProps> = ({ poster, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const toggleDetails = () => setDetailsOpen((prev) => !prev);

  // Card variants for entrance animation
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75],
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden">
        {!imageLoaded && (
          <motion.div 
            className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="text-gray-400"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Loading...
            </motion.div>
          </motion.div>
        )}

        {imageError ? (
          <motion.div 
            className="absolute inset-0 bg-gray-100 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-gray-400 text-center p-4">
              <motion.div 
                className="text-2xl mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🖼️
              </motion.div>
              <div>Image not found</div>
            </div>
          </motion.div>
        ) : (
          <motion.img
            src={poster.imageUrl}
            alt={poster.title}
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: imageLoaded ? 1 : 0,
              scale: imageLoaded ? 1 : 1.1
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            draggable={false}
            whileHover={{ scale: 1.05 }}
          />
        )}

        {/* Toggle Details Button */}
        <motion.button
          onClick={toggleDetails}
          aria-label={detailsOpen ? 'Hide details' : 'Show details'}
          className="absolute bottom-4 left-4 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "#f3f4f6",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ transition: "none" }}
        >
          <motion.div
            animate={{ rotate: detailsOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {detailsOpen ? (
              <ChevronDown size={20} className="text-gray-700" />
            ) : (
              <ChevronRight size={20} className="text-gray-700" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Details Drawer */}
      <motion.div
        initial={false}
        animate={{
          height: detailsOpen ? 'auto' : 0,
          opacity: detailsOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        style={{
          pointerEvents: detailsOpen ? 'auto' : 'none',
        }}
      >
        <div className="px-6 py-4 select-text mx-auto max-w-[90%]">
          <h3 className="text-gray-900 text-lg font-semibold mb-2">
            {poster.title}
          </h3>

          <div className="flex items-center space-x-2 text-gray-800 text-sm mb-2">
            <User size={16} />
            <span>Created by: {poster.creator}</span>
          </div>

          <div className="text-gray-700 text-xs">
            ID: {poster.id}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Posters;