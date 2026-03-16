import { motion } from 'framer-motion';
import type { MotionProps } from 'framer-motion';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  PolarRadiusAxis, Tooltip,
} from 'recharts';
import {
  Brain, Star, Zap, AlertTriangle, RotateCcw,
  BookOpen, ExternalLink, Lightbulb, Heart, Download,
} from 'lucide-react';
import type { LearningProfile } from '../types';
import { STYLE_LABELS, STYLE_COLORS, STYLE_GRADIENTS, STYLE_ICONS } from '../data/questions';

interface Props {
  profile: { name: string };
  result:  LearningProfile;
  onRestart: () => void;
}

const DOMAIN_BG: Record<string, string> = {
  visual:        'from-brand-900/60 to-brand-950/80 border-brand-500/30',
  auditivo:      'from-violet-900/60 to-violet-950/80 border-violet-500/30',
  lectoescritor: 'from-sky-900/60 to-sky-950/80 border-sky-500/30',
  kinestesico:   'from-emerald-900/60 to-emerald-950/80 border-emerald-500/30',
};

const DOMAIN_TEXT: Record<string, string> = {
  visual:        'text-brand-400',
  auditivo:      'text-violet-400',
  lectoescritor: 'text-sky-400',
  kinestesico:   'text-emerald-400',
};

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="text-brand-400">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-white">{children}</h3>
    </div>
  );
}

const fadeUp = (delay = 0): Pick<MotionProps, 'initial' | 'animate' | 'transition'> => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
});

