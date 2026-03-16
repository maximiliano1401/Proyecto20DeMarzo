import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { useQuiz } from './hooks/useQuiz';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizForm } from './components/QuizForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ResultsPage } from './components/ResultsPage';
import { questions } from './data/questions';

function App() {
  const [errorDismissed, setErrorDismissed] = useState(false);

  const {
    step, current, profile, result, error,
    totalQuestions, progress, currentQuestion, currentAnswer,
    startQuiz, answer, goNext, goPrev, submit, restart,
    setProfile,
  } = useQuiz();

  const isLast = current === questions.length - 1;

  const handleSubmit = () => {
    if (currentAnswer) {
      const updatedProfile = {
        ...profile,
        answers: [
          ...profile.answers.filter(a => a.questionId !== currentQuestion.id),
          currentAnswer,
        ],
      };
      setProfile(updatedProfile);
      submit(updatedProfile);
    }
  };

  const showError = error && !errorDismissed;

  return (
    <div className="font-sans">
      {/* Global error banner */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4"
          >
            <div className="bg-red-900/90 backdrop-blur-sm border border-red-500/60 rounded-2xl p-4 flex items-start gap-3 shadow-xl">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Error al analizar el perfil</p>
                <p className="text-white/70 text-xs mt-0.5">{error}</p>
              </div>
              <button
                onClick={() => setErrorDismissed(true)}
                className="text-white/40 hover:text-white transition flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screens */}
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WelcomeScreen onStart={startQuiz} />
          </motion.div>
        )}

        {step === 'form' && currentQuestion && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuizForm
              question={currentQuestion}
              questionIndex={current}
              totalQuestions={totalQuestions}
              progress={progress}
              currentAnswer={currentAnswer}
              onAnswer={answer}
              onNext={goNext}
              onPrev={goPrev}
              onSubmit={handleSubmit}
              isLast={isLast}
            />
          </motion.div>
        )}

        {step === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingScreen />
          </motion.div>
        )}

        {step === 'results' && result && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsPage profile={profile} result={result} onRestart={restart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
