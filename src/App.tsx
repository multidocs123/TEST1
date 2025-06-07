import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Works from './pages/Works';
import Freelancers from './pages/Profiles';
import About from './pages/About';
import Customers from './pages/Customers';
import MyProfile from './pages/MyProfile';
import CursorFollower from './components/CursorFollower';
import Preloader from './components/Preloader';
import Reels from './pages/Reels';
import Shorts from './pages/Shorts';
import BusinessCards from './pages/BusinessCards';
import Brochures from './pages/Brochures';
import Websites from './pages/Websites';
import Logos from './pages/Logos';
import Posters from './pages/Posters';


function App() {
  const location = useLocation();
  const [showCursor, setShowCursor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowCursor(window.innerWidth > 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      {showCursor && <CursorFollower />}
      <div className="min-h-screen bg-white text-black flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Works />} />
              <Route path="/freelancers" element={<Freelancers />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/about" element={<About />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/shorts" element={<Shorts />} />
              <Route path="/business-cards" element={<BusinessCards />} />
              <Route path="/brochures" element={<Brochures />} />
              <Route path="/websites" element={<Websites />} />
              <Route path="/logos" element={<Logos />} />
              <Route path="/posters" element={<Posters />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;