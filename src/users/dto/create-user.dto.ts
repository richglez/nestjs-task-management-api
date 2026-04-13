import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
