import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, Linkedin, Instagram, MessageSquare, Award, Shield, Clock, Users } from 'lucide-react';
import emailjs from '@emailjs/browser';

const MyProfile: React.FC = () => {
  const [message, setMessage] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [loading, setLoading] = useState(false);

  const sendWhatsAppMessage = () => {
    const whatsappMessage = encodeURIComponent(
      `Hi Rishidar,\n\nProject Details:\n${message}`
    );
    window.open(`https://wa.me/6381865341?text=${whatsappMessage}`, '_blank');
  };

  const scheduleMeeting = async () => {
    if (!meetingDate || !meetingTime) {
      alert('Please select both date and time for the meeting');
      return;
    }

    setLoading(true);

    try {
      const templateParams = {
        to_email: 'haririshidar2004@gmail.com',
        meeting_date: meetingDate,
        meeting_time: meetingTime,
        from_name: 'Client',
        message: `Meeting requested for ${meetingDate} at ${meetingTime}`
      };

      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );

      alert('Meeting request sent successfully! We will confirm shortly.');
      setMeetingDate('');
      setMeetingTime('');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send meeting request. Please try again.');
    } finally {
      setLoading(false);
    }

    const meetingDetails = encodeURIComponent(
      `Hi Rishidar,\n\nI'd like to schedule a meeting:\nDate: ${meetingDate}\nTime: ${meetingTime}`
    );
    window.open(`https://wa.me/6381865341?text=${meetingDetails}`, '_blank');
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Vision, Our Expertise</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Connecting you with world-class talent for exceptional results.
        </p>
        <p className="text-xl font-semibold text-black bg-gray-100 p-4 rounded-lg inline-block">
          "We value honesty. If we can't meet your expectations, we won't take the project."
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Founder Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24">
            <div className="mb-8 flex flex-col items-center text-center">
              <motion.div 
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Rishidar"
                  className="w-48 h-48 rounded-full object-cover shadow-xl"
                />
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">Founder</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A passionate connector who helps businesses find the right freelance talent to bring their ideas to life. We've worked closely with skilled professionals across design, tech, content, and engineering, making sure clients get exactly what they need, without the stress.

                Our focus is simple: understand your vision, and match you with people who can deliver. We're hands-on, detail-focused, and always here to make your project run smoother.
              </p>
            </div>
            
            <div className="space-y-6 text-center">
              <div>
                <h3 className="text-xl font-bold mb-3">Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Users size={18} className="animate-pulse" />
                    <span>10+ Successful Projects</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Award size={18} className="animate-pulse" />
                    <span>Top-rated Freelancers</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield size={18} className="animate-pulse" />
                    <span>Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={18} className="animate-pulse" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Contact Information</h3>
                <div className="space-y-4">
                  <a 
                    href="mailto:haririshidar2004@gmail.com"
                    className="flex items-center justify-center gap-3 text-gray-700 hover:text-black transition-colors"
                  >
                    <Mail size={20} className="animate-pulse" />
                    haririshidar2004@gmail.com
                  </a>
                  <a 
                    href="tel:6381865341"
                    className="flex items-center justify-center gap-3 text-gray-700 hover:text-black transition-colors"
                  >
                    <Phone size={20} className="animate-pulse" />
                    +91 6381865341
                  </a>
                  <a 
                    href="https://wa.me/6381865341"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 text-gray-700 hover:text-black transition-colors"
                  >
                    <MessageSquare size={20} className="animate-pulse" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-center space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/hari-rishidar-43b863248?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <Linkedin size={20} className="animate-pulse" />
                    LinkedIn
                  </a>
                  <a 
                    href="https://www.instagram.com/therealrishi2004?igsh=MWd3cnNhM3lqdWlodA==" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
                  >
                    <Instagram size={20} className="animate-pulse" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Want to be a Freelancer Button */}
          <button
            onClick={() => window.open('https://wa.me/6381865341?text=Hi%20Rishidar,%20I%20want%20to%20join%20as%20a%20freelancer.', '_blank')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors mb-8"
          >
            <Users size={18} className="animate-pulse" />
            Want to be a Freelancer?
          </button>

          <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center md:text-left">
            <h2 className="text-2xl font-bold mb-6">Share Your Vision</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Whether you need a single expert or a full team, we're here to help you build the perfect solution.
              Let's discuss your project and find the ideal talent match.
            </p>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details
                </label>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell me about your project goals, timeline, and specific skills needed..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
                ></textarea>
              </div>
              
              <button
                onClick={sendWhatsAppMessage}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Send size={18} className="animate-pulse" />
                Get Started
              </button>
            </div>
          </div>

          {/* Book a Meeting Section */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg text-center md:text-left">
            <h2 className="text-2xl font-bold mb-6">Schedule a Consultation</h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Let's have a detailed discussion about your project requirements and how we can help you achieve your goals.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={meetingDate}
                    onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
                  />
                </div>
              </div>
              
              <button
                onClick={scheduleMeeting}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-lg transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
              >
                <MessageSquare size={18} className="animate-pulse" />
                {loading ? 'Scheduling...' : 'Schedule Meeting'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;