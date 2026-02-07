import type { Page } from '@playwright/test';

/** Timeout por defecto para esperas en ms */
export const DEFAULT_WAIT_MS = 15_000;

/**
 * Espera a que la página esté en estado "load" (networkidle opcional).
 */
export async function waitForPageLoad(page: Page, timeoutMs = DEFAULT_WAIT_MS): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('load');
}

/**
 * Registra un listener de consola y devuelve el array de mensajes de tipo error.
 * Usar antes de navegar; después del flujo, revisar errors.length para E1.
 */
export function createConsoleErrorCollector(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

/**
 * Espera a que exista al menos un elemento que coincida con el selector.
 */
export async function waitForAtLeastOne(
  page: Page,
  selector: string,
  timeoutMs = DEFAULT_WAIT_MS
): Promise<void> {
  await page.waitForSelector(selector, { state: 'visible', timeout: timeoutMs });
}
