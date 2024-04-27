import { Module } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
