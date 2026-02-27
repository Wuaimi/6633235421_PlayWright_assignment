import { test, expect } from "@playwright/test";

test("Transfer success", async ({ page }) => {
  await page.goto("https://atm-buddy-lite.lovable.app/", {
    waitUntil: "networkidle",
  });

  //Login with user 123456
  await page.locator('input[type="text"]').fill("123456");
  await page.locator('input[type="password"]').fill("1234");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();

  const loginToast = page.locator('li[role="status"][data-state="open"]').first();
  await expect(loginToast).toBeVisible({ timeout: 10000 });
  await expect(loginToast).toContainText("เข้าสู่ระบบสำเร็จ");

  //enter transfer page
  await page.getByText("โอนเงิน", { exact: true }).click();

  //input another account's number
  await page.getByPlaceholder("กรอกหมายเลขบัญชี 6 หลัก").fill("789012");
  
  //select the 2000 choice (not the textfield)
  await page.getByRole("button", { name: "฿2,000.00" }).click();

  //input note (not required)
  await page.getByPlaceholder("เช่น เงินค่าอาหาร, ค่าเช่าบ้าน").fill("note");

  //press the button
  await page.getByRole("button", { name: "โอนเงิน" }).click();

  const transferToast = page.locator('li[role="status"][data-state="open"]').last();
  await expect(transferToast).toBeVisible({ timeout: 10000 });
  await expect(transferToast).toContainText("โอนเงินสำเร็จ");
});
