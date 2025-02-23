// ... archivo de autenticación ...
import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "./pageobjects/loginpage";

const authFile = "playwright/.auth/user.json"; // Asegúrate de que la ruta sea correcta

setup("authenticate", async ({ page }) => {
  await page.goto("https://saucedemo.com");
  const loginPage = new LoginPage(page);
  await loginPage.loginWithCredentials("standard_user", "secret_sauce");

  await page.context().storageState({ path: authFile }); // Asegúrate de que se guarde correctamente
});