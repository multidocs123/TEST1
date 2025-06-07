import { createClient } from '@supabase/supabase-js';

export interface Work {
  id: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  mediaUrl: string[];
  aspectRatio: '16:9' | '9:16' | '1:1';
  code: string;
  createdBy: string;
}

export const workCategories = [
  'Instagram Reels',
  'YouTube Shorts',
  'Posters',
  'Logos',
  'Thumbnails',
  'Business Cards',
  'Brochures',
  'Websites'
];

// Function to scan directory for media files
const scanDirectory = async (path: string): Promise<string[]> => {
  try {
    // In production, this would fetch from your backend/storage
    // For now, return sample data
    return [path + '/1.mp4', path + '/2.mp4', path + '/3.mp4'];
  } catch (error) {
    console.error('Error scanning directory:', error);
    return [];
  }
};

export const getWorks = async (): Promise<Work[]> => {
  const works: Work[] = [];
  let id = 1;

  // Scan for Instagram Reels
  const reelFiles = await scanDirectory('/videos/instagram-reels');
  reelFiles.forEach(file => {
    works.push({
      id: String(id++),
      title: `Instagram Reel ${works.length + 1}`,
      category: 'Instagram Reels',
      type: 'video',
      mediaUrl: [file],
      aspectRatio: '9:16',
      code: `IR${String(works.length + 1).padStart(3, '0')}`,
      createdBy: 'Hari Rishidar'
    });
  });

  // Scan for YouTube Shorts
  const shortFiles = await scanDirectory('/videos/youtube-shorts');
  shortFiles.forEach(file => {
    works.push({
      id: String(id++),
      title: `YouTube Short ${works.length + 1}`,
      category: 'YouTube Shorts',
      type: 'video',
      mediaUrl: [file],
      aspectRatio: '9:16',
      code: `YS${String(works.length + 1).padStart(3, '0')}`,
      createdBy: 'Hari Rishidar'
    });
  });

  // Add similar scanning for other categories
  const categories = ['posters', 'logos', 'thumbnails', 'business-cards', 'brochures', 'websites'];
  for (const category of categories) {
    const files = await scanDirectory(`/images/${category}`);
    files.forEach(file => {
      works.push({
        id: String(id++),
        title: `${category.charAt(0).toUpperCase() + category.slice(1)} ${works.length + 1}`,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        type: 'image',
        mediaUrl: [file],
        aspectRatio: category === 'websites' ? '16:9' : '1:1',
        code: `${category.charAt(0).toUpperCase()}${String(works.length + 1).padStart(3, '0')}`,
        createdBy: 'Hari Rishidar'
      });
    });
  }

  return works;
};