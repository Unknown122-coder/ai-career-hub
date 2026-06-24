/**
 * Application-wide constants
 */

export const APP_NAME = 'AI Career Hub';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/',
  RESUME: '/resume',
  JOBS: '/jobs',
  INTERVIEW: '/interview',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const KANBAN_COLUMNS = [
  { id: 'wishlist', title: 'Wishlist', color: 'wishlist' },
  { id: 'applied', title: 'Applied', color: 'applied' },
  { id: 'oa', title: 'Online Assessment', color: 'oa' },
  { id: 'interview', title: 'Interview', color: 'interview' },
  { id: 'offer', title: 'Offer', color: 'offer' },
  { id: 'rejected', title: 'Rejected', color: 'rejected' },
];

export const INTERVIEW_TOPICS = [
  { id: 'dsa', name: 'Data Structures & Algorithms', icon: '🧮' },
  { id: 'system-design', name: 'System Design', icon: '🏗️' },
  { id: 'frontend', name: 'Frontend Development', icon: '🎨' },
  { id: 'behavioral', name: 'Behavioral Questions', icon: '🗣️' },
  { id: 'react', name: 'React & Hooks', icon: '⚛️' },
  { id: 'javascript', name: 'JavaScript Concepts', icon: '📜' },
  { id: 'css', name: 'CSS & Layouts', icon: '🎯' },
  { id: 'general', name: 'General CS', icon: '💻' },
];

export const SUGGESTED_QUESTIONS = [
  'Explain closures in JavaScript',
  'What is the virtual DOM?',
  'Explain React hooks lifecycle',
  'What is event delegation?',
  'Describe CSS specificity',
  'How does async/await work?',
];

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['.pdf', '.doc', '.docx'],
  ACCEPTED_MIMES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};
