import { expect, Page } from "@playwright/test";

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async verifyWelcomeMessage() {
        await expect(this.page.locator("p", { hasText: "Hello from the Express Backend!" })).toBeVisible();
    }
}