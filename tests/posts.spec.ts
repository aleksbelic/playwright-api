import { test, expect, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext();
});

test('GET /posts/:id returns 200', async ({}) => {
  const response = await apiContext.get('/posts/1');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body).toHaveProperty('id', 1);
  expect(body).toHaveProperty('userId', 1);
  expect(body).toHaveProperty(
    'title',
    'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'
  );
  expect(body).toHaveProperty(
    'body',
    'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
  );
});

test('GET /posts/:id returns 404', async ({}) => {
  const response = await apiContext.get('/posts/0');
  expect(response.status()).toBe(404);
});

test.afterAll(async () => {
  await apiContext.dispose();
});
