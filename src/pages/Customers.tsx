import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Shield, Clock, Award, Users, ArrowDown } from 'lucide-react';

const Customers: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-32 mt-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Exciting collaborations in progress</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          You could be next!
        </p>
      </motion.div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-sm text-gray-600">{review.company}</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current animate-pulse" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">{review.content}</p>
            <p className="text-sm text-gray-500">{review.date}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center px-4"
        >
          <p className="text-lg text-gray-600 mb-4">Have questions? Check out our FAQ section below</p>
          <ArrowDown size={32} className="text-black animate-bounce" />
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">What if I'm not happy with the freelancer?</h3>
            <p className="text-gray-700">We'll step in, sort things out, or suggest better options.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">How fast can I get someone?</h3>
            <p className="text-gray-700">Usually within 1–3 days, based on your needs.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Are the freelancers verified?</h3>
            <p className="text-gray-700">Yes. We only suggest people we've personally reviewed.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Will I get updates during the project?</h3>
            <p className="text-gray-700">Yes, we stay in touch and keep you posted.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Can you handle custom project needs?</h3>
            <p className="text-gray-700">Definitely. Just share the idea — we'll build the right team.</p>
          </div>
        </div>
      </motion.div>

      {/* Guarantees */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
          <Shield size={40} className="mb-4 text-black animate-pulse" />
          <h3 className="text-xl font-semibold mb-2">Delivery Assurance</h3>
          <p className="text-gray-700">If the freelancer fails to deliver, we step in personally to fix it.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
          <Clock size={40} className="mb-4 text-black animate-pulse" />
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-700">Get assistance whenever you need it.</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
          <Award size={40} className="mb-4 text-black animate-pulse" />
          <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
          <p className="text-gray-700">Only pre-vetted, professional freelancers.</p>
        </div>
      </motion.div>
    </div>
  );
};

const reviews = [
  {
    name: "Sarah Johnson",
    company: "Tech Innovators Ltd",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    content: "Working with the team was a game-changer. They connected us with exactly the talent we needed.",
    date: "March 2024"
  },
  {
    name: "Michael Chen",
    company: "Design Studio Co",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    content: "The freelancer selection process was smooth and the results exceeded our expectations.",
    date: "February 2024"
  },
  {
    name: "Emma Rodriguez",
    company: "Creative Solutions",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    content: "Incredible attention to detail and amazing support throughout the project.",
    date: "January 2024"
  }
];

export default Customers;