import { Injectable } from '@nestjs/common';
import { Upload } from './entities/upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}

  async saveFile(file: Express.Multer.File) {
    const _file = new Upload();
    _file.fileName = uuidv4();
    _file.contentLength = file.size;
    _file.contentType = file.mimetype;
    _file.url = `data:image/jpeg;base64,${file.buffer.toString('base64')}`;

    return await this.uploadRepository.save(_file);
  }
}
