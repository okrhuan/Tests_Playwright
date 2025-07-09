import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

async addItemToCart(itemName: string) {
  const product = this.page.locator('.inventory_item', { hasText: itemName });
  await product.locator('button.btn.btn_primary.btn_small.btn_inventory').click();
}

async goToCart() {
    await this.page.click('#shopping_cart_container');
  }
}
