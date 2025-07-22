
CREATE TABLE IF NOT EXISTS search_results (
    id SERIAL PRIMARY KEY,
    search_term VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS itunes_items (
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

CREATE INDEX IF NOT EXISTS idx_search_term ON search_results (search_term);
CREATE INDEX IF NOT EXISTS idx_itunes_search ON itunes_items (search_id);
CREATE INDEX IF NOT EXISTS idx_artist_track ON itunes_items (artist_name, track_name);