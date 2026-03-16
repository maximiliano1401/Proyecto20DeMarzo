// ─── Learning Style Types ───────────────────────────────────────────────────

export type LearningStyle = 'visual' | 'auditivo' | 'lectoescritor' | 'kinestesico';

export interface StyleScore {
  visual: number;
  auditivo: number;
  lectoescritor: number;
  kinestesico: number;
}

// ─── Question Types ──────────────────────────────────────────────────────────

export interface Option {
  id: string;
  label: string;
  style: LearningStyle;
  emoji?: string;
}

export interface Question {
  id: string;
  text: string;
  category: string;
  emoji: string;
  options: Option[];
}

// ─── User Response ───────────────────────────────────────────────────────────

export interface UserAnswer {
  questionId: string;
  optionId: string;
  style: LearningStyle;
}

export interface UserProfile {
  name: string;
  age?: string;
  goal?: string;
  answers: UserAnswer[];
}

// ─── AI Analysis Result ──────────────────────────────────────────────────────

export interface LearningProfile {
  dominantStyle: LearningStyle;
  secondaryStyle: LearningStyle;
  scores: StyleScore;
  title: string;
  summary: string;
  strengths: string[];
  challenges: string[];
  strategies: Strategy[];
  toolsRecommended: Tool[];
  studyRoutine: string;
  motivationalMessage: string;
}

export interface Strategy {
  title: string;
  description: string;
  icon: string;
}

export interface Tool {
  name: string;
  type: string;
  description: string;
  url?: string;
}

// ─── App State ───────────────────────────────────────────────────────────────

export type AppStep = 'welcome' | 'form' | 'loading' | 'results';
