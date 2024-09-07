import { Module } from '@nestjs/common'
import { ResourceTypesController } from './resource-types.controller'
import { ResourceTypesService } from './resource-types.service'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [ResourceTypesController],
  providers: [ResourceTypesService, PrismaService],
})
export class ResourceTypesModule {}
