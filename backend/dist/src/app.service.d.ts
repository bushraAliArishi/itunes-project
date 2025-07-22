import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { SearchResult } from './entities/search-result.entity';
import { ItunesItem } from './entities/itunes-item.entity';
export declare class AppService {
    private readonly httpService;
    private readonly searchRepo;
    private readonly itemRepo;
    constructor(httpService: HttpService, searchRepo: Repository<SearchResult>, itemRepo: Repository<ItunesItem>);
    searchItunes(term: string): Promise<ItunesItem[]>;
}
