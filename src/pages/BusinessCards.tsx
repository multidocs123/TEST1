import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BusinessCard, loadBusinessCards } from '../data/businessCards';

const BusinessCards: React.FC = () => {
  const [businessCards, setBusinessCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinessCards = async () => {
      const data = await loadBusinessCards();
      setBusinessCards(data);
      setLoading(false);
    };
    fetchBusinessCards();
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
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Business Cards</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center">
          Explore our business card designs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {businessCards.map((card) => (
          <BusinessCardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

interface BusinessCardItemProps {
  card: BusinessCard;
}

const BusinessCardItem: React.FC<BusinessCardItemProps> = ({ card }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative aspect-square rounded-lg overflow-hidden shadow-lg group"
    >
      <img
        src={card.imageUrl}
        alt={card.title}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-white text-lg font-semibold mb-2">{card.title}</h3>
        <p className="text-white/90 text-sm mb-2">Created by: {card.creator}</p>
        <div className="flex items-center space-x-4">
          <div className="text-white/70 text-sm">ID: {card.id}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessCards;