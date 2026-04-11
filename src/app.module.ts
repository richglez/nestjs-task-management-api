import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Usar variables de entorno en todo el proyecto
        }),
        TasksModule,
        PrismaModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
