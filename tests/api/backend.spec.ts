import { test, expect } from '@playwright/test';
import type { HelloResponse } from '@my-app/shared';

test('backend returns hello message', async ({ request }) => {
    const response = await request.get('/api/hello');
    expect(response.ok()).toBeTruthy();

    const body = await response.json() as HelloResponse;
    expect(body.message).toBe('Hello from the Express Backend!');
});