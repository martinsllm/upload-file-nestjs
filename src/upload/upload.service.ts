import { Injectable, NotFoundException } from '@nestjs/common';
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

  async saveFile(file: Express.Multer.File): Promise<Upload> {
    const _file = new Upload();
    _file.fileName = uuidv4();
    _file.contentLength = file.size;
    _file.contentType = file.mimetype;
    _file.url = `data:image/jpeg;base64,${file.buffer.toString('base64')}`;

    return await this.uploadRepository.save(_file);
  }

  async findAll(): Promise<Upload[]> {
    return this.uploadRepository.find();
  }

  async findOne(id: number): Promise<Upload> {
    const file = await this.uploadRepository.findOneBy({ id });

    if (!file) {
      throw new NotFoundException('File not found!');
    }

    return file;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.uploadRepository.delete(id);
  }

  async update(id: number, file: Express.Multer.File): Promise<void> {
    const _file = await this.findOne(id);

    _file.contentLength = file.size;
    _file.contentType = file.mimetype;
    _file.url = `data:image/jpeg;base64,${file.buffer.toString('base64')}`;

    await this.uploadRepository.update(id, _file);
  }
}
