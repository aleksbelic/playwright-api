import { test, expect, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext();
});

test.describe('GET /todos/:id', () => {
  test('returns 200', async () => {
    const response = await apiContext.get('/todos/1');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('userId', 1);
    expect(body).toHaveProperty('title', 'delectus aut autem');
    expect(body).toHaveProperty('completed', false);
  });

  test('returns 404', async () => {
    const response = await apiContext.get('/todos/0');
    expect(response.status()).toBe(404);
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});
