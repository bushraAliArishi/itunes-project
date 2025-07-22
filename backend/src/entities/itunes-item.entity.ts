import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SearchResult } from './search-result.entity';

@Entity()
export class ItunesItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => SearchResult, (search) => search.items)
  search!: SearchResult;

  @Column()
  itunesId!: number;

  @Column()
  artistName!: string;

  @Column()
  trackName!: string;

  @Column({ nullable: true })
  collectionName?: string;

  @Column({ nullable: true })
  previewUrl?: string;

  @Column({ nullable: true })
  artworkUrl?: string;

  @Column({ type: 'date', nullable: true })
  releaseDate?: Date;

  @Column({ nullable: true })
  primaryGenreName?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true, length: 3 })
  currency?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price?: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
