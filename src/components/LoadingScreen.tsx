import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const STEPS = [
  'Procesando tus respuestas…',
  'Calculando estilos de aprendizaje…',
  'Consultando con GPT-4o…',
  'Generando análisis personalizado…',
  'Preparando tus estrategias…',
];

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background particle blobs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            background: i % 2 === 0
              ? 'radial-gradient(circle, rgba(76,110,245,0.3), transparent)'
              : 'radial-gradient(circle, rgba(124,58,237,0.3), transparent)',
            top:  `${10 + i * 18}%`,
            left: `${5 + i * 20}%`,
          }}
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:24px_24px] opacity-[0.08] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 text-center max-w-md panel-surface panel-outline rounded-3xl p-7 sm:p-8"
      >
        {/* Brain animation */}
        <div className="relative inline-flex items-center justify-center w-28 h-28 mb-7">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500/40 to-violet-500/40"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-brand-600/60 to-violet-600/60"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center shadow-[0_14px_35px_rgba(76,110,245,0.45)] ring-1 ring-white/20">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="font-display text-2xl sm:text-[1.72rem] font-bold text-white mb-2 tracking-tight">
          Analizando tu perfil
        </h2>
        <p className="text-white/55 text-sm mb-8">
          La IA está generando tu análisis personalizado
        </p>

        {/* Steps */}
        <div className="space-y-2.5 text-left">
          {STEPS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.6, duration: 0.4 }}
              className="flex items-center gap-3 rounded-xl px-2 py-1.5 bg-white/4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.6 + 0.2 }}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center flex-shrink-0 ring-1 ring-white/25"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: i * 0.6 }}
                  className="w-2.5 h-2.5 rounded-full border-t border-white"
                />
              </motion.div>
              <span className="text-white/70 text-sm">{s}</span>
            </motion.div>
          ))}
        </div>

        {/* Animated bar */}
        <div className="mt-8 w-full bg-white/12 rounded-full h-2 overflow-hidden ring-1 ring-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-400 via-brand-300 to-violet-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: STEPS.length * 0.6 + 1, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
