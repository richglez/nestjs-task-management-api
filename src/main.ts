import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // elimina campos no definidos
            forbidNonWhitelisted: true, // lanza error si manda busra
            transform: true, // convierte tipos automaticamenet
        }),
    );

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
