#!/usr/bin/env node
/**
 * Genera reports/summary.md a partir de reports/json/results.json.
 * Uso: node scripts/generate-report-summary.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const jsonPath = join(root, 'reports/json/results.json');
const outPath = join(root, 'reports/summary.md');

function collectSpecs(suite, acc = []) {
  if (suite.specs && suite.specs.length) {
    for (const spec of suite.specs) {
      acc.push({ title: spec.title, ok: spec.ok });
    }
  }
  for (const child of suite.suites || []) {
    collectSpecs(child, acc);
  }
  return acc;
}

try {
  const data = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const specs = collectSpecs(data);
  const passed = specs.filter((s) => s.ok).length;
  const failed = specs.filter((s) => !s.ok).length;
  const total = specs.length;
  const failedList = specs.filter((s) => !s.ok).map((s) => `- ${s.title}`).join('\n');

  const summary = `# Resumen de pruebas

- **Total escenarios:** ${total}
- **Pasados:** ${passed}
- **Fallidos:** ${failed}
- **Fecha:** ${new Date().toISOString()}

${failedList ? `## Escenarios fallidos\n\n${failedList}\n` : ''}
> Generado por \`node scripts/generate-report-summary.mjs\`
`;

  writeFileSync(outPath, summary, 'utf8');
  console.log('Reporte resumen escrito en reports/summary.md');
} catch (e) {
  if (e.code === 'ENOENT') {
    console.error('No se encontró reports/json/results.json. Ejecuta antes: npm test');
  } else {
    console.error(e.message);
  }
  process.exit(1);
}
