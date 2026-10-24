import { test, expect } from '@playwright/test';

test.describe('Elingu Multi-Portal E2E Test Suite', () => {

  // 1. STUDENT PORTAL TESTS
  test.describe('Student App (/)' , () => {
    test('loads student app and checks page title and main elements', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Elingu/i);
      
      // Check that chat interface or main container is visible
      const body = page.locator('body');
      await expect(body).toBeVisible();
    });

    test('theme toggle switches between light and dark mode', async ({ page }) => {
      await page.goto('/');
      const themeBtn = page.locator('#themeToggleBtn');
      if (await themeBtn.isVisible()) {
        const body = page.locator('body');
        const initialDark = await body.evaluate(el => el.classList.contains('theme-dark'));
        
        await themeBtn.click();
        const afterClickDark = await body.evaluate(el => el.classList.contains('theme-dark'));
        expect(afterClickDark).toBe(!initialDark);
      }
    });

    test('mobile viewport responsiveness (iPhone SE / 375px)', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await expect(page.locator('body')).toBeVisible();
      
      // Ensure no horizontal body scrollbar blowout
      const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
      const clientWidth = await page.evaluate(() => document.body.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
    });
  });

  // 2. PARENT PORTAL TESTS
  test.describe('Parent Portal (/parent/portal)', () => {
    test('renders parent portal with password toggle and theme button', async ({ page }) => {
      await page.goto('/parent/portal');
      await expect(page).toHaveTitle(/Parent Portal/i);

      // Check login form input fields
      const emailInput = page.locator('#parentEmail');
      const passInput = page.locator('#familyPassword');
      await expect(emailInput).toBeVisible();
      await expect(passInput).toBeVisible();

      // Check password visibility toggle
      const toggleEyeBtn = page.locator('#btnTogglePassword');
      await expect(toggleEyeBtn).toBeVisible();
      await expect(passInput).toHaveAttribute('type', 'password');
      await toggleEyeBtn.click();
      await expect(passInput).toHaveAttribute('type', 'text');
      await toggleEyeBtn.click();
      await expect(passInput).toHaveAttribute('type', 'password');
    });

    test('shows friendly error for unregistered email lookup', async ({ page }) => {
      await page.goto('/parent/portal');
      await page.fill('#parentEmail', 'unregistered_probe@gmail.com');
      await page.fill('#familyPassword', 'WrongPass123!');
      
      const submitBtn = page.locator('#btnParentSignIn');
      await submitBtn.click();
      
      // Wait for error banner
      const errorBanner = page.locator('#loginError');
      await expect(errorBanner).toBeVisible({ timeout: 5000 });
      await expect(errorBanner).toContainText(/No parent account found/i);
    });
  });

  // 3. TEACHER PORTAL TESTS
  test.describe('Teacher & Headteacher Portal (/teacher/portal)', () => {
    test('renders teacher portal with auth tabs', async ({ page }) => {
      await page.goto('/teacher/portal');
      await expect(page).toHaveTitle(/Teacher/i);

      // Check auth tabs exist
      const loginTab = page.locator('.auth-tab-btn, button:has-text("Log In")').first();
      await expect(loginTab).toBeVisible();
    });
  });

  // 4. SUPER ADMIN PORTAL TESTS
  test.describe('Super Admin Portal (/admin)', () => {
    test('renders admin login screen', async ({ page }) => {
      await page.goto('/admin');
      const emailInput = page.locator('input[type="email"], #adminEmail');
      const passInput = page.locator('input[type="password"], #adminPassword');
      await expect(emailInput).toBeVisible();
      await expect(passInput).toBeVisible();
    });
  });

});
