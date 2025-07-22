import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SearchResult } from './entities/search-result.entity';
import { ItunesItem } from './entities/itunes-item.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'itunes-project',
  synchronize: false, // Disabled for migrations
  logging: true,
  entities: [SearchResult, ItunesItem],
  migrations: ['../database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
