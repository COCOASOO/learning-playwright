import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "./pageobjects/loginpage";
import { abort } from "process";

test("interceptor test", async ({ page }) => {
  await page.on("request", (req) => {
    console.log(req.url());
  });

  //forma para hacerlo a una unica imagen
  //await page.route("https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b0.jpg",(route)=> route.abort())

  //hacerlo a mas de una
  await page.route("**/*.{png,jpg,jpeg,svg}",(route)=>route.abort())

  //
  if (process.env.URL) {
    await page.goto(process.env.URL);
  } else {
    throw new Error("URL is not defined in the environment variables");
  }

  const login = new LoginPage(page);
  await login.loginWithCredentials("standard_user", "secret_sauce");
});
