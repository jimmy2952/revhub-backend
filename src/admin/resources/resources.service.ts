import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { Resource, Prisma } from '@prisma/client'

@Injectable()
export class ResourcesService {
  constructor(private prisma: PrismaService) {}

  async resources(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ResourceWhereUniqueInput
    where?: Prisma.ResourceWhereInput
    orderBy?: Prisma.ResourceOrderByWithRelationInput
  }): Promise<Resource[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.resource.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async resource(
    ResourceWhereUniqueInput: Prisma.ResourceWhereUniqueInput,
  ): Promise<Resource> {
    return this.prisma.resource.findUnique({
      where: ResourceWhereUniqueInput,
    })
  }

  async createResource(data: Prisma.ResourceCreateInput): Promise<Resource> {
    return this.prisma.resource.create({ data })
  }

  async updateResource(params: {
    where: Prisma.ResourceWhereUniqueInput
    data: Prisma.ResourceUpdateInput
  }): Promise<Resource> {
    const { where, data } = params
    return this.prisma.resource.update({ where, data })
  }

  async deleteResource(
    where: Prisma.ResourceWhereUniqueInput,
  ): Promise<Resource> {
    return this.prisma.resource.delete({ where })
  }
}
