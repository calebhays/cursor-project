import type { Page } from "@playwright/test";
import { HomePage } from "./home.page";

export class PageManager {
  private homePage?: HomePage;

  constructor(private page: Page) {}

  // Lazily instantiates pages only when called
  onHomePage(): HomePage {
    if (!this.homePage) {
      this.homePage = new HomePage(this.page);
    }
    return this.homePage;
  }
}