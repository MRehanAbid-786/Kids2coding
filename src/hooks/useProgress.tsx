import { useState, useEffect } from 'react';
import { auth, db, Collections } from '../firebase/config';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion,
  onSnapshot 
} from 'firebase/firestore';

export function useProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserId = () => {
    return auth.currentUser?.uid || 'anonymous';
  };

  useEffect(() => {
    const userId = getUserId();
    if (!userId) return;

    const progressRef = doc(db, Collections.PROGRESS, userId);
    
    const unsubscribe = onSnapshot(progressRef, (docSnap) => {
      if (docSnap.exists()) {
        setProgress(docSnap.data());
      } else {
        // Create initial progress document
        const initialProgress = {
          userId,
          enrolledCourses: [],
          completedLessons: {},
          quizScores: {},
          earnedBadges: [],
          totalXP: 0,
          streak: 0,
          lastActive: new Date(),
        };
        setDoc(progressRef, initialProgress);
        setProgress(initialProgress);
      }
      setLoading(false);
    }, (error) => {
      setError(error);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const completeLesson = async (courseId, lessonId) => {
    try {
      const userId = getUserId();
      const progressRef = doc(db, Collections.PROGRESS, userId);
      
      await updateDoc(progressRef, {
        [`completedLessons.${courseId}`]: arrayUnion(lessonId),
        lastActive: new Date(),
        totalXP: (progress?.totalXP || 0) + 10,
      });
    } catch (err) {
      console.error('Error completing lesson:', err);
    }
  };

  const saveQuizResult = async (courseId, quizId, score, totalQuestions) => {
    try {
      const userId = getUserId();
      const progressRef = doc(db, Collections.PROGRESS, userId);
      
      await updateDoc(progressRef, {
        [`quizScores.${courseId}.${quizId}`]: { score, totalQuestions, date: new Date() },
        lastActive: new Date(),
        totalXP: (progress?.totalXP || 0) + (score * 2),
      });
    } catch (err) {
      console.error('Error saving quiz result:', err);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      const userId = getUserId();
      const progressRef = doc(db, Collections.PROGRESS, userId);
      
      await updateDoc(progressRef, {
        enrolledCourses: arrayUnion(courseId),
        lastActive: new Date(),
      });
    } catch (err) {
      console.error('Error enrolling in course:', err);
    }
  };

  const earnBadge = async (badgeId) => {
    try {
      const userId = getUserId();
      const progressRef = doc(db, Collections.PROGRESS, userId);
      
      await updateDoc(progressRef, {
        earnedBadges: arrayUnion(badgeId),
        lastActive: new Date(),
        totalXP: (progress?.totalXP || 0) + 50,
      });
    } catch (err) {
      console.error('Error earning badge:', err);
    }
  };

  return {
    progress,
    loading,
    error,
    completeLesson,
    saveQuizResult,
    enrollInCourse,
    earnBadge,
  };
}