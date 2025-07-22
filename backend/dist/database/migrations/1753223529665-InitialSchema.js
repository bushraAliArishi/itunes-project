"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSchema1753223529665 = void 0;
class InitialSchema1753223529665 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE search_results (
                id SERIAL PRIMARY KEY,
                search_term VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE itunes_items (
                id SERIAL PRIMARY KEY,
                search_id INTEGER NOT NULL REFERENCES search_results(id) ON DELETE CASCADE,
                itunes_id INTEGER NOT NULL,
                artist_name VARCHAR(255) NOT NULL,
                track_name VARCHAR(255) NOT NULL,
                collection_name VARCHAR(255),
                preview_url VARCHAR(512),
                artwork_url VARCHAR(512),
                release_date DATE,
                primary_genre_name VARCHAR(100),
                country VARCHAR(100),
                currency VARCHAR(3),
                price DECIMAL(10,2),
                created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE INDEX idx_search_term ON search_results (search_term);
            CREATE INDEX idx_itunes_search ON itunes_items (search_id);
            CREATE INDEX idx_artist_track ON itunes_items (artist_name, track_name);
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP INDEX IF EXISTS idx_artist_track;
            DROP INDEX IF EXISTS idx_itunes_search;
            DROP INDEX IF EXISTS idx_search_term;
            DROP TABLE IF EXISTS itunes_items;
            DROP TABLE IF EXISTS search_results;
        `);
    }
}
exports.InitialSchema1753223529665 = InitialSchema1753223529665;
//# sourceMappingURL=1753223529665-InitialSchema.js.map