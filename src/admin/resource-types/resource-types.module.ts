import { Module } from '@nestjs/common'
import { ResourceTypesController } from './resource-types.controller'
import { ResourceTypesService } from './resource-types.service'

@Module({
  imports: [],
  controllers: [ResourceTypesController],
  providers: [ResourceTypesService],
})
export class ResourceTypesModule {}
