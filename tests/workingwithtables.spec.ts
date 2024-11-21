import { test, expect } from "@playwright/test";

test("test web table", async ({ page }) => {
  await page.goto("https://cosmocode.io/automation-practice-webtable/");

  const tableContainer = await page.locator("xpath=//table[@id='countries']");

  const rows = await tableContainer.locator("xpath=.//tr").all();

  console.log(rows.length);
  
  for (let row of rows) {
    console.log(await row.innerText());
  }
});
