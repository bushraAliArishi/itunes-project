"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const search_result_entity_1 = require("./entities/search-result.entity");
const itunes_item_entity_1 = require("./entities/itunes-item.entity");
let AppService = class AppService {
    httpService;
    searchRepo;
    itemRepo;
    constructor(httpService, searchRepo, itemRepo) {
        this.httpService = httpService;
        this.searchRepo = searchRepo;
        this.itemRepo = itemRepo;
    }
    async searchItunes(term) {
        const existing = await this.searchRepo.findOne({
            where: { searchTerm: term },
            relations: ['items'],
        });
        if (existing) {
            return existing.items;
        }
        const response = await this.httpService
            .get(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music`)
            .toPromise();
        if (!response?.data?.results) {
            throw new Error('Invalid iTunes API response');
        }
        const searchResult = await this.searchRepo.save(this.searchRepo.create({ searchTerm: term }));
        const items = response.data.results.map((result) => {
            const item = new itunes_item_entity_1.ItunesItem();
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
            item.search = searchResult;
            return item;
        });
        return this.itemRepo.save(items);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(search_result_entity_1.SearchResult)),
    __param(2, (0, typeorm_1.InjectRepository)(itunes_item_entity_1.ItunesItem)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppService);
//# sourceMappingURL=app.service.js.map