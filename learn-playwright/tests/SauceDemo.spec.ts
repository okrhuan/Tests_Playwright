import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/LoginPage';
import { ProductPage } from '../page-objects/AddItem';
import { CartPage } from '../page-objects/GoCart';
import { CheckoutPage } from '../page-objects/Checkout';
import { users } from '../page-objects/UserLogin';

for (const user of users) {
  test(`Fluxo de compra para ${user.username}`, async ({ page }) => {
    const login = new LoginPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    console.log(`Testando usuário: ${user.username}`);

    // Tenta fazer login
    await login.goto();
    await login.login(user.username, user.password);

    // ======== TRATAMENTO PARA locked_out_user ========
    if (user.username === 'locked_out_user') {
      await expect(page.locator('[data-test="error"]'))
        .toContainText('Epic sadface: Sorry, this user has been locked out.');
      console.log('✅ locked_out_user falhou no login (comportamento esperado)');
      return;
    }

    // ======== TRATAMENTO PARA problem_user ========
    if (user.username === 'problem_user') {
      // Fluxo normal até o checkout
      await product.addItemToCart('Sauce Labs Backpack');
      await product.goToCart();
      await cart.confirmItems();

      // Preenche campos (problema: last_name sobrescreve first_name)
      await checkout.fillFirstName('Rhuan');
      await checkout.fillLastName('Quadros');

      // Verifica se o first_name foi sobrescrito
      const firstNameValue = await page.locator('[data-test="firstName"]').inputValue();
      expect(firstNameValue).toBe('Quadros'); // First name foi substituído
      
      console.log('✅ problem_user sobrescreveu first_name (bug esperado)');
      return;
    }

    // ======== TRATAMENTO PARA error_user ========
    if (user.username === 'error_user') {
      // Fluxo normal até o checkout
      await product.addItemToCart('Sauce Labs Backpack');
      await product.goToCart();
      await cart.confirmItems();

      // Tenta preencher last name (não deve funcionar)
      await checkout.fillFirstName('Rhuan');
      await checkout.fillLastName('Quadros');

      // Verifica se o last_name permanece vazio
      const lastNameValue = await page.locator('[data-test="lastName"]').inputValue();
      expect(lastNameValue).toBe(''); // Campo não foi preenchido
      
      console.log('✅ error_user não preencheu last_name (bug esperado)');
      return;
    }

    // ======== FLUXO NORMAL (standard_user, visual_user) ========
    await product.addItemToCart('Sauce Labs Backpack');
    await product.goToCart();
    expect(await cart.isItemInCart('Sauce Labs Backpack')).toBe(true);

    await cart.confirmItems();
    await checkout.fillFirstName('Rhuan');
    await checkout.fillLastName('Quadros');
    await checkout.fillPostalCode('81830325');
    await checkout.finalizePurchase();

    await expect(page.locator('text=Thank you for your order!')).toBeVisible();
    console.log(`✅ ${user.username} concluiu o fluxo com sucesso`);
  });
}