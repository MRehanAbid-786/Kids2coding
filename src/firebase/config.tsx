import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Replace with YOUR actual Firebase config from console
const firebaseConfig = {
  apiKey: "AIzaSyABC123...", // Your actual API key
  authDomain: "kids2coding-12345.firebaseapp.com",
  projectId: "kids2coding-12345",
  storageBucket: "kids2coding-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456",
  // databaseURL is NOT needed for Firestore
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore Database
export const storage = getStorage(app);

// Firestore Collection References
export const Collections = {
  USERS: 'users',
  COURSES: 'courses',
  LESSONS: 'lessons',
  PROGRESS: 'progress',
  QUIZ_RESULTS: 'quizResults',
  BADGES: 'badges',
  PROJECTS: 'projects',
  CHALLENGES: 'challenges',
  DAILY_CHALLENGES: 'dailyChallenges',
  LEADERBOARD: 'leaderboard',
  ACHIEVEMENTS: 'achievements',
  MESSAGES: 'messages', // For AI Buddy chat
};