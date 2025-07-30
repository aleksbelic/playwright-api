import { test, expect, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext();
});

test('GET /comments/:id returns 200', async ({}) => {
  const response = await apiContext.get('/comments/1');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body).toHaveProperty('id', 1);
  expect(body).toHaveProperty('postId', 1);
  expect(body).toHaveProperty('name', 'id labore ex et quam laborum');
  expect(body).toHaveProperty('email', 'Eliseo@gardner.biz');
  expect(body).toHaveProperty(
    'body',
    'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
  );
});

test('GET /comments/:id returns 404', async ({}) => {
  const response = await apiContext.get('/comments/0');
  expect(response.status()).toBe(404);
});

test.afterAll(async () => {
  await apiContext.dispose();
});
