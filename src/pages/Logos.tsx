import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, ChevronRight, ChevronDown } from 'lucide-react';
import { Logo, loadLogos } from '../data/logos';
import { useNavigate } from 'react-router-dom';

const Logos: React.FC = () => {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogos = async () => {
      const data = await loadLogos();
      setLogos(data);
      setLoading(false);
    };
    fetchLogos();
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Logo Gallery</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
          Explore our creative logo designs and brand identity work
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {logos.map((logo) => (
          <LogoCard key={logo.id} logo={logo} />
        ))}
      </div>

      {logos.length === 0 && !loading && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No logos found</p>
          <p className="text-gray-400 text-sm mt-2">
            Check the browser console for errors and ensure logos.xlsx exists in /public/data/
          </p>
        </div>
      )}
    </div>
  );
};

interface LogoCardProps {
  logo: Logo;
}

const LogoCard: React.FC<LogoCardProps> = ({ logo }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const toggleDetails = () => setDetailsOpen((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}

        {imageError ? (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 text-center p-4">
              <div className="text-2xl mb-2">🎨</div>
              <div>Logo not found</div>
            </div>
          </div>
        ) : (
          <img
            src={logo.imageUrl}
            alt={logo.title}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            draggable={false}
          />
        )}

        {/* Arrow toggle button */}
        <button
          onClick={toggleDetails}
          aria-label={detailsOpen ? 'Hide details' : 'Show details'}
          className="absolute bottom-4 left-4 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition-transform"
        >
          {detailsOpen ? (
            <ChevronDown size={20} className="text-gray-700" />
          ) : (
            <ChevronRight size={20} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Details drawer */}
      <motion.div
        initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
        animate={
          detailsOpen
            ? { height: 'auto', opacity: 1, paddingTop: 16, paddingBottom: 16 }
            : { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden select-text px-6 mx-auto max-w-[90%]"
        style={{
          pointerEvents: detailsOpen ? 'auto' : 'none',
        }}
      >
        <h3 className="text-gray-900 text-lg font-semibold mb-2">{logo.title}</h3>

        <div className="flex items-center space-x-2 text-gray-800 text-sm mb-2">
          <User size={16} />
          <span>Created by: {logo.creator}</span>
        </div>

        <div className="text-gray-700 text-xs">ID: {logo.id}</div>
      </motion.div>
    </motion.div>
  );
};

export default Logos;
