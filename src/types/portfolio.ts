export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  features: string[];
  isSample: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'core' | 'framework' | 'tools';
  status: 'Mastered' | 'Actively Learning';
  description: string;
  iconName: string;
  color: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
