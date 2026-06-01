export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export interface ContactFormErrors {
  name?: string;
  phone?: string;
  email?: string;
  comment?: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageGradient: string;
  tag: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface AiAssistResponse {
  message: string;
}

export interface ApiError {
  error: string;
  details?: string;
}
