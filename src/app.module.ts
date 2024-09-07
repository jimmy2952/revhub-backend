import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { HttpRequestLoggerMiddleware } from './common/middleware/http-request-logger.middleware'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ResourceTypesModule } from './resource-types/resource-types.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ResourceTypesModule,
    RouterModule.register([
      {
        path: 'resource-types',
        module: ResourceTypesModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestLoggerMiddleware).forRoutes('*')
  }
}
