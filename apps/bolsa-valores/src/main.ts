import { NestFactory } from '@nestjs/core';
import { BolsaValoresModule } from './bolsa-valores.module';

async function bootstrap() {
  const app = await NestFactory.create(BolsaValoresModule);
  await app.listen(3001);
}
bootstrap();
