import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/base.fixture.js';
const COMFAMA_URL = 'https://www.comfama.com';

const { Given, Then } = createBdd(test);

Given('estoy en la página de Comfama', async ({ page }) => {
  await page.goto(COMFAMA_URL);
});

Then('veo el título o heading de Comfama', async ({ page }) => {
  await page.getByRole('heading', { name: /Comfama|Caja de compensación/i }).first().waitFor({ state: 'visible', timeout: 15000 });
});

Then('la URL corresponde a Comfama', async ({ page }) => {
  const url = page.url();
  if (!url.includes('comfama.com')) throw new Error(`URL esperada con comfama.com, obtenida: ${url}`);
});

Then('el contenido principal de Comfama es visible', async ({ page }) => {
  const heading = page.getByRole('heading', { name: /Parques|Beneficios|Qué estás buscando/i }).first();
  await heading.waitFor({ state: 'visible', timeout: 10000 });
});

Then('veo la sección {string}', async ({ page }, sectionName: string) => {
  const key = sectionName.replace(/[¿?]/g, '').trim();
  const pattern = new RegExp(key.split(/\s+/).slice(0, 3).join('.*'), 'i');
  const section = page.getByRole('heading', { name: pattern });
  const byText = page.getByText(pattern);
  await Promise.race([
    section.first().waitFor({ state: 'visible', timeout: 12000 }),
    byText.first().waitFor({ state: 'visible', timeout: 12000 }),
  ]);
});

Then('veo opciones Personas y familias o Empresas', async ({ page }) => {
  const personas = page.getByText(/Personas y familias|Empresas/i).first();
  await personas.waitFor({ state: 'visible', timeout: 8000 });
});

Then('veo la sección o enlace {string}', async ({ page }, name: string) => {
  const section = page.getByRole('heading', { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') });
  const link = page.getByRole('link', { name: new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') });
  await Promise.race([
    section.first().waitFor({ state: 'visible', timeout: 8000 }),
    link.first().waitFor({ state: 'visible', timeout: 8000 }),
  ]);
});

Then('existe un enlace {string} o {string}', async ({ page }, name1: string, name2: string) => {
  const link = page.getByRole('link', { name: new RegExp(`${name1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|${name2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') });
  await link.first().waitFor({ state: 'visible', timeout: 8000 });
});
