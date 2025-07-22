import { SearchResult } from './search-result.entity';
export declare class ItunesItem {
    id: number;
    search: SearchResult;
    itunesId: number;
    artistName: string;
    trackName: string;
    collectionName: string;
    previewUrl: string;
    artworkUrl: string;
    releaseDate: Date;
    primaryGenreName: string;
    country: string;
    currency: string;
    price: number;
    createdAt: Date;
}
