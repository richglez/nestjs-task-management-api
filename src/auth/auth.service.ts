import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async registerAuth(registerDto: RegisterDto) {
        // 1. Primero verificar si el email existe
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });

        if (existingEmail) throw new ConflictException('Email already exists'); // solo se esperan emails unicos

        // 2. Si el email no exite entonces, hashear el password
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        // 3. Guardar en DB
        return this.prisma.user.create({
            data: { ...registerDto, password: hashedPassword },
            omit: { password: true },
        });
    }

    async loginAuth(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // 1. Buscar usuario por email
        const existingUser = await this.prisma.user.findUnique({
            where: { email }, // donde email === email
        });

        // 2. Si no existe → error
        if (!existingUser)
            throw new UnauthorizedException('Invalid credentials');

        // 3. Comparar password con el hash → si no coincide → error
        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password,
        );
        if (!isPasswordValid)
            throw new UnauthorizedException('Invalid credentials');

        // De esto hay una sesion

        // 4. Generar JWT
        const payload = {
            sub: existingUser.id,
            email: existingUser.email,
            role: existingUser.role,
        };
        const token = await this.jwtService.signAsync(payload);
        return { access_token: token };
    }
}
