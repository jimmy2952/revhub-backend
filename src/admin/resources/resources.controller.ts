import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common'
import { ResourcesService } from './resources.service'
import { CreateResourceDto, UpdateResourceDto } from './resource.dto'

@Controller()
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  findAll(@Query() query) {
    return this.resourcesService.resources(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesService.resource({ id: Number(id) })
  }

  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    const { resourceTypeId, ...otherFields } = createResourceDto
    return this.resourcesService.createResource({
      ...otherFields,
      resourceType: {
        connect: { id: +resourceTypeId },
      },
    })
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    const { resourceTypeId, ...otherFields } = updateResourceDto
    return this.resourcesService.updateResource({
      where: { id: +id },
      data: {
        ...otherFields,
        resourceType: {
          connect: { id: +resourceTypeId },
        },
      },
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesService.deleteResource({ id: +id })
  }
}
