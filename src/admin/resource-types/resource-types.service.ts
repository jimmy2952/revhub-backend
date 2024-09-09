import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma.service'
import { ResourceType, Prisma } from '@prisma/client'

@Injectable()
export class ResourceTypesService {
  constructor(private prisma: PrismaService) {}

  async resourceTypes(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ResourceTypeWhereUniqueInput
    where?: Prisma.ResourceTypeWhereInput
    orderBy?: Prisma.ResourceTypeOrderByWithRelationInput
  }): Promise<ResourceType[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.resourceType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async resourceType(
    resourceTypeWhereUniqueInput: Prisma.ResourceTypeWhereUniqueInput,
  ): Promise<ResourceType | null> {
    return this.prisma.resourceType.findUnique({
      where: resourceTypeWhereUniqueInput,
    })
  }

  async createResourceType(
    data: Prisma.ResourceTypeCreateInput,
  ): Promise<ResourceType> {
    return this.prisma.resourceType.create({
      data,
    })
  }

  async updateResourceType(params: {
    where: Prisma.ResourceTypeWhereUniqueInput
    data: Prisma.ResourceTypeUpdateInput
  }): Promise<ResourceType> {
    const { where, data } = params
    return this.prisma.resourceType.update({
      data,
      where,
    })
  }

  async deleteResourceType(
    where: Prisma.ResourceTypeWhereUniqueInput,
  ): Promise<ResourceType> {
    return this.prisma.resourceType.delete({
      where,
    })
  }
}
