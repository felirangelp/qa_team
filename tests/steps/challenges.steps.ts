import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/base.fixture.js';

const { Given, Then } = createBdd(test);

Given('estoy en la página de challenges', async ({ page }) => {
  await page.goto('/challenges');
});

Then('veo el título o heading de la página de challenges', async ({ page }) => {
  await page.getByRole('heading', { name: /Challenges/i }).waitFor({ state: 'visible', timeout: 15000 });
});

Then('existe al menos un challenge en el listado', async ({ page }) => {
  const links = page.getByRole('link', { name: /medium|test|moda|networking|asistentes|conexiones/i });
  await links.first().waitFor({ state: 'visible', timeout: 15000 });
  const count = await links.count();
  if (count < 1) throw new Error('Se esperaba al menos un challenge en el listado');
});

Then('el contenido de challenges es visible', async ({ page }) => {
  await page.getByRole('heading', { name: /Challenges/i }).waitFor({ state: 'visible', timeout: 10000 });
  await page.getByRole('link', { name: /medium|test/i }).first().waitFor({ state: 'visible', timeout: 8000 });
});

Then('cada challenge muestra título o descripción', async ({ page }) => {
  const first = page.getByRole('link', { name: /medium|test/i }).first();
  await first.waitFor({ state: 'visible', timeout: 8000 });
  const text = await first.textContent();
  if (!text || text.trim().length < 2) throw new Error('El challenge no muestra título ni descripción');
});

Then('los challenges muestran dificultad o fecha', async ({ page }) => {
  const first = page.getByRole('link', { name: /medium|test/i }).first();
  await first.waitFor({ state: 'visible', timeout: 8000 });
  const text = await first.textContent();
  const hasMeta = /medium|easy|hard|\d{1,2}\/\d{1,2}\/\d{4}/i.test(text ?? '');
  if (!hasMeta) throw new Error('No se encontró dificultad ni fecha en el ítem');
});

Then('los challenges tienen enlaces clicables', async ({ page }) => {
  const link = page.getByRole('link', { name: /medium|test|moda|networking/i }).first();
  await link.waitFor({ state: 'visible', timeout: 8000 });
  const href = await link.getAttribute('href');
  if (!href || !href.includes('/challenges/')) throw new Error('Los challenges no tienen enlaces clicables');
});
