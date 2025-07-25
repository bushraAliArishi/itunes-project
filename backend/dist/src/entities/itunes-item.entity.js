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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItunesItem = void 0;
const typeorm_1 = require("typeorm");
const search_result_entity_1 = require("./search-result.entity");
let ItunesItem = class ItunesItem {
    id;
    search;
    itunesId;
    artistName;
    trackName;
    collectionName;
    previewUrl;
    artworkUrl;
    releaseDate;
    primaryGenreName;
    country;
    currency;
    price;
    createdAt;
};
exports.ItunesItem = ItunesItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ItunesItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => search_result_entity_1.SearchResult, (search) => search.items),
    __metadata("design:type", search_result_entity_1.SearchResult)
], ItunesItem.prototype, "search", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ItunesItem.prototype, "itunesId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItunesItem.prototype, "artistName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ItunesItem.prototype, "trackName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItunesItem.prototype, "collectionName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItunesItem.prototype, "previewUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItunesItem.prototype, "artworkUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ItunesItem.prototype, "releaseDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItunesItem.prototype, "primaryGenreName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ItunesItem.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 3 }),
    __metadata("design:type", String)
], ItunesItem.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], ItunesItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ItunesItem.prototype, "createdAt", void 0);
exports.ItunesItem = ItunesItem = __decorate([
    (0, typeorm_1.Entity)()
], ItunesItem);
//# sourceMappingURL=itunes-item.entity.js.map