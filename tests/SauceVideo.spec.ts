import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/AddItem';
import { CartPage } from '../page-objects/GoCart';
import { CheckoutPage } from '../page-objects/Checkout';
import { users } from '../page-objects/UserLogin';

test.describe('Fluxo de compra para múltiplos usuários', () => {
  test.afterEach(async ({ page }) => {
    const video = await page.video();
    if (video) {
      const path = await video.path();
      console.log('🎥 Vídeo salvo em:', path);
    } else {
      console.log('⚠️ Nenhum vídeo gerado');
    }
  });

  test.afterAll(() => {
    console.log('✅ Todos os testes do arquivo foram concluídos.');
  });

  for (const user of users) {
    test(`Fluxo de compra para ${user.username}`, async ({ page }) => {
      const login = new LoginPage(page);
      const product = new ProductPage(page);
      const cart = new CartPage(page);
      const checkout = new CheckoutPage(page);

      console.log(`🔍 Testando usuário: ${user.username}`);

      await login.goto();
      await page.waitForTimeout(1000);

      await login.login(user.username, user.password);
      await page.waitForTimeout(1000);

      if (user.username === 'locked_out_user') {
        await expect(page.locator('[data-test="error"]'))
          .toContainText('Epic sadface: Sorry, this user has been locked out.');
        await page.waitForTimeout(1000);
        console.log('✅ locked_out_user falhou no login (comportamento esperado)');
        return;
      }

      if (user.username === 'problem_user') {
        await product.addItemToCart('Sauce Labs Backpack');
        await page.waitForTimeout(1000);

        await product.goToCart();
        await page.waitForTimeout(1000);

        await cart.confirmItems();
        await page.waitForTimeout(1000);

        await checkout.fillFirstName('Rhuan');
        await page.waitForTimeout(1000);

        await checkout.fillLastName('Quadros');
        await page.waitForTimeout(1000);

        const firstNameValue = await page.locator('[data-test="firstName"]').inputValue();
        expect(firstNameValue).toBe('Quadros');
        await page.waitForTimeout(1000);

        console.log('✅ problem_user sobrescreveu first_name (bug esperado)');
        return;
      }

      if (user.username === 'error_user') {
        await product.addItemToCart('Sauce Labs Backpack');
        await page.waitForTimeout(1000);

        await product.goToCart();
        await page.waitForTimeout(1000);

        await cart.confirmItems();
        await page.waitForTimeout(1000);

        await checkout.fillFirstName('Rhuan');
        await page.waitForTimeout(1000);

        await checkout.fillLastName('Quadros');
        await page.waitForTimeout(1000);

        const lastNameValue = await page.locator('[data-test="lastName"]').inputValue();
        expect(lastNameValue).toBe('');
        await page.waitForTimeout(1000);

        console.log('✅ error_user não preencheu last_name (bug esperado)');
        return;
      }

      // Fluxo normal para os demais usuários
      await product.addItemToCart('Sauce Labs Backpack');
      await page.waitForTimeout(1000);

      await product.goToCart();
      await page.waitForTimeout(1000);

      expect(await cart.isItemInCart('Sauce Labs Backpack')).toBe(true);
      await page.waitForTimeout(1000);

      await cart.confirmItems();
      await page.waitForTimeout(1000);

      await checkout.fillFirstName('Rhuan');
      await page.waitForTimeout(1000);

      await checkout.fillLastName('Quadros');
      await page.waitForTimeout(1000);

      await checkout.fillPostalCode('12345678');
      await page.waitForTimeout(1000);

      await checkout.finalizePurchase();
      await page.waitForTimeout(1000);

      await expect(page.locator('text=Thank you for your order!')).toBeVisible();
      await page.waitForTimeout(1000);

      console.log(`✅ ${user.username} concluiu o fluxo com sucesso`);
    });
  }
});
