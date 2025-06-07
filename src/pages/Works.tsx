import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Image, FileImage, Globe,
  Search, Filter, Share2, Volume2, VolumeX, X,
  ArrowLeft, ArrowRight, Info, ExternalLink, Users,
  Maximize2, Minimize2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface CategoryCard {
  name: string;
  icon: React.ReactNode;
  image: string;
  description: string;
}

const categoryCards: CategoryCard[] = [
  {
    name: 'Instagram Reels',
    icon: <Video size={40} className="text-white animate-pulse" />,
    image: 'https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg',
    description: 'Engaging vertical video content for Instagram'
  },
  {
    name: 'YouTube Shorts',
    icon: <Video size={40} className="text-white animate-pulse" />,
    image: 'https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg',
    description: 'Vertical format videos for YouTube'
  },
  {
    name: 'Posters',
    icon: <Image size={40} className="text-white animate-pulse" />,
    image: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg',
    description: 'Eye-catching poster designs'
  },
  {
    name: 'Logos',
    icon: <FileImage size={40} className="text-white animate-pulse" />,
    image: 'https://images.pexels.com/photos/614117/pexels-photo-614117.jpeg',
    description: 'Professional logo designs'
  },
  {
    name: 'Websites',
    icon: <Globe size={40} className="text-white animate-pulse" />,
    image: 'https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg',
    description: 'Modern website designs'
  }
];

const Works: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCategoryClick = (category: string) => {
    if (category === 'Instagram Reels') {
      navigate('/reels');
    } else if (category === 'YouTube Shorts') {
      navigate('/shorts');
    } else if (category === 'Posters') {
      navigate('/posters');
    } else if (category === 'Logos') {
      navigate('/logos');
    } else if (category === 'Websites') {
      navigate('/websites');
    } 
    else {
      setSelectedCategory(category);
    }
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {selectedCategory || "Browse Our Creative Works"}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          {selectedCategory 
            ? `Explore our ${selectedCategory.toLowerCase()} collection`
            : "Select a category to view our work"}
        </p>
        <button
          onClick={() => setShowGuide(true)}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
        >
          <Info size={isMobileView ? 32 : 20} className="animate-pulse" />
          <span className={isMobileView ? "text-xl" : ""}>Guide</span>
        </button>
      </motion.div>

      <AnimatePresence>
        {showGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-8 max-w-2xl relative w-full md:w-auto"
            >
              <button
                onClick={() => setShowGuide(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X size={isMobileView ? 32 : 24} className="animate-pulse" />
              </button>

              <h2 className="text-2xl md:text-3xl font-bold mb-6">How to Use Our Platform</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FileImage size={isMobileView ? 32 : 24} className="mt-1 animate-pulse" />
                  <p className={isMobileView ? "text-xl" : ""}>Browse the files our freelancers did</p>
                </div>

                <div className="flex items-start gap-4">
                  <Users size={isMobileView ? 32 : 24} className="mt-1 animate-pulse" />
                  <p className={isMobileView ? "text-xl" : ""}>If you need freelancers, go to the Freelancers page, fill the details, and checkout</p>
                </div>

                <div className="flex items-start gap-4">
                  <FileImage size={isMobileView ? 32 : 24} className="mt-1 animate-pulse" />
                  <p className={isMobileView ? "text-xl" : ""}>If you need custom freelancing, go to the Connect page and share your requirement</p>
                </div>

                <div className="flex items-start gap-4">
                  <ExternalLink size={isMobileView ? 32 : 24} className="mt-1 animate-pulse" />
                  <p className={isMobileView ? "text-xl" : ""}>If personal, use the button below to connect instantly</p>
                </div>

                <Link
                  to="/my-profile"
                  className={`block w-full bg-black text-white py-4 rounded-lg text-center mt-8 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 ${
                    isMobileView ? "text-xl py-6" : ""
                  }`}
                >
                  <ExternalLink size={isMobileView ? 32 : 20} className="animate-pulse" />
                  Connect Instantly
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selectedCategory ? (
        <div className="flex flex-col items-center space-y-8">
          {/* First Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {categoryCards.slice(0, 3).map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ 
                  opacity: 0, 
                  y: 60,
                  scale: 0.8,
                  rotateX: -15
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group transform-gpu"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="relative h-64">
                  <motion.img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 1.2,
                      delay: index * 0.2 + 0.3,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4"
                    initial={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                    animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.2 + 0.5
                    }}
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.6,
                        delay: index * 0.2 + 0.7,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-semibold text-white mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.2 + 0.9
                      }}
                    >
                      {category.name}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-gray-200 mt-2 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.2 + 1.1
                      }}
                    >
                      {category.description}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Second Row - 2 Cards Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
            {categoryCards.slice(3, 5).map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ 
                  opacity: 0, 
                  y: 60,
                  scale: 0.8,
                  rotateX: -15
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                transition={{ 
                  duration: 0.8,
                  delay: (index + 3) * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group transform-gpu"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="relative h-64">
                  <motion.img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 1.2,
                      delay: (index + 3) * 0.2 + 0.3,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4"
                    initial={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                    animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    transition={{ 
                      duration: 0.6,
                      delay: (index + 3) * 0.2 + 0.5
                    }}
                    whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.6,
                        delay: (index + 3) * 0.2 + 0.7,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {category.icon}
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-semibold text-white mt-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: (index + 3) * 0.2 + 0.9
                      }}
                    >
                      {category.name}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-gray-200 mt-2 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: (index + 3) * 0.2 + 1.1
                      }}
                    >
                      {category.description}
                    </motion.p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
            onClick={handleBackClick}
          >
            <ArrowLeft size={20} />
            <span>Back to Categories</span>
          </motion.button>

          <div className="relative max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search works..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>

          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Category functionality coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Works;