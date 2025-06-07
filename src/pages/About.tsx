import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Shield, Heart, Target, Zap, Coffee } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connecting visionaries with exceptional talent to create remarkable outcomes.
        </p>
      </motion.div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
          className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center md:items-start transition-colors duration-300"
        >
          <Target size={40} className="mb-4 transition-colors duration-300" />
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="transition-colors duration-300">
            To revolutionize the freelance ecosystem by creating meaningful connections between talented professionals and innovative projects, ensuring exceptional outcomes for every collaboration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
          className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center md:items-start transition-colors duration-300"
        >
          <Heart size={40} className="mb-4 transition-colors duration-300" />
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="transition-colors duration-300">
            To be the premier platform where creativity meets opportunity, fostering a global community of passionate professionals who turn ideas into reality.
          </p>
        </motion.div>
      </div>

      {/* Core Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
            className="bg-white p-6 rounded-lg shadow-lg text-center transition-colors duration-300"
          >
            <Shield size={32} className="mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-xl font-semibold mb-2">Trust & Integrity</h3>
            <p className="transition-colors duration-300">Building relationships based on honesty and transparency.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
            className="bg-white p-6 rounded-lg shadow-lg text-center transition-colors duration-300"
          >
            <Award size={32} className="mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p className="transition-colors duration-300">Delivering outstanding results in every project.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
            className="bg-white p-6 rounded-lg shadow-lg text-center transition-colors duration-300"
          >
            <Zap size={32} className="mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="transition-colors duration-300">Embracing creativity and forward-thinking solutions.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
            className="bg-white p-6 rounded-lg shadow-lg text-center transition-colors duration-300"
          >
            <Coffee size={32} className="mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-xl font-semibold mb-2">Dedication</h3>
            <p className="transition-colors duration-300">Committed to your success, every step of the way.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Why Choose Us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
            className="bg-white p-6 rounded-lg shadow-lg transition-colors duration-300"
          >
            <Users size={32} className="mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-xl font-semibold mb-2">Expert Network</h3>
            <p className="transition-colors duration-300">Access to a curated network of skilled professionals across various domains.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
            className="bg-white p-6 rounded-lg shadow-lg transition-colors duration-300"
          >
            <Clock size={32} className="mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
            <p className="transition-colors duration-300">Fast response times and efficient project completion.</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, backgroundColor: 'black', color: 'white' }}
            className="bg-white p-6 rounded-lg shadow-lg transition-colors duration-300"
          >
            <Shield size={32} className="mx-auto mb-4 transition-colors duration-300" />
            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
            <p className="transition-colors duration-300">Rigorous vetting process ensures top-tier talent for your projects.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;