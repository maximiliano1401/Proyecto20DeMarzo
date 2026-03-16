import type { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'q1',
    emoji: '🗺️',
    category: 'Aprendizaje Nuevo',
    text: 'Cuando necesitas aprender algo completamente nuevo, ¿qué haces primero?',
    options: [
      { id: 'q1a', label: 'Busco videos, diagramas o infografías explicativas', style: 'visual', emoji: '🎥' },
      { id: 'q1b', label: 'Escucho podcasts, audiolibros o explicaciones en voz alta', style: 'auditivo', emoji: '🎧' },
      { id: 'q1c', label: 'Leo artículos, libros o guías detalladas', style: 'lectoescritor', emoji: '📖' },
      { id: 'q1d', label: 'Pruebo directamente y aprendo con la práctica', style: 'kinestesico', emoji: '🛠️' },
    ],
  },
  {
    id: 'q2',
    emoji: '📍',
    category: 'Orientación',
    text: 'Cuando llegas a un lugar desconocido, ¿cómo te orientas mejor?',
    options: [
      { id: 'q2a', label: 'Usando un mapa visual o Google Maps con vista de satélite', style: 'visual', emoji: '🗺️' },
      { id: 'q2b', label: 'Siguiendo instrucciones habladas paso a paso', style: 'auditivo', emoji: '🔊' },
      { id: 'q2c', label: 'Leyendo señales, indicaciones escritas o un listado de pasos', style: 'lectoescritor', emoji: '📝' },
      { id: 'q2d', label: 'Caminando y explorando hasta memorizar el camino', style: 'kinestesico', emoji: '🚶' },
    ],
  },
  {
    id: 'q3',
    emoji: '💡',
    category: 'Resolución de Problemas',
    text: 'Cuando enfrentas un problema difícil, ¿cómo prefieres abordarlo?',
    options: [
      { id: 'q3a', label: 'Dibujando un diagrama o esquema mental del problema', style: 'visual', emoji: '✏️' },
      { id: 'q3b', label: 'Discutiéndolo en voz alta con alguien o contigo mismo', style: 'auditivo', emoji: '💬' },
      { id: 'q3c', label: 'Escribiendo los pros, contras y posibles soluciones', style: 'lectoescritor', emoji: '📋' },
      { id: 'q3d', label: 'Probando soluciones una a una de manera práctica', style: 'kinestesico', emoji: '🔧' },
    ],
  },
  {
    id: 'q4',
    emoji: '📚',
    category: 'Estudio',
    text: 'Cuando estudias para un examen, ¿qué técnica funciona mejor para ti?',
    options: [
      { id: 'q4a', label: 'Hacer mapas mentales, esquemas visuales y usar colores', style: 'visual', emoji: '🧠' },
      { id: 'q4b', label: 'Grabar y escuchar tu voz repasando el tema', style: 'auditivo', emoji: '🎙️' },
      { id: 'q4c', label: 'Repasar apuntes escritos y hacer resúmenes detallados', style: 'lectoescritor', emoji: '📓' },
      { id: 'q4d', label: 'Hacer ejercicios prácticos, simulacros y casos reales', style: 'kinestesico', emoji: '📊' },
    ],
  },
  {
    id: 'q5',
    emoji: '📢',
    category: 'Comunicación',
    text: 'En una presentación al público, ¿qué te genera más impacto como oyente?',
    options: [
      { id: 'q5a', label: 'Presentaciones con imágenes, gráficas y diseño cuidado', style: 'visual', emoji: '🖼️' },
      { id: 'q5b', label: 'El tono de voz, el ritmo y la energía del presentador', style: 'auditivo', emoji: '🎤' },
      { id: 'q5c', label: 'Datos, cifras, citas textuales y material de lectura', style: 'lectoescritor', emoji: '📊' },
      { id: 'q5d', label: 'Demostraciones en vivo, actividades y participación activa', style: 'kinestesico', emoji: '🙋' },
    ],
  },
  {
    id: 'q6',
    emoji: '🎮',
    category: 'Entretenimiento',
    text: 'Cuando tienes tiempo libre para aprender algo por curiosidad, ¿qué eliges?',
    options: [
      { id: 'q6a', label: 'Ver documentales, tutoriales en YouTube o series educativas', style: 'visual', emoji: '📺' },
      { id: 'q6b', label: 'Escuchar podcasts, radio o debates sobre temas interesantes', style: 'auditivo', emoji: '📻' },
      { id: 'q6c', label: 'Leer Wikipedia, artículos, blogs o libros', style: 'lectoescritor', emoji: '📱' },
      { id: 'q6d', label: 'Experimentar, construir o hacer actividades manuales', style: 'kinestesico', emoji: '🔬' },
    ],
  },
  {
    id: 'q7',
    emoji: '🤝',
    category: 'Trabajo en Equipo',
    text: 'En un proyecto grupal, ¿cuál es tu rol natural?',
    options: [
      { id: 'q7a', label: 'Crear el diseño visual, presentaciones y material gráfico', style: 'visual', emoji: '🎨' },
      { id: 'q7b', label: 'Facilitar conversaciones, mediación y coordinación verbal', style: 'auditivo', emoji: '🗣️' },
      { id: 'q7c', label: 'Redactar documentos, investigar y organizar la información', style: 'lectoescritor', emoji: '✍️' },
      { id: 'q7d', label: 'Ejecutar tareas, prototipar y hacer que las cosas sucedan', style: 'kinestesico', emoji: '⚡' },
    ],
  },
  {
    id: 'q8',
    emoji: '🧩',
    category: 'Memorización',
    text: 'Para recordar información importante, ¿qué haces?',
    options: [
      { id: 'q8a', label: 'Asocio la info con imágenes mentales o visualizaciones', style: 'visual', emoji: '🏞️' },
      { id: 'q8b', label: 'Repito en voz alta, creo rimas o escucho canciones sobre el tema', style: 'auditivo', emoji: '🎵' },
      { id: 'q8c', label: 'Escribo varias veces o hago fichas de repaso', style: 'lectoescritor', emoji: '🃏' },
      { id: 'q8d', label: 'Asocio con experiencias físicas o realizo la acción relacionada', style: 'kinestesico', emoji: '💪' },
    ],
  },
  {
    id: 'q9',
    emoji: '⚡',
    category: 'Concentración',
    text: 'Cuando necesitas concentrarte profundamente, ¿qué ambiente necesitas?',
    options: [
      { id: 'q9a', label: 'Un espacio organizado y visualmente limpio sin distracciones visuales', style: 'visual', emoji: '🪟' },
      { id: 'q9b', label: 'Escuchando música instrumental, ruido blanco o en silencio total', style: 'auditivo', emoji: '🎶' },
      { id: 'q9c', label: 'Con mis apuntes y libros organizados para consultar', style: 'lectoescritor', emoji: '📚' },
      { id: 'q9d', label: 'Moviéndome o cambiando de posición cada cierto tiempo', style: 'kinestesico', emoji: '🏃' },
    ],
  },
  {
    id: 'q10',
    emoji: '🌟',
    category: 'Motivación',
    text: '¿Qué te hace sentir que aprendiste algo de verdad?',
    options: [
      { id: 'q10a', label: 'Cuando puedo visualizarlo claramente y create una imagen mental', style: 'visual', emoji: '👁️' },
      { id: 'q10b', label: 'Cuando puedo explicárselo a alguien con mis propias palabras (en voz alta)', style: 'auditivo', emoji: '🗣️' },
      { id: 'q10c', label: 'Cuando puedo escribir un resumen coherente por mi cuenta', style: 'lectoescritor', emoji: '📄' },
      { id: 'q10d', label: 'Cuando puedo aplicarlo en un problema o situación real', style: 'kinestesico', emoji: '🎯' },
    ],
  },
  {
    id: 'q11',
    emoji: '📱',
    category: 'Tecnología y Apps',
    text: 'Si usas una app nueva, ¿cómo aprendes a usarla?',
    options: [
      { id: 'q11a', label: 'Veo un video tutorial paso a paso en YouTube', style: 'visual', emoji: '▶️' },
      { id: 'q11b', label: 'Escucho o pido que alguien me lo explique verbalmente', style: 'auditivo', emoji: '📞' },
      { id: 'q11c', label: 'Leo el manual, las FAQs o los artículos de ayuda', style: 'lectoescritor', emoji: '📑' },
      { id: 'q11d', label: 'Exploro y pruebo todas las opciones por mi cuenta', style: 'kinestesico', emoji: '🖱️' },
    ],
  },
  {
    id: 'q12',
    emoji: '💬',
    category: 'Expresión',
    text: 'Cuando quieres compartir algo emocionante que aprendiste, ¿cómo lo haces?',
    options: [
      { id: 'q12a', label: 'Muestro fotos, videos, presentaciones o dibujos', style: 'visual', emoji: '🖼️' },
      { id: 'q12b', label: 'Lo cuento de viva voz con entusiasmo', style: 'auditivo', emoji: '🎉' },
      { id: 'q12c', label: 'Escribo sobre ello: texto, publicación o informe', style: 'lectoescritor', emoji: '✏️' },
      { id: 'q12d', label: 'Organizo una actividad para que otros lo experimenten', style: 'kinestesico', emoji: '🏆' },
    ],
  },
];

export const STYLE_LABELS: Record<string, string> = {
  visual:         'Visual',
  auditivo:       'Auditivo',
  lectoescritor:  'Lectoescritor',
  kinestesico:    'Kinestésico',
};

export const STYLE_COLORS: Record<string, string> = {
  visual:         '#4c6ef5',
  auditivo:       '#7c3aed',
  lectoescritor:  '#0ea5e9',
  kinestesico:    '#10b981',
};

export const STYLE_GRADIENTS: Record<string, string> = {
  visual:         'from-brand-600 to-brand-400',
  auditivo:       'from-violet-600 to-violet-400',
  lectoescritor:  'from-sky-600 to-sky-400',
  kinestesico:    'from-emerald-600 to-emerald-400',
};

export const STYLE_ICONS: Record<string, string> = {
  visual:         '👁️',
  auditivo:       '👂',
  lectoescritor:  '📖',
  kinestesico:    '✋',
};
