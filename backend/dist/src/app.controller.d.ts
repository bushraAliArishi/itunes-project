import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    search(term: string): Promise<{
        success: boolean;
        count: number;
        data: import("./entities/itunes-item.entity").ItunesItem[];
    }>;
    private validateSearchTerm;
    private handleSearchError;
}
