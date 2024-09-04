import { NestFactory } from '@nestjs/core'
import { AppModule } from './src/app.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)

  // 你可以在這裡執行任何你想要的代碼
  console.log(process.env.R2_BUCKET)

  await app.close()
}

bootstrap()
