import { motion } from 'framer-motion';
import { useState } from 'react';
import { Brain, Sparkles, BookOpen, Target, ChevronRight } from 'lucide-react';

interface Props {
  onStart: (name: string, age: string, goal: string) => void;
}

const GOALS = [
  'Mejorar mis calificaciones en la escuela',
  'Aprender programación o tecnología',
  'Estudiar un idioma nuevo',
  'Preparar un examen o certificación',
  'Desarrollo personal y habilidades blandas',
  'Otro / Exploración general',
];

export function WelcomeScreen({ onStart }: Props) {
  const [name, setName] = useState('');
  const [age,  setAge]  = useState('');
  const [goal, setGoal] = useState('');
  const [touched, setTouched] = useState(false);

  const canSubmit = name.trim().length >= 2;

  const handleSubmit = () => {
    setTouched(true);
    if (!canSubmit) return;
    onStart(name.trim(), age, goal);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-brand-950 to-violet-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-2xl z-10"
      >
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 mb-6 shadow-2xl animate-float">
            <Brain className="w-10 h-10 text-white" />
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">IA Local · Llama 3.2 · 100% Gratis</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Descubre tu Perfil<br />
            <span className="bg-gradient-to-r from-brand-400 to-violet-400 bg-clip-text text-transparent">
              de Aprendizaje
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-md mx-auto leading-relaxed">
            12 preguntas inteligentes · Análisis IA personalizado · Estrategias accionables
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          {[
            { icon: <BookOpen className="w-5 h-5" />, label: '12 Preguntas',    sub: 'Modelo VARK' },
            { icon: <Brain className="w-5 h-5" />,    label: 'IA Local',        sub: 'Llama 3.2' },
            { icon: <Target className="w-5 h-5" />,   label: 'Estrategias',     sub: 'Personalizadas' },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
              <div className="flex justify-center mb-2 text-brand-400">{s.icon}</div>
              <p className="text-white text-sm font-semibold">{s.label}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl"
        >
          <h2 className="font-display text-xl font-semibold text-white mb-6">Antes de comenzar…</h2>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                ¿Cómo te llamas? <span className="text-brand-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="Tu nombre…"
                className={`
                  w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/30
                  focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition
                  ${touched && !canSubmit ? 'border-red-400/60' : 'border-white/20 focus:border-brand-500/50'}
                `}
              />
              {touched && !canSubmit && (
                <p className="text-red-400 text-xs mt-1.5">Por favor ingresa al menos 2 caracteres.</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                ¿Cuántos años tienes? <span className="text-white/30 text-xs">(opcional)</span>
              </label>
              <input
                type="number"
                value={age}
                min={5} max={99}
                onChange={e => setAge(e.target.value)}
                placeholder="Tu edad…"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition"
              />
            </div>

            {/* Goal */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                ¿Cuál es tu principal objetivo de aprendizaje? <span className="text-white/30 text-xs">(opcional)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GOALS.map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(goal === g ? '' : g)}
                    className={`
                      text-left text-sm px-3 py-2.5 rounded-xl border transition-all duration-200
                      ${goal === g
                        ? 'bg-brand-600/30 border-brand-500/60 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20'
                      }
                    `}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            className="mt-8 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-display font-semibold text-lg py-4 rounded-2xl shadow-lg shadow-brand-900/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Comenzar el Análisis
            <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-center text-white/30 text-xs mt-4">
            Toma aproximadamente 3 minutos · Completamente gratuito
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
