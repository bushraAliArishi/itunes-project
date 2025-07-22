"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const search_result_entity_1 = require("./entities/search-result.entity");
const itunes_item_entity_1 = require("./entities/itunes-item.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'itunes-project',
    synchronize: false,
    logging: true,
    entities: [search_result_entity_1.SearchResult, itunes_item_entity_1.ItunesItem],
    migrations: ['../database/migrations/*.ts'],
    migrationsTableName: 'migrations',
});
//# sourceMappingURL=data-source.js.map