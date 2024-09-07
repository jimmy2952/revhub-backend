import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { SharedModule } from 'src/shared.module'
import { HttpRequestLoggerMiddleware } from './common/middleware/http-request-logger.middleware'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminModule } from './admin/admin.module'
import { ResourceTypesModule } from './admin/resource-types/resource-types.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    AdminModule,
    ResourceTypesModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
        children: [
          {
            path: 'resource-types',
            module: ResourceTypesModule,
          },
        ],
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
