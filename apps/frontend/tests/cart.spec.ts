import { test, expect } from "@playwright/test";

test("Add to cart", async ({ page }) => {
  // Load page
  await page.goto("https://builtbyandrew.com/catalogue/in-paradisum");
  await page.waitForLoadState();

  // Click add to cart button
  const button = await page.waitForSelector("button.snipcart-add-item");
  console.log("button", button);
  button.click({ force: true });

  await page.waitForSelector("#snipcart", { state: "attached" });

  // Click checkout button
  const checkoutButton = await page.waitForSelector('button:text("Checkout")', {
    timeout: 4000,
  });
  checkoutButton.click();

  // Fill out checkout form
  await page.locator('input[name="name"]').fill("Mary Jane");
  await page.locator('input[name="email"]').fill("mortocks@gmail.com");
  await page.locator('input[name="address1"]').fill("123 fake st");
  await page.locator('input[name="city"]').fill("Australia");
  await page.locator('input[name="province"]').fill("Queensland");
  await page.locator('input[name="postalCode"]').fill("4000");
  await page.locator('button:text("Continue to payment")').click();
});
