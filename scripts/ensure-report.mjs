#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const reportIndex = join(__dirname, '..', 'reports', 'html', 'index.html');

if (!existsSync(reportIndex)) {
  console.error('No hay reporte en reports/html/. Ejecuta primero: npm test');
  process.exit(1);
}
