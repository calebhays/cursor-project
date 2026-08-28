import type { Page } from "@playwright/test";

export class Navigation {
  constructor(private page: Page) {}

  async navigateToHomePage() {
    await this.page.goto("/");
  }
}