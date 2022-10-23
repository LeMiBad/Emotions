import { NestFactory } from '@nestjs/core';
import { AppModule as ApiModule, AppModuleServer } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation.pipe';
import { createProxyMiddleware } from 'http-proxy-middleware';

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const initSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('GROWTH TEAMS: Тот самый хакатон')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('GROWTH TEAMS')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/v1/swagger', app, document);
};

async function bootstrap() {
    const api = await NestFactory.create(ApiModule);
    const app = await NestFactory.create(AppModuleServer);

    api.setGlobalPrefix('/api/v1');
    initSwagger(api);
    api.useGlobalPipes(new ValidationPipe());

    const CLIENT_SERVICE_URL = 'http://localhost:3001';
    const API_SERVICE_URL = 'http://localhost:4000';

    app.use(
        '/api/v1/',
        createProxyMiddleware({
            target: API_SERVICE_URL,
            changeOrigin: true,
        }),
    );

    app.use(
        createProxyMiddleware({
            target: CLIENT_SERVICE_URL,
            changeOrigin: true,
        }),
    );

    await api.listen(port, () => {
        if (!isProduction) {
            console.log(`Server listening on http://localhost:${port}/`);
        }
    });

    await app.listen(4001, () => {
        if (!isProduction) {
            console.log(`Server listening on http://localhost:${port}/`);
        }
    });
}

bootstrap();
