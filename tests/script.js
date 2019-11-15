let { run } = require('@percy/script');

run(async (page, snapshot) => {
  await page.setBypassCSP(true);
  await page.goto('https://sdk-test.percy.dev');
  await page.waitFor(2000);
  await snapshot('SDK Test site');
});
