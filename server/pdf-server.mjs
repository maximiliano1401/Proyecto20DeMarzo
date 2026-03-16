import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const PORT = Number(process.env.PDF_PORT || 3001);

app.use(express.json({ limit: '2mb' }));

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderList(items = []) {
  return items
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join('');
}

function renderTools(items = []) {
  return items
    .map((tool) => {
      const name = escapeHtml(tool?.name ?? 'Herramienta');
      const type = escapeHtml(tool?.type ?? 'General');
      const description = escapeHtml(tool?.description ?? '');
      const url = tool?.url ? `<div class="tool-url">${escapeHtml(tool.url)}</div>` : '';
      return `<div class="tool-card"><h4>${name}</h4><p class="tool-type">${type}</p><p>${description}</p>${url}</div>`;
    })
    .join('');
}

function renderStrategies(items = []) {
  return items
    .map((strategy) => {
      const icon = escapeHtml(strategy?.icon ?? '•');
      const title = escapeHtml(strategy?.title ?? 'Estrategia');
      const description = escapeHtml(strategy?.description ?? '');
      return `<div class="strategy-card"><h4>${icon} ${title}</h4><p>${description}</p></div>`;
    })
    .join('');
}

const STYLE_META = {
  visual: { label: 'Visual', color: '#4c6ef5', soft: '#e8edff' },
  auditivo: { label: 'Auditivo', color: '#7c3aed', soft: '#f2e8ff' },
  lectoescritor: { label: 'Lectoescritor', color: '#0ea5e9', soft: '#e6f7ff' },
  kinestesico: { label: 'Kinestesico', color: '#10b981', soft: '#e8fff5' },
};

function styleLabel(styleKey = '') {
  return STYLE_META[styleKey]?.label || styleKey || 'N/A';
}

function renderScoreBars(scores = {}) {
  const maxScore = Math.max(1, ...Object.values(scores).map((value) => Number(value || 0)));

  return Object.keys(STYLE_META)
    .map((key) => {
      const score = Number(scores[key] || 0);
      const pct = Math.max(0, Math.min(100, Math.round((score / maxScore) * 100)));
      const style = STYLE_META[key];
      return `
        <div class="score-row">
          <div class="score-row-head">
            <span>${style.label}</span>
            <strong>${score} / 12</strong>
          </div>
          <div class="score-track">
            <div class="score-fill" style="width:${pct}%; background:${style.color}"></div>
          </div>
        </div>
      `;
    })
    .join('');
}

