import { useState, useCallback } from 'react';
import type { AppStep, UserAnswer, UserProfile, LearningProfile } from '../types';
import { questions } from '../data/questions';
import { analyzeProfile } from '../services/openai';

export function useQuiz() {
  const [step,    setStep]    = useState<AppStep>('welcome');
  const [current, setCurrent] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({ name: '', answers: [] });
  const [result,  setResult]  = useState<LearningProfile | null>(null);
  const [error,   setError]   = useState<string | null>(null);

  const totalQuestions = questions.length;
  const progress       = Math.round((current / totalQuestions) * 100);

  // ─── Welcome → Form ───────────────────────────────────────────────────────
  const startQuiz = useCallback((name: string, age: string, goal: string) => {
    setProfile({ name, age, goal, answers: [] });
    setCurrent(0);
    setStep('form');
    setError(null);
  }, []);

  // ─── Answer a question ────────────────────────────────────────────────────
  const answer = useCallback((ans: UserAnswer) => {
    setProfile(prev => {
      const answers = prev.answers.filter(a => a.questionId !== ans.questionId);
      return { ...prev, answers: [...answers, ans] };
    });
  }, []);

  // ─── Navigate ─────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (current < totalQuestions - 1) setCurrent(c => c + 1);
  }, [current, totalQuestions]);

  const goPrev = useCallback(() => {
    if (current > 0) setCurrent(c => c - 1);
  }, [current]);

  // ─── Submit → AI ─────────────────────────────────────────────────────────
  const submit = useCallback(async (finalProfile: UserProfile) => {
    setStep('loading');
    setError(null);
    try {
      const analysis = await analyzeProfile(finalProfile);
      setResult(analysis);
      setStep('results');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Error desconocido';
      setError(msg);
      setStep('form');
    }
  }, []);

  // ─── Restart ──────────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    setStep('welcome');
    setCurrent(0);
    setProfile({ name: '', answers: [] });
    setResult(null);
    setError(null);
  }, []);

  const currentQuestion = questions[current];
  const currentAnswer   = profile.answers.find(a => a.questionId === currentQuestion?.id);

  return {
    step, current, profile, result, error,
    totalQuestions, progress, currentQuestion, currentAnswer,
    startQuiz, answer, goNext, goPrev, submit, restart,
    setProfile,
  };
}
