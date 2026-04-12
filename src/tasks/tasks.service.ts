import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    create(createTaskDto: CreateTaskDto) {
        return this.prisma.task.create({ data: createTaskDto });
    }

    findAll() {
        return this.prisma.task.findMany({
            where: { deletedAt: null }, // traeme todas las tareas que no se han borrado donde deletedAt no se le halla aplicado
        });
    }

    async findOne(id: string) {
        // Validar existencias por un id y los que tienen no como estado deleted
        const task = await this.prisma.task.findFirst({
            where: { id, deletedAt: null }, // Dame el primer task con este id que NO esté eliminado
        });

        if (!task) throw new NotFoundException(`Task ${id} not found`);

        return task;
    }

    async update(id: string, updateTaskDto: UpdateTaskDto) {
        await this.findOne(id); // valida que exista y no esté soft-deleted

        return this.prisma.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }

    async remove(id: string) {
        // Validar existencia
        await this.findOne(id); // Funcion para ver si existe el id

        // soft delete — no borra el registro, solo marca deletedAt
        return this.prisma.task.update({
            where: { id },
            data: { deletedAt: new Date() }, // actualizar nadamas el estado de eliminado
        });
    }
}
