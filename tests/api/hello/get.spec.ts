import { test, expect } from '@playwright/test';
import { z } from 'zod';

// THE PINNED CONTRACT (Second Key)
const HelloContract = z.object({
  message: z.string().min(5),
  timestamp: z.iso.datetime(), // Modern Zod 4 syntax
  status: z.enum(['success', 'error']),
});

test.describe('GET /api/hello', () => {

  test('Status & Contract: Should return 200 and match the pinned schema', async ({ request }) => {
    const response = await request.get('/api/hello');
    
    // 1. Check Status
    expect(response.status()).toBe(200);

    // 2. Check Contract
    const body = await response.json();
    const result = HelloContract.safeParse(body);

    if (!result.success) {
      const readableError = z.treeifyError(result.error);
      console.error('Contract Violation:', JSON.stringify(readableError, null, 2));
    }
    
    expect(result.success).toBe(true);
  });

  test('Headers: Should return the correct JSON content-type', async ({ request }) => {
    const response = await request.get('/api/hello');
    
    // Verify headers separately from the data
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['access-control-allow-origin']).toBeDefined();
  });

  test('Data Accuracy: Should contain the expected greeting message', async ({ request }) => {
    const response = await request.get('/api/hello');
    const body = await response.json();

    // Verify specific business logic
    expect(body.message).toContain('Hello from the Express Backend');
  });

});