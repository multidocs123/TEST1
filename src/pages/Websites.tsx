import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowLeft, ChevronRight, ExternalLink, User, Hash, X } from 'lucide-react';
import { Website, loadWebsites } from '../data/websites';
import { useNavigate } from 'react-router-dom';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, title, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* Image */}
            <motion.img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            />

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 left-4 right-4 text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-white font-medium">
                {title}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Websites: React.FC = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState<{url: string, title: string} | null>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for header
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    const fetchWebsites = async () => {
      const data = await loadWebsites();
      setWebsites(data);
      setLoading(false);
    };
    fetchWebsites();
  }, []);

  const openImageModal = (imageUrl: string, title: string) => {
    setModalImage({ url: imageUrl, title });
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

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
          Website Gallery
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-600 max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Explore our creative website designs and web development projects
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {websites.map((website, index) => (
          <WebsiteCard 
            key={website.id} 
            website={website} 
            index={index}
            onImageClick={openImageModal}
          />
        ))}
      </motion.div>

      {/* Image Modal */}
      <ImageModal
        isOpen={!!modalImage}
        imageUrl={modalImage?.url || ''}
        title={modalImage?.title || ''}
        onClose={closeImageModal}
      />
    </div>
  );
};

interface WebsiteCardProps {
  website: Website;
  index: number;
  onImageClick: (imageUrl: string, title: string) => void;
}

const WebsiteCard: React.FC<WebsiteCardProps> = ({ website, index, onImageClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const toggleDrawer = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDrawerOpen(prev => !prev);
  };

  const handleImageClick = (imageUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onImageClick(imageUrl, website.title);
  };

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
      className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col"
    >
      {/* 4-Image Grid Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="grid grid-cols-3 gap-1 h-full">
          {/* Large Image - Left Side (spans 2 columns) */}
          <motion.div 
            className="col-span-2 relative cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => handleImageClick(website.image1, e)}
          >
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
                    🌐
                  </motion.div>
                  <div>Image not found</div>
                </div>
              </motion.div>
            ) : (
              <motion.img
                src={website.image1}
                alt={website.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: imageLoaded ? 1 : 0,
                  scale: imageLoaded ? 1 : 1.1
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onLoad={handleImageLoad}
                onError={handleImageError}
                draggable={false}
              />
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Click to view
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - 3 Small Images Stacked */}
          <div className="flex flex-col gap-1">
            {/* Small Image 2 */}
            <motion.div 
              className="flex-1 relative bg-gray-100 cursor-pointer group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => handleImageClick(website.image2, e)}
            >
              <img
                src={website.image2}
                alt={`${website.title} - Preview 2`}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>

            {/* Small Image 3 */}
            <motion.div 
              className="flex-1 relative bg-gray-100 cursor-pointer group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => handleImageClick(website.image3, e)}
            >
              <img
                src={website.image3}
                alt={`${website.title} - Preview 3`}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>

            {/* Small Image 4 */}
            <motion.div 
              className="flex-1 relative bg-gray-100 cursor-pointer group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => handleImageClick(website.image4, e)}
            >
              <img
                src={website.image4}
                alt={`${website.title} - Preview 4`}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          </div>
        </div>
        
        {/* Arrow Button - Bottom Left */}
        <motion.button
          onClick={toggleDrawer}
          className="absolute bottom-3 left-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
          whileHover={{ 
            scale: 1.1,
            backgroundColor: "#f3f4f6",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          aria-label={isDrawerOpen ? 'Close details' : 'Open details'}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ transition: "none" }}
        >
          <motion.div
            animate={{ rotate: isDrawerOpen ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronRight 
              size={16} 
              className="text-gray-700"
            />
          </motion.div>
        </motion.button>
      </div>
      
      {/* Sliding Drawer */}
      <AnimatePresence mode="wait" initial={false}>
        {isDrawerOpen && (
          <motion.div
            key={`drawer-${website.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="p-6 space-y-4">
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                {website.title}
              </h3>
              
              {/* Creator */}
              <div className="flex items-center space-x-2 text-gray-600">
                <User size={16} />
                <span className="text-sm">Created by: {website.creator}</span>
              </div>
              
              {/* ID */}
              <div className="flex items-center space-x-2 text-gray-500">
                <Hash size={16} />
                <span className="text-sm">ID: {website.id}</span>
              </div>

              {/* Website Link */}
              {website.link && (
                <motion.div 
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ExternalLink size={16} />
                  <a 
                    href={website.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm hover:underline break-all"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Check website: {website.link}
                  </a>
                </motion.div>
              )}
              
              {/* Created At */}
              {website.createdAt && (
                <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
                  Created: {website.createdAt}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Websites;