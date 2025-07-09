import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/AddItem';
import { CartPage } from '../page-objects/GoCart';
import { CheckoutPage } from '../page-objects/Checkout';
import { users } from '../page-objects/UserLogin';

test.describe('Fluxo de compra para múltiplos usuários', () => {
  test.afterEach(async ({ page }) => {
    await page.close();
    console.log('Página fechada após o teste');
  });

  test.afterAll(() => {
    console.log('Todos os testes do arquivo foram concluídos.');  
  });

  for (const user of users) {
    test(`Fluxo de compra para ${user.username}`, async ({ page }) => {
      const login = new LoginPage(page);
      const product = new ProductPage(page);
      const cart = new CartPage(page);
      const checkout = new CheckoutPage(page);

      console.log(`Testando usuário: ${user.username}`);

      await login.goto();
      await login.login(user.username, user.password);

      if (user.username === 'locked_out_user') {
        await expect(page.locator('[data-test="error"]'))
          .toContainText('Epic sadface: Sorry, this user has been locked out.');
        console.log('✅ locked_out_user falhou no login (comportamento esperado)');
        return;
      }

      if (user.username === 'problem_user') {
        await product.addItemToCart('Sauce Labs Backpack');
        await product.goToCart();
        await cart.confirmItems();
        await checkout.fillFirstName('Rhuan');
        await checkout.fillLastName('Quadros');

        const firstNameValue = await page.locator('[data-test="firstName"]').inputValue();
        expect(firstNameValue).toBe('Quadros');

        console.log('✅ problem_user sobrescreveu first_name (bug esperado)');
        return;
      }

      if (user.username === 'error_user') {
        await product.addItemToCart('Sauce Labs Backpack');
        await product.goToCart();
        await cart.confirmItems();
        await checkout.fillFirstName('Rhuan');
        await checkout.fillLastName('Quadros');

        const lastNameValue = await page.locator('[data-test="lastName"]').inputValue();
        expect(lastNameValue).toBe('');

        console.log('✅ error_user não preencheu last_name (bug esperado)');
        return;
      }

      // Fluxo normal para os demais usuários
      await product.addItemToCart('Sauce Labs Backpack');
      await product.goToCart();
      expect(await cart.isItemInCart('Sauce Labs Backpack')).toBe(true);

      await cart.confirmItems();
      await checkout.fillFirstName('Rhuan');
      await checkout.fillLastName('Quadros');
      await checkout.fillPostalCode('12345678');
      await checkout.finalizePurchase();

      await expect(page.locator('text=Thank you for your order!')).toBeVisible();
      console.log(`✅ ${user.username} concluiu o fluxo com sucesso`);
    });
  }
});