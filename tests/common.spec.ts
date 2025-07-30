import { test, expect, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext();
});

const paths = ['/posts', '/comments', '/albums', '/photos', '/todos', '/users'];

for (const path of paths) {
  test(`common GET ${path} 200`, async ({}) => {
    const getRequest = await apiContext.get(path);
    expect(getRequest.status()).toBe(200);
  });
}

test.afterAll(async () => {
  await apiContext.dispose();
});
