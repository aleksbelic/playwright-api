import { test, expect, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext();
});

test.describe('GET /photos/:id', () => {
  test('returns 200', async () => {
    const response = await apiContext.get('/photos/1');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('albumId', 1);
    expect(body).toHaveProperty(
      'title',
      'accusamus beatae ad facilis cum similique qui sunt'
    );
    expect(body).toHaveProperty(
      'url',
      'https://via.placeholder.com/600/92c952'
    );
    expect(body).toHaveProperty(
      'thumbnailUrl',
      'https://via.placeholder.com/150/92c952'
    );
  });

  test('returns 404', async () => {
    const response = await apiContext.get('/photos/0');
    expect(response.status()).toBe(404);
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});
