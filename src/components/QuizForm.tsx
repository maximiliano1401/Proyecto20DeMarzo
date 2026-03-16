import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import type { Question, UserAnswer } from '../types';

interface Props {
  question:       Question;
  questionIndex:  number;
  totalQuestions: number;
  progress:       number;
  currentAnswer:  UserAnswer | undefined;
  onAnswer:       (ans: UserAnswer) => void;
  onNext:         () => void;
  onPrev:         () => void;
  onSubmit:       () => void;
  isLast:         boolean;
}

const OPTION_STYLES = [
  'from-brand-600/20 to-brand-800/20 border-brand-500/40 hover:border-brand-400/70',
  'from-violet-600/20 to-violet-800/20 border-violet-500/40 hover:border-violet-400/70',
  'from-sky-600/20 to-sky-800/20 border-sky-500/40 hover:border-sky-400/70',
  'from-emerald-600/20 to-emerald-800/20 border-emerald-500/40 hover:border-emerald-400/70',
];

const OPTION_SELECTED = [
  'from-brand-600/50 to-brand-700/50 border-brand-400 ring-2 ring-brand-500/50',
  'from-violet-600/50 to-violet-700/50 border-violet-400 ring-2 ring-violet-500/50',
  'from-sky-600/50 to-sky-700/50 border-sky-400 ring-2 ring-sky-500/50',
  'from-emerald-600/50 to-emerald-700/50 border-emerald-400 ring-2 ring-emerald-500/50',
];

export function QuizForm({
  question, questionIndex, totalQuestions, progress,
  currentAnswer, onAnswer, onNext, onPrev, onSubmit, isLast,
}: Props) {
  const selected = currentAnswer?.optionId;

  const handleOption = (optionId: string, style: UserAnswer['style']) => {
    onAnswer({ questionId: question.id, optionId, style });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-brand-600/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-violet-600/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:24px_24px] opacity-[0.08] pointer-events-none" />

      <div className="w-full max-w-3xl z-10">
        {/* Progress header */}
        <div className="mb-7 panel-surface panel-outline rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/60 text-sm font-medium">
              {question.category}
            </span>
            <span className="text-white/60 text-sm font-medium">
              {questionIndex + 1} / {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-white/12 rounded-full h-2.5 overflow-hidden ring-1 ring-white/10">
            <motion.div
              className="h-2.5 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-white/40 text-xs">{progress}% completado</span>
            <span className="text-white/40 text-xs">{totalQuestions - questionIndex - 1} restantes</span>
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="panel-surface panel-outline rounded-3xl p-5 sm:p-8 mb-6">
              {/* Question */}
              <div className="flex items-start gap-4 mb-7">
                <span className="text-4xl leading-none flex-shrink-0 drop-shadow-[0_8px_20px_rgba(76,110,245,0.28)]">{question.emoji}</span>
                <h2 className="font-display text-xl sm:text-2xl lg:text-[1.72rem] font-semibold text-white leading-snug tracking-tight">
                  {question.text}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((opt, idx) => {
                  const isSelected = selected === opt.id;
                  return (
                    <motion.button
                      key={opt.id}
                      onClick={() => handleOption(opt.id, opt.style)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`
                        w-full flex items-center gap-4 p-4 rounded-2xl border bg-gradient-to-r
                        text-left transition-all duration-200 group panel-outline
                        ${isSelected ? OPTION_SELECTED[idx] : OPTION_STYLES[idx]}
                      `}
                    >
                      <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
                      <span className={`text-sm sm:text-base font-medium leading-snug transition-colors
                        ${isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                        {opt.label}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto flex-shrink-0 w-6 h-6 rounded-full bg-white/20 ring-1 ring-white/30 flex items-center justify-center"
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-3 items-center">
              <button
                onClick={onPrev}
                disabled={questionIndex === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 text-white/65 hover:text-white hover:border-white/40 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>

              <div className="flex-1" />

              {isLast ? (
                <motion.button
                  onClick={onSubmit}
                  disabled={!selected}
                  whileHover={{ scale: selected ? 1.02 : 1 }}
                  whileTap={{ scale: selected ? 0.98 : 1 }}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold shadow-[0_14px_32px_rgba(43,78,201,0.45)] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Analizar Perfil
                </motion.button>
              ) : (
                <button
                  onClick={onNext}
                  disabled={!selected}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-500 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-semibold shadow-[0_14px_32px_rgba(43,78,201,0.45)] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
