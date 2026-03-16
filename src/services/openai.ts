import type { UserProfile, LearningProfile, StyleScore } from '../types';
import { STYLE_LABELS } from '../data/questions';

const MODEL = 'llama3.2:3b';

// ─── Score Calculator ─────────────────────────────────────────────────────────

export function calculateScores(profile: UserProfile): StyleScore {
  const scores: StyleScore = { visual: 0, auditivo: 0, lectoescritor: 0, kinestesico: 0 };
  profile.answers.forEach(a => { scores[a.style]++; });
  return scores;
}

// ─── AI Analysis ─────────────────────────────────────────────────────────────

export async function analyzeProfile(profile: UserProfile): Promise<LearningProfile> {
  const scores  = calculateScores(profile);
  const total   = profile.answers.length || 1;
  const sorted  = (Object.entries(scores) as [keyof StyleScore, number][])
    .sort(([, a], [, b]) => b - a);
  const [dominant, secondary] = sorted.map(([k]) => k);
  const pct = (v: number) => Math.round((v / total) * 100);

  const systemPrompt = `Eres un experto psicopedagogo especializado en estilos de aprendizaje (modelo VARK). 
Responde SIEMPRE con un objeto JSON válido y completo, sin texto adicional antes ni después, sin markdown.`;

  const userPrompt = `Analiza el perfil del estudiante y devuelve SOLO el siguiente JSON (sin texto extra):

DATOS:
- Nombre: ${profile.name}
${profile.age ? `- Edad: ${profile.age}` : ''}
${profile.goal ? `- Meta: ${profile.goal}` : ''}

PUNTUACIONES VARK (de ${total} preguntas):
- Visual: ${scores.visual} (${pct(scores.visual)}%)
- Auditivo: ${scores.auditivo} (${pct(scores.auditivo)}%)
- Lectoescritor: ${scores.lectoescritor} (${pct(scores.lectoescritor)}%)
- Kinestésico: ${scores.kinestesico} (${pct(scores.kinestesico)}%)
- Estilo dominante: ${STYLE_LABELS[dominant]}
- Estilo secundario: ${STYLE_LABELS[secondary]}

JSON A DEVOLVER (rellena todos los campos en español, usando el nombre ${profile.name}):
{
  "title": "título creativo del perfil, ej: El Explorador Visual",
  "summary": "párrafo de 3 oraciones personalizadas describiendo cómo aprende ${profile.name}",
  "strengths": ["fortaleza específica 1", "fortaleza 2", "fortaleza 3", "fortaleza 4"],
  "challenges": ["desafío 1 con consejo", "desafío 2", "desafío 3"],
  "strategies": [
    {"title": "nombre estrategia", "description": "descripción 2 oraciones", "icon": "emoji"},
    {"title": "nombre estrategia", "description": "descripción 2 oraciones", "icon": "emoji"},
    {"title": "nombre estrategia", "description": "descripción 2 oraciones", "icon": "emoji"},
    {"title": "nombre estrategia", "description": "descripción 2 oraciones", "icon": "emoji"},
    {"title": "nombre estrategia", "description": "descripción 2 oraciones", "icon": "emoji"}
  ],
  "toolsRecommended": [
    {"name": "herramienta", "type": "categoría", "description": "por qué es ideal", "url": "https://ejemplo.com"},
    {"name": "herramienta", "type": "categoría", "description": "por qué es ideal", "url": "https://ejemplo.com"},
    {"name": "herramienta", "type": "categoría", "description": "por qué es ideal", "url": "https://ejemplo.com"},
    {"name": "herramienta", "type": "categoría", "description": "por qué es ideal", "url": "https://ejemplo.com"}
  ],
  "studyRoutine": "párrafo 2-3 oraciones con rutina de estudio ideal para este perfil",
  "motivationalMessage": "mensaje motivacional poderoso de 2 oraciones dirigido a ${profile.name}"
}`;

  let raw = '';
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        format: 'json',
        stream: false,
        options: { temperature: 0.7, num_predict: 1800 },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userPrompt },
        ],
      }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    raw = data.message.content;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes('fetch') || msg.includes('ECONNREFUSED') || msg.includes('Failed to fetch')) {
      throw new Error('No se puede conectar con Ollama. Asegúrate de que el servicio está corriendo: ejecuta "ollama serve" en la terminal.');
    }
    if (msg.includes('model') && msg.includes('not found')) {
      throw new Error(`El modelo ${MODEL} no está descargado. Ejecuta: ollama pull ${MODEL}`);
    }
    throw new Error(`Error de Ollama: ${msg}`);
  }

  const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

  let parsed: Omit<LearningProfile, 'dominantStyle' | 'secondaryStyle' | 'scores'>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    // Intenta extraer el JSON del texto si el modelo añadió texto extra
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        parsed = JSON.parse(match[0]);
      } catch {
        throw new Error('La respuesta de la IA no pudo ser procesada. Intenta de nuevo.');
      }
    } else {
      throw new Error('La respuesta de la IA no contiene JSON válido. Intenta de nuevo.');
    }
  }

  return {
    ...parsed,
    dominantStyle:  dominant,
    secondaryStyle: secondary,
    scores,
  };
}
