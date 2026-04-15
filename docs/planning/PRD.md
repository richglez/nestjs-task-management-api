# Product Requirements Document (PRD) - Task Manager API

## 1. Overview
Build a robust and scalable REST API for managing personal and team tasks, ensuring security through JWT and data integrity with PostgreSQL/Prisma.

## 2. User Stories
* **As a user:** I want to register and log in to have a private task space.

* **As a user:** I want to create, edit, and delete my tasks to organize my day.

* **As a user:** I want my deleted tasks to not disappear immediately (Soft Delete) in case I need to recover them.

* **As an Admin:** I want to be able to list and manage all system users to moderate the platform.

## 3. Functional Requirements
* **Authentication:** User registration with encrypted passwords (Bcrypt).

* * **Authorization:** Differentiated roles (`USER`, `ADMIN`) using NestJS Decorators.

* **Persistence:** Use of Prisma to ensure database schemas are synchronized.

* **Documentation:** Auto-generated Swagger for quick endpoint testing.

## 4. Acceptance Criteria
* The system must not allow access to `/tasks` without a valid Bearer Token.

* Passwords in the database **must never** be in plain text.

* The `Soft Delete` must mark a `deletedAt` column instead of executing an actual `DROP/DELETE` command.

## 5. KPIs (Key Performance Indicators)
* **Security:** 0 access breaches on protected paths.

* **Performance:** API responses in less than 200ms for simple CRUD operations.

* * **Quality:** 100% data validation coverage using `class-validator`.
