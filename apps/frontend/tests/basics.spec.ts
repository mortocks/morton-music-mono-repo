import { test, expect } from "@playwright/test";

test("Basic load", async ({ page }) => {
  await page.waitForLoadState();
  await page.goto("https://builtbyandrew.com");
  await expect(
    page.getByRole("heading", { name: "Morton Music" })
  ).toBeVisible();
});
