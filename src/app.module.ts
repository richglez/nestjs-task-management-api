import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Usar variables de entorno en todo el proyecto
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
