import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  fileName: string;

  @Column({ nullable: false })
  contentLength: number;

  @Column({ nullable: false })
  contentType: string;

  @Column({ nullable: false })
  url: string;
}
