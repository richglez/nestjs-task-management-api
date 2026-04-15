## Architecture Overview ##
This project follows a layered architecture based on the principles of separation of concerns and scalability. Each layer has a clear responsibility, allowing the application to be maintainable and easy to extend.

# Request Flow
The system processes requests through the following pipeline:
```
Client
   ↓
HTTP Request (REST / Swagger + JWT)
   ↓
Guards (Authentication & Authorization)
   ↓
Controllers (Routing Layer)
   ↓
Services (Business Logic)
   ↓
ORM (Prisma Client)
   ↓
Database (PostgreSQL)
```

# Architecture Layers
# 1. Client

The client represents any external consumer of the API:

- Frontend applications (React, Angular, etc.)
- API testing tools (Postman, Swagger)

Requests are sent via HTTP using RESTful endpoints and may include a JWT token for authentication.

# 2. HTTP Layer
- REST API design
- API documentation via Swagger
- JWT-based authentication

Handles:

- Request/response format (JSON)
- Headers (Authorization: Bearer Token)

# 3. Guards (Security Layer)

Responsible for authentication and authorization before reaching the controller.

- [JwtAuthGuard] → Validates JWT tokens
- [RolesGuard] → Restricts access based on user roles

This ensures:

- Only authenticated users access protected routes
- Role-based access control (RBAC)


# 4. Controllers (Routing Layer)

Controllers handle incoming requests and define API routes.
```
@Controller('tasks')
```
Responsibilities:

- Map endpoints (GET, POST, PATCH, DELETE)
- Validate incoming data (DTOs + Pipes)
- Delegate logic to services

Controllers should remain thin and not contain business logic.

# 5. Services (Business Logic Layer)

Services contain the core application logic.
```
@Injectable()
```

Responsibilities:

- Process data
- Apply business rules
- Communicate with the database via Prisma

This layer ensures the application logic is reusable and testable.

# 6. ORM Layer (Prisma)
- Prisma Client provides type-safe database queries
- Abstracts raw SQL queries
- Ensures better developer experience and fewer runtime errors
Example:
```
return this.prisma.task.findMany({
  where: { deletedAt: null },
});
```
# 7. Database Layer
- PostgreSQL database
- Running inside a Docker container

Responsibilities:
- Persistent data storage
- Data integrity and relationships


# 🔐 Security Design
- JWT-based authentication
- Role-based authorization (RBAC)
- Route protection via Guards


# 📦 Key Benefits of This Architecture
- Scalability → Easy to extend with new modules
- Maintainability → Clear separation of responsibilities
- Testability → Business logic isolated in services
- Type Safety → Prisma reduces runtime errors
- Security → Guards enforce access control
