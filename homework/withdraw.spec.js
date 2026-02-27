import { test, expect } from "@playwright/test";

test("Withdraw success", async ({ page }) => {
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
  await page.getByText("ถอนเงิน", { exact: true }).click();

  //Input 5000 Baht as the amount
  await page.locator('input[type="number"]').fill("5000");
  await page.getByRole("button", { name: "ถอนเงิน" }).click();

  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText("ถอนเงินสำเร็จ");
});

test("Withdraw fail", async ({ page }) => {
  await page.goto("https://atm-buddy-lite.lovable.app/", {
    waitUntil: "networkidle",
  });
  //Login with user "123456"
  await page.locator('input[type="text"]').fill("123456");
  await page.locator('input[type="password"]').fill("1234");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  const toast = page.locator('li[role="status"]').first();
  await expect(toast).toBeVisible({ timeout: 10000 });
  await expect(toast).toContainText("เข้าสู่ระบบสำเร็จ");
  
    //Get into Deposit page
  await page.getByText("ถอนเงิน", { exact: true }).click();
  
  //Input Invalid amount (not enough money in the account)
  await page.locator('input[type="number"]').fill("1000000");

   const withdrawBtn = page.getByRole("button", { name: /ถอนเงิน/ });
  await expect(withdrawBtn).toBeDisabled();
});
