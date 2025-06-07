import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="bg-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            © 2025 1profile • All Rights Reserved •{' '}
            <button
              onClick={() => setShowTerms(true)}
              className="text-black hover:underline"
            >
              Terms & Conditions
            </button>{' '}
            •{' '}
            <button
              onClick={() => setShowPrivacy(true)}
              className="text-black hover:underline"
            >
              Privacy Policy
            </button>
          </p>
        </div>
      </div>

      {showTerms && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTerms(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">Terms & Conditions</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
                <p>By using 1profile for freelance services, you agree to these terms and conditions.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">2. Service Role</h3>
                <p>We act as a connector between clients and freelance professionals, helping match your project needs with suitable freelancers.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">3. Payment Terms</h3>
                <p>All payment terms will be discussed and confirmed before project initiation.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">4. Quality Assurance</h3>
                <p>We carefully vet all freelancers but cannot guarantee specific outcomes.</p>
              </section>
            </div>

            <button
              onClick={() => setShowTerms(false)}
              className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {showPrivacy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPrivacy(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-8 max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
            
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-2">1. Information Collection</h3>
                <p>We collect only essential information needed to provide our services.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">2. Data Usage</h3>
                <p>Your information is used solely for project coordination and communication.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-2">3. Security</h3>
                <p>We implement industry-standard security measures to protect your data.</p>
              </section>
            </div>

            <button
              onClick={() => setShowPrivacy(false)}
              className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </footer>
  );
};

export default Footer;