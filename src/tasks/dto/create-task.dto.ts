import { Priority, Status } from '@prisma/client';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;

    @IsEnum(Priority)
    @IsOptional()
    priority?: Priority;

    @IsString()
    userId: string;
}
