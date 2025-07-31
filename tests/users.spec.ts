import { test, expect, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext();
});

test.describe('GET /users/:id', () => {
  test('returns 200', async () => {
    const response = await apiContext.get('/users/1');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('name', 'Leanne Graham');
    expect(body).toHaveProperty('username', 'Bret');
    expect(body).toHaveProperty('email', 'Sincere@april.biz');
    expect(body).toHaveProperty('address.street', 'Kulas Light');
    expect(body).toHaveProperty('address.suite', 'Apt. 556');
    expect(body).toHaveProperty('address.city', 'Gwenborough');
    expect(body).toHaveProperty('address.zipcode', '92998-3874');
    expect(body).toHaveProperty('address.geo.lat', '-37.3159');
    expect(body).toHaveProperty('address.geo.lng', '81.1496');
    expect(body).toHaveProperty('phone', '1-770-736-8031 x56442');
    expect(body).toHaveProperty('website', 'hildegard.org');
    expect(body).toHaveProperty('company.name', 'Romaguera-Crona');
    expect(body).toHaveProperty(
      'company.catchPhrase',
      'Multi-layered client-server neural-net'
    );
    expect(body).toHaveProperty('company.bs', 'harness real-time e-markets');
  });

  test('returns 404', async () => {
    const response = await apiContext.get('/users/0');
    expect(response.status()).toBe(404);
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});
