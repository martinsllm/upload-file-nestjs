import { DataSourceOptions } from 'typeorm';
import { Upload } from './upload/entities/upload.entity';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/sql',
  synchronize: true,
  entities: [Upload],
};
