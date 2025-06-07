export interface Freelancer {
  id: string;
  name: string;
  role: string;
  availability: 'Available' | 'In Progress' | 'Not Available' | 'Completed';
  skills: string[];
  image: string;
  bio: string;
}

export const freelancers: Freelancer[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Web Development',
    availability: 'Available',
    skills: ['React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    bio: 'Full-stack developer with 5+ years of experience building modern web applications.'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    role: 'Graphic Design',
    availability: 'In Progress',
    skills: ['Illustrator', 'Photoshop', 'Brand Identity', 'Typography'],
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    bio: 'Creative designer specializing in brand identity and print design with an eye for detail.'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: '3D Animation',
    availability: 'Available',
    skills: ['Blender', 'Cinema 4D', 'After Effects', '3D Modeling'],
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    bio: '3D artist creating stunning animations and visual effects for various media projects.'
  },
  {
    id: '4',
    name: 'Emma Rodriguez',
    role: 'Video Editing',
    availability: 'Not Available',
    skills: ['Premiere Pro', 'After Effects', 'Color Grading', 'Sound Design'],
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    bio: 'Video editor with experience in documentary, commercial, and narrative filmmaking.'
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'Art/Illustration',
    availability: 'Available',
    skills: ['Digital Painting', 'Character Design', 'Concept Art', 'Procreate'],
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    bio: 'Illustrator creating vibrant character designs and concept art for games and animation.'
  },
  {
    id: '6',
    name: 'Olivia Taylor',
    role: 'UI/UX Design',
    availability: 'In Progress',
    skills: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    bio: 'UI/UX designer focused on creating intuitive and beautiful digital experiences.'
  },
  {
    id: '7',
    name: 'James Wilson',
    role: 'Content Creation',
    availability: 'Available',
    skills: ['Copywriting', 'Social Media', 'SEO', 'Content Strategy'],
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    bio: 'Content creator specializing in engaging social media content and SEO-optimized writing.'
  },
  {
    id: '8',
    name: 'Sophia Martinez',
    role: 'T-Shirt Design',
    availability: 'Completed',
    skills: ['Illustrator', 'Typography', 'Screen Printing', 'Apparel Design'],
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    bio: 'T-shirt designer with a passion for creating wearable art and custom apparel.'
  }
];