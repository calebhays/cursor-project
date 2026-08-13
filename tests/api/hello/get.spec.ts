import { test, expect } from '@playwright/test';
import { z } from 'zod';

// Explicit Success Contract (enforces status MUST be 'success' on 200 OK)
const HelloSuccessContract = z.object({
  status: z.literal('success'),
  message: z.string().min(5),
  timestamp: z.iso.datetime(), // Modern Zod 4 syntax
});

// Standard Error Contract (for 4xx / 5xx responses)
const HelloErrorContract = z.object({
  status: z.literal('error'),
  message: z.string(),
  timestamp: z.iso.datetime().optional(),
});

test.describe('GET /api/hello', () => {

  // 1. CONTRACT & DATA INTEGRITY (Happy Path)
  test('Status & Contract: Should return 200 and match the pinned success schema', async ({ request }) => {
    const response = await request.get('/api/hello');

    // 1. Check HTTP Status
    expect(response.status()).toBe(200);

    // 2. Validate Contract (throws detailed ZodError automatically if invalid)
    const body = await response.json();
    const data = HelloSuccessContract.parse(body);

    // 3. Explicit Data & Status Assertions
    expect(data.status).toBe('success');
    expect(data.message).toContain('Hello from the Express Backend');
    expect(Date.parse(data.timestamp)).toBeDefined();
  });

  // 2. HEADERS & CORS
  test('Headers: Should return the correct JSON content-type and CORS headers', async ({ request }) => {
    const response = await request.get('/api/hello');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['access-control-allow-origin']).toBeDefined();
  });

  // 3. NEGATIVE TEST: UNSUPPORTED HTTP METHOD
  test('HTTP Method: Should reject POST requests to GET endpoint with 405 or 404', async ({ request }) => {
    const response = await request.post('/api/hello', {
      data: { invalid: true },
    });

    // Validates that POST requests do not return 200 OK
    expect([404, 405]).toContain(response.status());
  });

  // 4. EDGE CASE: UNEXPECTED QUERY PARAMS
  test('Resilience: Should safely ignore unexpected query parameters without breaking contract', async ({ request }) => {
    const response = await request.get('/api/hello?randomParam=12345&foo=bar');

    expect(response.status()).toBe(200);

    const body = await response.json();
    const data = HelloSuccessContract.parse(body);

    expect(data.status).toBe('success');
  });

  // 5. NEGATIVE TEST: INVALID PATH / 404 CONTRACT
  test('Error Handling: Should return 404 for non-existent endpoint path', async ({ request }) => {
    const response = await request.get('/api/hello/unknown-route');

    expect(response.status()).toBe(404);
  });

});