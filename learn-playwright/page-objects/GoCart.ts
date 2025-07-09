import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async isItemInCart(itemName: string): Promise<boolean> {
  // Espera que o texto do item esteja presente na página do carrinho
  const item = this.page.locator(`.cart_item:has-text("${itemName}")`);
  return await item.isVisible();
}
  async confirmItems() {
    await this.page.click('#checkout');
  }
}
