const verificationTimeout = 3 * 60_000;

export async function readVirsiPricesInBrowser(url) {
  const { chromium } = await import('playwright-core');
  const browser = await chromium.launch({ channel: 'msedge', headless: false });
  try {
    const page = await browser.newPage();
    await page.bringToFront();
    console.log('Virši opened in Edge. Complete the website verification if it appears.');
    await page.goto(url, { waitUntil: 'commit' });
    await page.locator('.fuel-block .price-card[data-type="98e"]').waitFor({
      state: 'attached', timeout: verificationTimeout
    });
    await page.waitForLoadState('domcontentloaded');
    return await page.content();
  } finally {
    await browser.close();
  }
}
