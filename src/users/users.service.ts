import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const existingEmail = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
        });

        if (existingEmail) throw new ConflictException('Email already exists');

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        return this.prisma.user.create({
            data: { ...createUserDto, password: hashedPassword },
            omit: { password: true },
        });
    }

    findAll() {
        return this.prisma.user.findMany({
            where: { deletedAt: null },
            omit: { password: true }, // omite si omitir
        });
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findFirst({
            where: { id, deletedAt: null }, // encuentra el el usuario que no tenga null osea que exista
            omit: { password: true }, // prisma 7 - excluye el campo
        });

        if (!user) throw new NotFoundException(`User not found`);

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        // Encuentra el usuario primero por su id
        await this.findOne(id);

        // Si viene password en el updateUserDto.
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(
                updateUserDto.password,
                10,
            );
        }

        return this.prisma.user.update({
            where: { id }, // // update nadamas permite filtar campos o propiedades unicas @unique
            data: updateUserDto,
            omit: { password: true }, // no devolver esta columna
        });
    }

    async remove(id: string) {
        // Espera a verificar si existe el usuario por su propiedad id
        await this.findOne(id);

        return this.prisma.user.update({
            where: { id }, // donde id sea igual a id
            data: { deletedAt: new Date() }, // Actualizar nadamas el estado de eliminado
        }); // mantiene soft delete
    }
}
