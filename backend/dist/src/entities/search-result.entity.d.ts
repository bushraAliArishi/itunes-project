import { ItunesItem } from './itunes-item.entity';
export declare class SearchResult {
    id: number;
    searchTerm: string;
    createdAt: Date;
    updatedAt: Date;
    items: ItunesItem[];
}
