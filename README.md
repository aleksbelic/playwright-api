## Playwright API Testing Project

This project demonstrates API test automation using [Playwright](https://playwright.dev).  
Tests are written against the [{JSON} Placeholder](https://jsonplaceholder.typicode.com/), a mock REST API built on JSON Server and LowDB, ideal for prototyping and training.

### Why Playwright?

While Playwright is commonly used for UI testing, it also supports powerful API testing capabilities — making it a versatile tool for full-stack test automation.

### Endpoints coverage

ALBUMS

- GET `/albums/:id` returns 200
- GET `/albums/:id` returns 404

---

COMMENTS

- GET `/comments/:id` returns 200
- GET `/comments/:id` returns 404
- GET `/comments/?postId=:id` returns 200

---

COMMON

- GET `/posts` returns 200
- GET `/comments` returns 200
- GET `/albums` returns 200
- GET `/photos` returns 200
- GET `/todos` returns 200
- GET `/users` returns 200

---

PHOTOS

- GET `/photos/:id` returns 200
- GET `/photos/:id` returns 404

---

POSTS

- GET `/posts/:id` returns 200
- GET `/posts/:id` returns 404
- GET `/posts/:id/comments` returns 200
- POST `/posts` returns 201
- PUT `/posts/:id` returns 200
- PATCH `/posts/:id` returns 200

---

TODOS

- GET `/todos/:id` returns 200
- GET `/todos/:id` returns 404

---

USERS

- GET `/users/:id` returns 200
- GET `/users/:id` returns 404
