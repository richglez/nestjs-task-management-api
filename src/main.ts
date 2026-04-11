import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Task Manager API')
        .setDescription('API for managing tasks')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

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
