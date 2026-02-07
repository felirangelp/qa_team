import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/base.fixture.js';
import { waitForPageLoad } from '../support/test-helpers.js';

const { When, Then } = createBdd(test);

When('la página termina de cargar', async ({ page }) => {
  await waitForPageLoad(page);
});

Then('existe un enlace o botón {string}', async ({ page }, name: string) => {
  const link = page.getByRole('link', { name: new RegExp(name, 'i') });
  await link.waitFor({ state: 'visible', timeout: 5000 });
});
