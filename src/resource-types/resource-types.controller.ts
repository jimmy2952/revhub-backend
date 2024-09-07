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

  @Post()
  create(@Body() createResourceTypeDto: CreateResourceEventDto) {
    return this.resourceTypesService.createResourceType(createResourceTypeDto)
  }

  @Get()
  findAll(@Query() query) {
    return this.resourceTypesService.resourceTypes(query)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.resourceTypesService.resourceType({ id })
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateResourceTypeDto: UpdateResourceTypeDto,
  ) {
    return this.resourceTypesService.updateResourceType({
      where: { id },
      data: updateResourceTypeDto,
    })
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.resourceTypesService.deleteResourceType({ id })
  }
}
