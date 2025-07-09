import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async isCheckoutPageVisible(): Promise<boolean> {
    const title = this.page.locator('text=Checkout: Your Information');
    return await title.isVisible();
}
  async fillFirstName(name: string) {
  await this.page.locator('#first-name').waitFor({ state: 'visible' });  
  await this.page.fill('#first-name', name);
}
  async fillLastName(lastname: string) {
    await this.page.locator('#last-name').waitFor({ state: 'visible' });  
  await this.page.fill('#last-name', lastname);
}
  async fillPostalCode(code: string) {
    await this.page.locator('#postal-code').waitFor({ state: 'visible' });  
  await this.page.fill('#postal-code', code);
}
  async finalizePurchase() {
    await this.page.click('#continue');
    await this.page.click('#finish');
  }
}
