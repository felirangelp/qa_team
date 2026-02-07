import { test as base } from 'playwright-bdd';

/**
 * Fixture base para playwright-bdd.
 * Debe extender desde 'playwright-bdd' para createBdd(test).
 * Extender aquí con fixtures adicionales (page objects, etc.) si se necesita.
 */
export const test = base.extend({});

export default test;
