import {
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('upload_image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @Req() request: Request,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const response = this.appService.uploadFile(image)
    console.log(response)
    return response
  }
}
