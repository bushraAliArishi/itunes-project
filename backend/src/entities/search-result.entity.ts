import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItunesItem } from './itunes-item.entity';

@Entity()
export class SearchResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  searchTerm: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => ItunesItem, (item) => item.search)
  items: ItunesItem[];
}
