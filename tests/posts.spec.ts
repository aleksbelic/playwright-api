import { test, expect, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext();
});

test.describe('GET /posts/:id', () => {
  test('returns 200', async () => {
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

  test('returns 404', async () => {
    const response = await apiContext.get('/posts/0');
    expect(response.status()).toBe(404);
  });
});

test('GET /posts/:id/comments returns 200', async () => {
  const response = await apiContext.get('/posts/1/comments');

  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();
  expect(body.length).toBe(5);

  // comment 1
  expect(body[0]).toHaveProperty('id', 1);
  expect(body[0]).toHaveProperty('postId', 1);
  expect(body[0]).toHaveProperty('name', 'id labore ex et quam laborum');
  expect(body[0]).toHaveProperty('email', 'Eliseo@gardner.biz');
  expect(body[0]).toHaveProperty(
    'body',
    'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
  );

  // comment 2
  expect(body[1]).toEqual({
    id: 2,
    postId: 1,
    name: 'quo vero reiciendis velit similique earum',
    email: 'Jayne_Kuhic@sydney.com',
    body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
  });

  // comment 3
  expect(body[2]).toEqual({
    id: 3,
    postId: 1,

    name: 'odio adipisci rerum aut animi',
    email: 'Nikita@garfield.biz',
    body: 'quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione',
  });

  // comment 4
  expect(body[3]).toEqual({
    id: 4,
    postId: 1,
    name: 'alias odio sit',
    email: 'Lew@alysha.tv',
    body: 'non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati',
  });

  // comment 5
  expect(body[4]).toEqual({
    id: 5,
    postId: 1,
    name: 'vero eaque aliquid doloribus et culpa',
    email: 'Hayden@althea.biz',
    body: 'harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et',
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});
