# Project Roadmap - NestJS Task Manager

## Fase 1: MVP (Minimum Viable Product) 🚀
*Objetivo: Tener un sistema funcional de tareas con seguridad básica.*
- [x] Configuración inicial de NestJS + Docker + Prisma.
- [x] Módulo de Autenticación (Register/Login con JWT).
- [x] CRUD básico de Tasks vinculado al ID del usuario.
- [x] Documentación inicial con Swagger.

## Fase 2: v1.0 (Robustez y Roles) 🔒
*Objetivo: Implementar control de acceso y persistencia avanzada.*
- [x] Implementación de RBAC (Role-Based Access Control).
- [x] Lógica de **Soft Delete** en el servicio de Prisma.
- [x] Validaciones estrictas de DTOs con `class-validator`.
- [x] Módulo de gestión de usuarios para Admins.

## Fase 3: v2.0 (Escalabilidad y UX Técnica) ⚡
*Objetivo: Mejorar la mantenibilidad y el despliegue.*
- [] Implementación de Tests Unitarios (Jest).
- [] Filtros avanzados en `GET /tasks` (por estado, fecha, prioridad).
- [] Logs de actividad del servidor.
- [] Configuración de CI/CD para despliegue automatizado.
