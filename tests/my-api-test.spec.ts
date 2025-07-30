import { test, expect } from '@playwright/test';

let apiContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://jsonplaceholder.typicode.com',
  })
});

const paths = ['/posts', '/comments', '/albums', '/photos', '/todos', '/users'];

for (const path of paths) {
  test(`GET ${path} 200`, async ({ }) => {
    const getRequest = await apiContext.get(path);
    expect(getRequest.status()).toBe(200);
  });
}

