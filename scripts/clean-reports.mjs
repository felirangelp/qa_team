#!/usr/bin/env node
/**
 * Limpia la carpeta reports antes de una nueva ejecución.
 * Conserva la estructura de carpetas (.gitkeep).
 */
import { rmSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const reportsDir = join(root, 'reports');

if (!existsSync(reportsDir)) {
  console.log('Carpeta reports no existe, nada que limpiar.');
  process.exit(0);
}

const dirs = ['html', 'json', 'screenshots'];

for (const dir of dirs) {
  const path = join(reportsDir, dir);
  if (!existsSync(path)) continue;
  const entries = readdirSync(path, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.name === '.gitkeep') continue;
    const full = join(path, ent.name);
    rmSync(full, { recursive: true });
  }
}

if (existsSync(reportsDir)) {
  const topFiles = readdirSync(reportsDir, { withFileTypes: true });
  for (const ent of topFiles) {
    if (ent.isFile() && ent.name !== '.gitkeep') {
      rmSync(join(reportsDir, ent.name));
    }
  }
}

console.log('Carpeta reports limpiada.');
