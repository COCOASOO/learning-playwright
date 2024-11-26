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
  await page.route("**/*.{png,jpg,jpeg,svg}", (route) => route.abort());

  //
  if (process.env.URL) {
    await page.goto(process.env.URL);
  } else {
    throw new Error("URL is not defined in the environment variables");
  }

  const login = new LoginPage(page);
  await login.loginWithCredentials("standard_user", "secret_sauce");
});

// en una lista cargar solamente 1 row para ve como quedaria
test("interceptor test 2", async ({ page }) => {
  await page.route("https://demoqa.com/BookStore/v1/Books", (route) =>
    route.fulfill({
      status: 200, // Cambiado a 200 OK
      headers: {
        "content-type": "application/json; charset=utf-8", // Encabezado realista
      },
      // Muy importante el stringify
      body: JSON.stringify({
        books: [
          {
            isbn: "9781449325862",
            title: "Git Pocket Guide",
            subTitle: "A Working Introduction",
            author: "Richard E. Silverman",
            publish_date: "2020-06-04T08:48:39.000Z",
            publisher: "O'Reilly Media",
            pages: 234,
            description:
              "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            website: "http://chimera.labs.oreilly.com/books/1230000000561/index.html",
          },
        ],
      }),
    })
  );

  await page.goto("https://demoqa.com/books");
  // Usa page.pause() si quieres inspeccionar la página visualmente
  await page.pause();
});

