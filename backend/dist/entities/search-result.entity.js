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
exports.SearchResult = void 0;
const typeorm_1 = require("typeorm");
const itunes_item_entity_1 = require("./itunes-item.entity");
let SearchResult = class SearchResult {
    id;
    searchTerm;
    createdAt;
    updatedAt;
    items;
};
exports.SearchResult = SearchResult;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SearchResult.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], SearchResult.prototype, "searchTerm", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SearchResult.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], SearchResult.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => itunes_item_entity_1.ItunesItem, (item) => item.search),
    __metadata("design:type", Array)
], SearchResult.prototype, "items", void 0);
exports.SearchResult = SearchResult = __decorate([
    (0, typeorm_1.Entity)()
], SearchResult);
//# sourceMappingURL=search-result.entity.js.map