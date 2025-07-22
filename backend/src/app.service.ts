/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchResult } from './entities/search-result.entity';
import { ItunesItem } from './entities/itunes-item.entity';
import {  ItunesApiResponse} from './interfaces/itunes-response.interface';
@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(SearchResult)
    private readonly searchRepo: Repository<SearchResult>,
    @InjectRepository(ItunesItem)
    private readonly itemRepo: Repository<ItunesItem>,
  ) {}

  async searchItunes(term: string): Promise<ItunesItem[]> {
    // 1. Check cache first
    const existing = await this.searchRepo.findOne({
      where: { searchTerm: term },
      relations: ['items'],
    });

    if (existing) {
      return existing.items;
    }

    // 2. Fetch from iTunes API
    const response = await this.httpService
      .get<ItunesApiResponse>(
        `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music`,
      )
      .toPromise();

    if (!response?.data?.results) {
      throw new Error('Invalid iTunes API response');
    }

    // 3. Create new search result
    const searchResult = await this.searchRepo.save(
      this.searchRepo.create({ searchTerm: term }),
    );

    // 4. Map and save items
    const items = response.data.results.map((result) => {
      const item = new ItunesItem();
      item.itunesId = result.trackId;
      item.artistName = result.artistName;
      item.trackName = result.trackName;
      item.collectionName = result.collectionName;
      item.previewUrl = result.previewUrl;
      item.artworkUrl = result.artworkUrl100;
      item.releaseDate = new Date(result.releaseDate);
      item.primaryGenreName = result.primaryGenreName;
      item.country = result.country;
      item.currency = result.currency;
      item.price = result.trackPrice;
      item.search = searchResult; // Assign the created searchResult instance
      return item;
    });

    // 5. Save all items and return
    return this.itemRepo.save(items);
  }
}
