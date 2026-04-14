import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Verificar identidad
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {} //  heredar toda la lógica de autenticación de la librería Passport. El parámetro 'jwt' le indica que debe usar la estrategia de JSON Web Tokens para validar el acceso
