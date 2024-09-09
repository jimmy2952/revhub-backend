import { STATUS } from '@prisma/client'

export class CreateResourceDto {
  name: string
  description: string
  resourceUrl: string
  imageUrl?: string
  status?: STATUS
  resourceTypeId: string
}

export class UpdateResourceDto {
  name?: string
  description?: string
  resourceUrl?: string
  imageUrl?: string
  status?: STATUS
  resourceTypeId?: string
}
