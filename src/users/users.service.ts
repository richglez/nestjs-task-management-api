import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        return this.prisma.user.create({
            data: { ...createUserDto, password: hashedPassword },
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
            where: { id, deletedAt: null }, // encuentra el el usuario que no tenga nullo de borrado osea que exista
            omit: { password: true }, // prisma 7 - excluye el campo
        });

        if (!user) throw new NotFoundException(`User ${id} not found`);

        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        // Encuentra el id del usuario para continuar
        await this.findOne(id);

        return this.prisma.user.update({
            where: { id }, // // update nadamas permite filtar campos o propiedades unicas @unique
            data: updateUserDto,
        });
    }

    async remove(id: string) {
        // Espera a verificar si existe el id
        await this.findOne(id);

        return this.prisma.user.update({
            where: { id }, // donde id sea igual a id
            data: { deletedAt: new Date() }, // Actualizar nadamas el estado de eliminado
        }); // mantiene soft delete
    }
}
