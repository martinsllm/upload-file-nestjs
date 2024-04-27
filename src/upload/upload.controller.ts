import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.saveFile(file);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.uploadService.findOne(id);
  }
}
