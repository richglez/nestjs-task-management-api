import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Prisma está disponible en toda la app automáticamente
@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
