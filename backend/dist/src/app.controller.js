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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    async search(term) {
        this.validateSearchTerm(term);
        const sanitizedTerm = term.trim();
        try {
            const results = await this.appService.searchItunes(sanitizedTerm);
            return {
                success: true,
                count: results.length,
                data: results,
            };
        }
        catch (error) {
            this.handleSearchError(error);
        }
    }
    validateSearchTerm(term) {
        if (!term || term.trim().length === 0) {
            throw new common_1.BadRequestException('Search term is required');
        }
        if (term.length < 2) {
            throw new common_1.BadRequestException('Search term must be at least 2 characters');
        }
    }
    handleSearchError(error) {
        let errorMessage = 'Failed to process your search';
        if (error instanceof Error) {
            errorMessage += `: ${error.message}`;
        }
        throw new common_1.BadRequestException(errorMessage);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "search", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('search'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map