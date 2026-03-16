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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-brand-950 to-violet-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
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

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 text-center max-w-sm"
      >
        {/* Brain animation */}
        <div className="relative inline-flex items-center justify-center w-28 h-28 mb-8">
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
          <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-white mb-2">
          Analizando tu perfil
        </h2>
        <p className="text-white/50 text-sm mb-10">
          La IA está generando tu análisis personalizado
        </p>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.6, duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.6 + 0.2 }}
                className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center flex-shrink-0"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: i * 0.6 }}
                  className="w-2.5 h-2.5 rounded-full border-t border-white"
                />
              </motion.div>
              <span className="text-white/60 text-sm text-left">{s}</span>
            </motion.div>
          ))}
        </div>

        {/* Animated bar */}
        <div className="mt-10 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-400 to-violet-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: STEPS.length * 0.6 + 1, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
