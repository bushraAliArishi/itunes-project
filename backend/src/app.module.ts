import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchResult } from './search-result.entity';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'itunes-project',
      entities: [SearchResult],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([SearchResult]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
