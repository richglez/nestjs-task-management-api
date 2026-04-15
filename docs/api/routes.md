# API Endpoints

## Auth Routes
| Method | Endpoint       | Description                       | Auth   |
| ------ | -------------- | --------------------------------- | ------ |
| POST   | /auth/register | Register auth new user            | Public |
| GET    | /auth/login    | Login auth verify credentials JWT | Public |

## User Routes
| Method | Endpoint    | Description                     | Auth        |
| ------ | ----------- | ------------------------------- | ----------- |
| POST   | /users      | Register new user               | JWT (Admin) |
| GET    | /users      | Get all users registered in db  | JWT (Admin) |
| GET    | /users/{id} | Get specific user               | JWT         |
| PATCH  | /users/{id} | Update partial on existing user | JWT         |
| DELETE | /users/{id} | Soft Delete user                | JWT         |

## Tasks Routes
| Method | Endpoint     | Description                      | Auth   |
| ------ | ------------ | -------------------------------- | ------ |
| POST   | /tasks       | Create new task user             | JWT    |
| GET    | /tasks       | Get all tasks registered in db   | JWT    |
| GET    | /tasks/{id}  | Get specific task details        | JWT    |
| PATCH  | /tasks/{id}  | Update partial on existing task  | JWT    |
| DELETE | /tasks/{id}  | Delete user task                 | JWT    |

> ### Note:
> Auth Header: All routes marked with JWT require the header Authorization: Bearer <token>.
> Soft Delete: The path DELETE /users/{id} does not physically delete the record, but changes its state to inactive.



