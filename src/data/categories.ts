import { Code, Palette, FileText, Users, Video } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
  image: string;
}

// Function to get freelancer count from localStorage
const getFreelancerCount = (category: string): number => {
  try {
    const count = localStorage.getItem(`freelancer_count_${category}`);
    return count ? parseInt(count) : 0;
  } catch {
    return 0;
  }
};

// Function to update freelancer count
export const updateFreelancerCount = (category: string, count: number) => {
  try {
    localStorage.setItem(`freelancer_count_${category}`, count.toString());
  } catch (error) {
    console.error('Error updating freelancer count:', error);
  }
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'Video Editor',
    count: getFreelancerCount('video_editors'),
    icon: 'video',
    image: 'https://images.pexels.com/photos/2773498/pexels-photo-2773498.jpeg'
  },
  {
    id: '2',
    name: 'Graphic Designer',
    count: getFreelancerCount('graphic_designers'),
    icon: 'palette',
    image: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg'
  },
  {
    id: '3',
    name: 'Web Developer',
    count: getFreelancerCount('web_developers'),
    icon: 'code',
    image: 'https://images.pexels.com/photos/614117/pexels-photo-614117.jpeg'
  },
  {
    id: '4',
    name: 'Content Creator',
    count: getFreelancerCount('content_creators'),
    icon: 'file-text',
    image: 'https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg'
  },
  {
    id: '5',
    name: 'Human Resource Manager',
    count: getFreelancerCount('hr_managers'),
    icon: 'users',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
  }
];