import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extrae el token del header
            secretOrKey: config.getOrThrow<string>('JWT_SECRET'), // verifica secret
        });
    }

    // Si el token es valido, esto  se ejecuta automaticamente
    // y lo que retornes se inyecta en req.user
    validate(payload: { sub: string; email: string }) {
        return { id: payload.sub, email: payload.email };
    }
}
