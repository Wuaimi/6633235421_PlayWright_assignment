import { test, expect } from "@playwright/test";

test("Deposit success", async ({ page }) => {
  await page.goto("https://atm-buddy-lite.lovable.app/", {
    waitUntil: "networkidle",
  });
  
  //Input with user "123456"
  await page.locator('input[type="text"]').fill("123456");
  await page.locator('input[type="password"]').fill("1234");

  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

  const toast = page.locator('li[role="status"]').first();

  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText("เข้าสู่ระบบสำเร็จ");
  
  //Get into Deposit page
  await page.getByText("ฝากเงิน", { exact: true }).click();
  
  //Input the amount
  await page.locator('input[type="number"]').fill("2000");
  await page.getByRole("button", { name: "ฝากเงิน" }).click();

  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText("ฝากเงินสำเร็จ");
});