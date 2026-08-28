import { test as baseTest, expect, type Page } from "@playwright/test";
import { PageManager } from "./pages/pageManager";
import { Navigation } from "./utils/navigation";
import { testData } from "./fixtures/dataFixtures";

export class TestBaseContainer {
  public pages: PageManager;
  public navigation: Navigation;
  public fixtures = testData;

  constructor(page: Page) {
    this.pages = new PageManager(page);
    this.navigation = new Navigation(page);
  }
}

type CustomFixtures = {
  testBase: TestBaseContainer;
};

export const test = baseTest.extend<CustomFixtures>({
  testBase: async ({ page }, use) => {
    await use(new TestBaseContainer(page));
  },
});

export { expect };