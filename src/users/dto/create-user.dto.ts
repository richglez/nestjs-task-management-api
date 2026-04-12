import { Role } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    @IsEnum(Role)
    role: Role;
}
