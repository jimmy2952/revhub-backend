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
import { CreateResourceEventDto, UpdateResourceTypeDto } from './dto'
import { ResourceTypesService } from './resource-types.service'

@Controller()
export class ResourceTypesController {
  constructor(private readonly resourceTypesService: ResourceTypesService) {}

  @Get()
  findAll(@Query() query) {
    return this.resourceTypesService.resourceTypes(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceTypesService.resourceType({ id: Number(id) })
  }

  @Post()
  create(@Body() createResourceTypeDto: CreateResourceEventDto) {
    return this.resourceTypesService.createResourceType(createResourceTypeDto)
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceTypeDto: UpdateResourceTypeDto,
  ) {
    return this.resourceTypesService.updateResourceType({
      where: { id: Number(id) },
      data: updateResourceTypeDto,
    })
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceTypesService.deleteResourceType({ id: Number(id) })
  }
}
