import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleCartClick = () => {
    setShowCartMessage(true);
    setTimeout(() => {
      setShowCartMessage(false);
      navigate('/my-profile');
    }, 2000);
  };

  const menuItems = [
    { path: '/', label: 'Works' },
    { path: '/freelancers', label: 'Freelancers' },
    { path: '/customers', label: 'Customers' },
    { path: '/about', label: 'About' },
    { path: '/my-profile', label: 'Connect' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-white shadow-md' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavLink to="/">
            <Logo />
          </NavLink>
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-link text-sm uppercase tracking-wider ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="relative">
            <button onClick={handleCartClick} className="relative">
              <ShoppingCart size={20} className="animate-pulse" />
              {cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </button>
            {showCartMessage && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-black text-white rounded-lg whitespace-nowrap z-50">
                Clicking 'Add to Cart'? That's cute. Let's talk real business.
              </div>
            )}
          </div>
        </nav>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} className="animate-pulse" /> : <Menu size={24} className="animate-pulse" />}
        </button>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 bg-white z-40 pt-20"
          >
            <nav className="flex flex-col items-center space-y-8 p-8">
              {menuItems.map(item => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-xl uppercase tracking-wider p-4 rounded-lg transition-colors ${
                        isActive ? 'bg-black text-white' : 'hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="relative">
                <button onClick={handleCartClick} className="relative">
                  <ShoppingCart size={24} className="animate-pulse" />
                  {cart.length > 0 && (
                    <span className="cart-badge">{cart.length}</span>
                  )}
                </button>
                {showCartMessage && (
                  <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-3 bg-black text-white rounded-lg text-center z-50">
                    Clicking 'Add to Cart'? That's cute. Let's talk real business.
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;