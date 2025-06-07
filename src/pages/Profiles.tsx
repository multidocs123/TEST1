import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Video, FileText, Users, ArrowDown, Upload, ThumbsUp, Info } from 'lucide-react';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';

const Freelancers: React.FC = () => {
  const [minBudget, setMinBudget] = useState<string>('200');
  const [maxBudget, setMaxBudget] = useState<string>('200000');
  const [requirements, setRequirements] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const { cart, addToCart } = useCart();

  const handleBudgetChange = (value: string, type: 'min' | 'max') => {
    const numValue = parseInt(value);
    if (type === 'min') {
      setMinBudget(value);
      if (numValue < 200) {
        setBudgetError('Minimum budget should be at least ₹200');
      } else if (numValue > parseInt(maxBudget)) {
        setBudgetError('Minimum budget cannot exceed maximum budget');
      } else {
        setBudgetError('');
      }
    } else {
      setMaxBudget(value);
      if (numValue > 200000) {
        setBudgetError('Maximum budget cannot exceed ₹200,000');
      } else if (numValue < parseInt(minBudget)) {
        setBudgetError('Maximum budget cannot be less than minimum budget');
      } else {
        setBudgetError('');
      }
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
      Array.from(event.target.files).forEach(file => {
        simulateFileUpload(file);
      });
    }
  };

  const simulateFileUpload = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({
        ...prev,
        [file.name]: progress
      }));
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const removeFile = (fileName: string) => {
    if (selectedFiles) {
      const dt = new DataTransfer();
      Array.from(selectedFiles).forEach(file => {
        if (file.name !== fileName) {
          dt.items.add(file);
        }
      });
      setSelectedFiles(dt.files);
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        delete newProgress[fileName];
        return newProgress;
      });
    }
  };

  const handleCheckout = async () => {
    const selectedItems = selectedCategories
      .map(categoryId => {
        const category = categories.find(c => c.id === categoryId);
        return category?.name;
      })
      .filter(Boolean)
      .join('\n');

    const formData = new FormData();
    if (selectedFiles) {
      Array.from(selectedFiles).forEach(file => {
        formData.append('files[]', file);
      });
    }

    const message = `Hi Rishidar,\n\nI'd like to work with:\n${selectedItems}\n\nBudget Range: ₹${minBudget} - ₹${maxBudget}\n\nTimeline:\nStart: ${startDate}\nEnd: ${endDate}\n\nRequirements:\n${requirements}`;

    // Create a blob from the message
    const messageBlob = new Blob([message], { type: 'text/plain' });
    formData.append('message', messageBlob, 'message.txt');

    // Convert FormData to base64 strings
    const files: { name: string; data: string }[] = [];
    if (selectedFiles) {
      for (const file of Array.from(selectedFiles)) {
        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              files.push({
                name: file.name,
                data: reader.result.split(',')[1] // Remove data URL prefix
              });
            }
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
    }

    // Construct WhatsApp URL with files
    const whatsappMessage = encodeURIComponent(message);
    const fileAttachments = files.map(file => {
      return `&attached_file=${encodeURIComponent(file.name)}&file_data=${encodeURIComponent(file.data)}`;
    }).join('');

    window.open(`https://wa.me/6381865341?text=${whatsappMessage}${fileAttachments}`, '_blank');
  };

  const allFilesUploaded = Object.values(uploadProgress).every(progress => progress === 100);

  return (
    <div className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Create what you think</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with industry-leading professionals who bring your vision to life.
        </p>
      </motion.div>

      {/* Step 1: Select Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Step 1: Select your requirement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer relative ${
                selectedCategories.includes(category.id) ? 'ring-2 ring-white' : ''
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              {selectedCategories.includes(category.id) && (
                <>
                  <motion.div
                    className="absolute inset-0 border-4 border-white pointer-events-none"
                    animate={{
                      background: ['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0)'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 z-10"
                  >
                    <ThumbsUp size={20} className="text-black animate-pulse" />
                  </motion.div>
                </>
              )}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="text-white"
                  >
                    {category.icon === 'video' && <Video size={40} className="animate-pulse" />}
                    {category.icon === 'palette' && <Palette size={40} className="animate-pulse" />}
                    {category.icon === 'code' && <Code size={40} className="animate-pulse" />}
                    {category.icon === 'file-text' && <FileText size={40} className="animate-pulse" />}
                    {category.icon === 'users' && <Users size={40} className="animate-pulse" />}
                  </motion.div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-center">{category.name}</h3>
                <p className="text-sm text-gray-500 text-center mt-2">{category.count} Freelancers Available</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center my-8">
        <ArrowDown size={32} className="text-black animate-bounce" />
      </div>

      {/* Step 2: Project Details */}
      <div className="max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Step 2: Fill Project Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range (in ₹)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="number"
                  value={minBudget}
                  onChange={(e) => handleBudgetChange(e.target.value, 'min')}
                  className="w-full p-2 pl-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  min="200"
                  max="200000"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  Min: ₹
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={maxBudget}
                  onChange={(e) => handleBudgetChange(e.target.value, 'max')}
                  className="w-full p-2 pl-16 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  min="200"
                  max="200000"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  Max: ₹
                </span>
              </div>
            </div>
            {budgetError && (
              <p className="text-red-500 text-sm mt-2">{budgetError}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Timeline
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Requirements
            </label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Describe your project requirements, timeline, and any specific skills needed..."
              className="w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload reference images or videos to better explain your project
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="flex flex-col items-center">
                <Upload size={24} className="text-gray-400 mb-2 animate-pulse" />
                <p className="text-sm text-gray-500 mb-4">Drag and drop files here, or click to select files</p>
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Select Files
                </label>
              </div>
              {selectedFiles && Array.from(selectedFiles).length > 0 && (
                <div className="mt-4 space-y-2">
                  {Array.from(selectedFiles).map((file, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(file.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-black h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress[file.name] || 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {uploadProgress[file.name] === 100 ? 'Upload Complete' : 'Uploading...'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-8">
        <ArrowDown size={32} className="text-black animate-bounce" />
      </div>

      {/* Step 3: Checkout */}
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Step 3: Proceed to Checkout</h2>
        <button
          onClick={handleCheckout}
          disabled={selectedCategories.length === 0 || !allFilesUploaded}
          className={`w-full bg-black text-white py-4 rounded-lg transition-colors ${
            selectedCategories.length === 0 || !allFilesUploaded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
          }`}
        >
          {selectedCategories.length === 0 
            ? 'Select at least one category' 
            : !allFilesUploaded 
              ? 'Waiting for uploads to complete...' 
              : 'Proceed to Checkout'}
        </button>
      </div>
    </div>
  );
};

export default Freelancers;