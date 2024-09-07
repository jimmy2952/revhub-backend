import { Module } from '@nestjs/common'
import { SharedModule } from 'src/shared.module'
import { ResourceTypesController } from './resource-types.controller'
import { ResourceTypesService } from './resource-types.service'

@Module({
  imports: [SharedModule],
  controllers: [ResourceTypesController],
  providers: [ResourceTypesService],
})
export class ResourceTypesModule {}
