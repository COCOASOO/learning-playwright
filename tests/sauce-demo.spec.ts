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

test('prueba login',async ({page}) => {
  await abrirPagina(page);
  await ingresarCredenciales(page);
  await hacerLogin(page);
});
