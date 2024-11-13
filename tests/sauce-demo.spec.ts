import { test, expect, Page } from "@playwright/test";

async function abrirPagina(page: Page): Promise<void> {
  await page.goto("https://www.saucedemo.com/");
}

async function ingresarCredenciales(page: Page): Promise<void> {
  await page.getByRole("textbox", { name: "Username" }).fill("standard_user");
  await page.getByRole("textbox", { name: "Password" }).fill("secret_sauce");
}

async function hacerLogin(page: Page): Promise<void> {
  await page.getByRole("button", { name: "Login" }).click();
}

async function verificarLogin(page: Page): Promise<void> {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
}


async function obtenerProductoRandom(page: Page): Promise<void> {
  const productos = await page.locator("#inventory_container .inventory_item").all();

  const randomIndex = Math.floor(Math.random() * productos.length);

  const randomItem = productos[randomIndex];

  const expectedName = await randomItem.locator('.inventory_item_name').innerText();
  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();
  
  await randomItem.getByRole("button", { name: "Add to cart" }).click();

  await page.locator('a.shopping_cart_link').click()
}

test("prueba login", async ({ page }) => {
  await abrirPagina(page);
  await ingresarCredenciales(page);
  await hacerLogin(page);
  await verificarLogin(page);
  await obtenerProductoRandom(page);
});
