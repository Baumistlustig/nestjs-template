import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogInterceptor } from './log/services/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
  });

  app.useGlobalInterceptors(new LogInterceptor());

  await app.listen(3000);
}
bootstrap();
