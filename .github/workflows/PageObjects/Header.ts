import { expect, type Locator, type Page } from '@playwright/test';

export class HeaderPage {
  readonly page: Page;
  readonly headerIcon: Locator;
  readonly headerTitle: Locator;
  readonly docsLink: Locator;
  apiLink: Locator;
  languageLink: Locator;
  communityLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerIcon = page.getByAltText('Playwright logo');
    this.headerTitle = page.locator('xpath=//a//b[contains(text(), Playwright)]');
    this.docsLink = page.getByRole('link', { name: 'Docs' })
    this.apiLink = page.getByRole('link', { name: 'API', exact: true })
    this.languageLink = page.getByRole('button', { name: 'Node.js'} );
    this.communityLink = page.getByRole('link', { name: 'Community' });
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await expect(this.headerIcon).toBeVisible();
    await expect(this.headerTitle).toBeVisible();
    await expect(this.docsLink).toBeVisible();
    await expect(this.apiLink).toBeVisible();
    await expect(this.languageLink).toBeVisible();

    await this.languageLink.click();
    await this.page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Python' }).click();
  }

  async pageObjectModel() {
    await this.getStarted();
  }
}