import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // para leer las variables de entorno
import { PassportStrategy } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extrae el token del header
            secretOrKey: config.getOrThrow<string>('JWT_SECRET'), // para verificar que el token sea auténtico y no haya sido manipulado.
        });
    }

    // Si el token es valido, esto  se ejecuta automaticamente
    // Passport decodifica la informacion que se guardo en payload(los datos del usuario que vienen en el token.)
    // y lo que retornes se inyecta en req.user
    validate(payload: { sub: string; email: string; role: Role }) {
        return { id: payload.sub, email: payload.email, role: payload.role };
    }
}