export function ResultsPage({ profile, result, onRestart }: Props) {
  const { dominantStyle, secondaryStyle, scores, title, summary,
          strengths, challenges, strategies, toolsRecommended,
          studyRoutine, motivationalMessage } = result;

  // Radar data
  const radarData = [
    { subject: 'Visual',        value: scores.visual },
    { subject: 'Auditivo',      value: scores.auditivo },
    { subject: 'Lectoescritor', value: scores.lectoescritor },
    { subject: 'Kinestésico',   value: scores.kinestesico },
  ];

  const maxScore = Math.max(...Object.values(scores));

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950 pb-16">
      {/* Fixed background elements */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 pt-10 space-y-8 relative z-10">

        {/* ── Hero Section ──────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0)} className={`bg-gradient-to-br ${DOMAIN_BG[dominantStyle]} border rounded-3xl p-8 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${STYLE_GRADIENTS[dominantStyle]} flex items-center justify-center text-4xl shadow-xl flex-shrink-0`}>
              {STYLE_ICONS[dominantStyle]}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/40 text-sm font-medium uppercase tracking-wider">Tu Perfil</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">{title}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-white/10 ${DOMAIN_TEXT[dominantStyle]}`}>
                  {STYLE_ICONS[dominantStyle]} {STYLE_LABELS[dominantStyle]} (dominante)
                </span>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full bg-white/10 ${DOMAIN_TEXT[secondaryStyle]}`}>
                  {STYLE_ICONS[secondaryStyle]} {STYLE_LABELS[secondaryStyle]} (secundario)
                </span>
              </div>
              <p className="text-white/70 leading-relaxed">{summary}</p>
            </div>
          </div>
        </motion.div>

        {/* ── Score Cards + Radar ───────────────────────────────────────── */}
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score bars */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
            <SectionTitle icon={<Brain className="w-5 h-5" />}>Puntuaciones por Estilo</SectionTitle>
            <div className="space-y-4">
              {(Object.entries(scores) as [keyof typeof scores, number][])
                .sort(([, a], [, b]) => b - a)
                .map(([style, score]) => (
                  <div key={style}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/80 text-sm font-medium">
                        {STYLE_ICONS[style]} {STYLE_LABELS[style]}
                      </span>
                      <span className={`text-sm font-bold ${DOMAIN_TEXT[style]}`}>
                        {score} / 12
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        className="h-2.5 rounded-full"
                        style={{ background: STYLE_COLORS[style] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / maxScore) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Radar chart */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
            <SectionTitle icon={<Star className="w-5 h-5" />}>Perfil Visual</SectionTitle>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                  <PolarRadiusAxis domain={[0, 12]} tick={false} axisLine={false} />
                  <Radar
                    name="Puntuación"
                    dataKey="value"
                    stroke="#4c6ef5"
                    fill="#4c6ef5"
                    fillOpacity={0.4}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{ background: '#1e1b4b', border: '1px solid #4c6ef5', borderRadius: 8, color: '#fff' }}
                    formatter={(v: number | undefined) => [v !== undefined ? `${v} puntos` : '', 'Puntuación']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* ── Strengths & Challenges ────────────────────────────────────── */}
        <motion.div {...fadeUp(0.15)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
            <SectionTitle icon={<Zap className="w-5 h-5 text-yellow-400" />}>
              <span className="text-yellow-300">Tus Fortalezas</span>
            </SectionTitle>
            <ul className="space-y-3">
              {strengths.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 text-white/80 text-sm leading-snug"
                >
                  <span className="w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-yellow-400 font-bold text-xs">
                    {i + 1}
                  </span>
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
            <SectionTitle icon={<AlertTriangle className="w-5 h-5 text-orange-400" />}>
              <span className="text-orange-300">Áreas de Mejora</span>
            </SectionTitle>
            <ul className="space-y-3">
              {challenges.map((c, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 text-white/80 text-sm leading-snug"
                >
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-orange-400 font-bold text-xs">
                    {i + 1}
                  </span>
                  {c}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ── Strategies ────────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.2)} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
          <SectionTitle icon={<Lightbulb className="w-5 h-5" />}>Estrategias Personalizadas</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {strategies.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                className={`bg-gradient-to-br ${DOMAIN_BG[dominantStyle]} border rounded-2xl p-4 hover:scale-[1.02] transition-transform`}
              >
                <div className="text-2xl mb-3">{s.icon}</div>
                <h4 className="font-display font-semibold text-white text-sm mb-1.5">{s.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Study Routine ─────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.25)} className="bg-gradient-to-r from-brand-900/40 to-violet-900/40 border border-white/10 rounded-3xl p-6">
          <SectionTitle icon={<BookOpen className="w-5 h-5" />}>Tu Rutina de Estudio Ideal</SectionTitle>
          <p className="text-white/80 leading-relaxed">{studyRoutine}</p>
        </motion.div>

        {/* ── Recommended Tools ─────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.3)} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
          <SectionTitle icon={<ExternalLink className="w-5 h-5" />}>Herramientas Recomendadas</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {toolsRecommended.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="group flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600/30 to-violet-600/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🔧</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="font-semibold text-white text-sm truncate">{t.name}</h4>
                    <span className="text-xs text-white/40 flex-shrink-0 bg-white/5 px-2 py-0.5 rounded-full">{t.type}</span>
                  </div>
                  <p className="text-white/60 text-xs leading-snug mb-2">{t.description}</p>
                  {t.url && (
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      Visitar <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Motivational Message ─────────────────────────────────────── */}
        <motion.div {...fadeUp(0.35)} className="bg-gradient-to-br from-violet-900/50 to-brand-900/50 border border-violet-500/30 rounded-3xl p-8 text-center">
          <Heart className="w-8 h-8 text-violet-400 mx-auto mb-4" />
          <blockquote className="font-display text-xl sm:text-2xl font-semibold text-white leading-relaxed">
            "{motivationalMessage}"
          </blockquote>
          <p className="text-white/40 text-sm mt-4">— Análisis IA personalizado para {profile.name}</p>
        </motion.div>

        {/* ── Action buttons ────────────────────────────────────────────── */}
        <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition font-medium"
          >
            <Download className="w-4 h-4" />
            Guardar / Imprimir
          </button>
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white font-display font-semibold shadow-lg transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            Hacer de Nuevo
          </button>
        </motion.div>
      </div>
    </div>
  );
}
