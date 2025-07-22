export interface ItunesApiResponse {
    resultCount: number;
    results: ItunesTrack[];
}
export interface ItunesTrack {
    trackId: number;
    artistName: string;
    trackName: string;
    collectionName?: string;
    previewUrl?: string;
    artworkUrl100?: string;
    releaseDate: string;
    primaryGenreName?: string;
    country: string;
    currency: string;
    trackPrice?: number;
}
