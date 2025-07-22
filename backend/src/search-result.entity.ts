import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SearchResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  term: string;

  @Column('jsonb')
  data: any;
}
