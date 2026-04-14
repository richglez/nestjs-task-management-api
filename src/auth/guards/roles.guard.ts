import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

interface AuthenticatedUser {
    id: string;
    email: string;
    role: Role;
}

// Verificar permisos por roles
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // 1. Leer qué roles requiere el endpoint
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        // Si no tiene @Roles() → endpoint libre para cualquier autenticado
        if (!requiredRoles) return true;

        // 2. Leer el usuario del request (lo puso JwtStrategy en req.user)
        const request = context
            .switchToHttp()
            .getRequest<Request & { user: AuthenticatedUser }>();

        // 3. Verificar si el rol del usuario está en los roles requeridos
        return requiredRoles.includes(request.user.role);
    }
}
