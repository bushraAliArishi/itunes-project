import * as pg from 'pg';
import fastify from 'fastify';
import axios from 'axios';

const app = fastify({ logger: true });
const pool = new pg.Pool({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'itunes_search'
});

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS search_results (
        id SERIAL PRIMARY KEY,
        track_id INT UNIQUE NOT NULL,
        track_name VARCHAR(255) NOT NULL,
        artist_name VARCHAR(255) NOT NULL,
        artwork_url VARCHAR(255),
        genres VARCHAR(255)[],
        average_user_rating FLOAT,
        user_rating_count INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    const testRes = await pool.query('SELECT NOW()');
    console.log('Database connection verified at:', testRes.rows[0].now);
  } catch (err) {
    console.error('Database initialization error:', err);
    process.exit(1);
  }
}

app.get('/api/search', async (request, reply) => {
  const { term } = request.query as { term: string };
  
  try {
    const itunesResponse = await axios.get(
      `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=software`
    );
    
    const results = itunesResponse.data.results.map((result: any) => ({
      track_id: result.trackId,
      track_name: result.trackName,
      artist_name: result.artistName,
      artwork_url: result.artworkUrl100,
      genres: result.genres,
      average_user_rating: result.averageUserRating,
      user_rating_count: result.userRatingCount
    }));
    
    for (const result of results) {
      await pool.query(`
        INSERT INTO search_results (track_id, track_name, artist_name, artwork_url, genres, average_user_rating, user_rating_count)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (track_id) DO NOTHING
      `, Object.values(result));
    }
    
    const dbResults = await pool.query('SELECT * FROM search_results');
    return dbResults.rows;
  } catch (error) {
    console.error('Search error:', error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
});

const start = async () => {
  try {
    await initializeDatabase();
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log('API server running on http://localhost:3001');
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
};

start();