import { test, expect } from "@playwright/test";

test("Login success", async ({ page }) => {
  await page.goto("https://atm-buddy-lite.lovable.app/", {
    waitUntil: "networkidle",
  });

  await page.locator('input[type="text"]').fill("123456");
  await page.locator('input[type="password"]').fill("1234");

  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

  const toast = page.locator('li[role="status"]').first();
  
  //message will be appeared as a toast in the bottom right
  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText("เข้าสู่ระบบสำเร็จ");
});

test("Login fail", async ({ page }) => {
  await page.goto("https://atm-buddy-lite.lovable.app/", {
    waitUntil: "networkidle",
  });

  await page.locator('input[type="text"]').fill("123456");
  await page.locator('input[type="password"]').fill("0000");

  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

  const toast = page.locator('li[role="status"]').first();
  
  //message will be appeared as a toast in the bottom right
  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText("ข้อมูลไม่ถูกต้อง");
});