function buildHtml(payload) {
  const profileName = escapeHtml(payload?.profile?.name || 'Estudiante');
  const result = payload?.result || {};
  const generatedAt = escapeHtml(payload?.generatedAt || new Date().toLocaleString('es-MX'));

  const dominantRaw = result?.dominantStyle || 'N/A';
  const secondaryRaw = result?.secondaryStyle || 'N/A';
  const dominant = escapeHtml(styleLabel(dominantRaw));
  const secondary = escapeHtml(styleLabel(secondaryRaw));
  const title = escapeHtml(result?.title || 'Perfil de Aprendizaje');
  const summary = escapeHtml(result?.summary || '');
  const studyRoutine = escapeHtml(result?.studyRoutine || '');
  const motivationalMessage = escapeHtml(result?.motivationalMessage || '');

  const scores = result?.scores || {};
  const scoreBars = renderScoreBars(scores);
  const scoreRows = [
    ['Visual', scores.visual ?? 0],
    ['Auditivo', scores.auditivo ?? 0],
    ['Lectoescritor', scores.lectoescritor ?? 0],
    ['Kinestésico', scores.kinestesico ?? 0],
  ]
    .map(([label, value]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(String(value))} / 12</td></tr>`)
    .join('');

  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Perfil de Aprendizaje - ${profileName}</title>
  <style>
    :root {
      color-scheme: light;
      --brand: #4c6ef5;
      --brand-deep: #3b5bdb;
      --ink: #0f172a;
      --muted: #475569;
      --line: #dbe3f0;
      --paper: #ffffff;
      --panel: #f8fafc;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: 'Segoe UI', Arial, sans-serif;
      color: var(--ink);
      background: var(--paper);
      line-height: 1.5;
      font-size: 12px;
      padding: 24px;
    }
    h1, h2, h3, h4, p { margin: 0; }
    .page { max-width: 820px; margin: 0 auto; }
    .header {
      border: 1px solid #c7d2fe;
      background: linear-gradient(145deg, #f2f5ff 0%, #e3e9ff 45%, #dde6ff 100%);
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 14px;
      box-shadow: 0 12px 24px rgba(59, 91, 219, 0.15);
    }
    .kicker { color: #2a3da6; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; }
    .title { font-size: 27px; font-weight: 800; margin-top: 6px; margin-bottom: 10px; letter-spacing: -0.02em; }
    .meta { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 10px; }
    .pill { background: #eef2ff; border: 1px solid #c7d2fe; color: #303f9f; padding: 4px 10px; border-radius: 999px; font-weight: 700; font-size: 11px; }
    .summary { color: #1f2937; font-size: 13px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
    .card {
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 14px;
      background: var(--paper);
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .section-title { font-size: 14px; font-weight: 800; margin-bottom: 10px; color: #0b1220; letter-spacing: 0.01em; }
    ul { margin: 0; padding-left: 18px; }
    li { margin: 4px 0; }
    table { width: 100%; border-collapse: collapse; }
    td {
      border-bottom: 1px solid var(--line);
      padding: 8px 0;
      font-size: 12px;
    }
    td:last-child { text-align: right; font-weight: 700; }
    .section { margin-bottom: 12px; }
    .strategy-list, .tool-list { display: grid; gap: 10px; }
    .strategy-card, .tool-card { border: 1px solid var(--line); border-radius: 10px; padding: 10px; background: var(--panel); }
    .strategy-card h4, .tool-card h4 { font-size: 13px; margin-bottom: 4px; }
    .tool-type { color: var(--muted); font-size: 11px; margin-bottom: 4px; font-weight: 700; }
    .tool-url { color: #1d4ed8; font-size: 10px; margin-top: 4px; word-break: break-all; }
    .score-bars { display: grid; gap: 10px; margin-bottom: 8px; }
    .score-row-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 5px; font-size: 12px; }
    .score-row-head strong { color: #0b1220; font-size: 11px; }
    .score-track {
      width: 100%;
      height: 9px;
      border-radius: 999px;
      background: #e8edf6;
      overflow: hidden;
      border: 1px solid #dde5f1;
    }
    .score-fill {
      height: 100%;
      border-radius: 999px;
    }
    .message {
      border: 1px solid #ddd6fe;
      background: linear-gradient(145deg, #f7f3ff, #f3ebff);
      border-radius: 12px;
      padding: 14px;
      font-size: 14px;
      font-weight: 600;
      color: #4c1d95;
      margin-bottom: 12px;
    }
    .footer { color: #6b7280; font-size: 10px; border-top: 1px solid var(--line); padding-top: 8px; }
    @media print {
      body { padding: 0; }
      .page { max-width: none; }
      .card, .section, .header, .message { page-break-inside: avoid; break-inside: avoid; }
    }
  </style>
</head>
<body>
  <main class="page">
    <section class="header">
      <div class="kicker">Reporte de Perfil de Aprendizaje</div>
      <h1 class="title">${title}</h1>
      <div class="meta">
        <span class="pill">Estudiante: ${profileName}</span>
        <span class="pill">Dominante: ${dominant}</span>
        <span class="pill">Secundario: ${secondary}</span>
      </div>
      <p class="summary">${summary}</p>
    </section>

    <section class="grid section">
      <article class="card">
        <h2 class="section-title">Puntuaciones por Estilo</h2>
        <div class="score-bars">${scoreBars}</div>
        <table>
          <tbody>${scoreRows}</tbody>
        </table>
      </article>
      <article class="card">
        <h2 class="section-title">Rutina de Estudio Recomendada</h2>
        <p>${studyRoutine}</p>
      </article>
    </section>

    <section class="card section">
      <h2 class="section-title">Fortalezas</h2>
      <ul>${renderList(result?.strengths || [])}</ul>
    </section>

    <section class="card section">
      <h2 class="section-title">Áreas de Mejora</h2>
      <ul>${renderList(result?.challenges || [])}</ul>
    </section>

    <section class="card section">
      <h2 class="section-title">Estrategias Personalizadas</h2>
      <div class="strategy-list">${renderStrategies(result?.strategies || [])}</div>
    </section>

    <section class="card section">
      <h2 class="section-title">Herramientas Recomendadas</h2>
      <div class="tool-list">${renderTools(result?.toolsRecommended || [])}</div>
    </section>

    <section class="message">
      ${motivationalMessage}
    </section>

    <footer class="footer">
      Generado el ${generatedAt} · Proyecto20DeMarzo · PDF creado con Puppeteer
    </footer>
  </main>
</body>
</html>`;
}

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/pdf', async (req, res) => {
  const payload = req.body || {};

  if (!payload?.result) {
    return res.status(400).json({ error: 'Faltan datos del perfil para generar el PDF.' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const html = buildHtml(payload);

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '12mm', right: '10mm', bottom: '12mm', left: '10mm' },
    });

    const safeName = (payload?.profile?.name || 'usuario')
      .toString()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-_]/g, '')
      .toLowerCase() || 'usuario';

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="perfil-aprendizaje-${safeName}.pdf"`);
    return res.send(pdf);
  } catch (error) {
    console.error('Error al generar PDF con Puppeteer:', error);
    return res.status(500).json({ error: 'No se pudo generar el PDF.' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

app.listen(PORT, () => {
  console.log(`PDF server running on http://localhost:${PORT}`);
});
