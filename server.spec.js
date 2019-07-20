const request = require('supertest');

const server = require('./server');
const db = require('./data/dbConfig');

describe('server.js', () => {
    it('should set the test environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        it('should return 200', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                });
        });

        it('should return 200 using async/await', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });

        it('should return JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });
    });

    describe('GET /games', () => {
        afterEach(async () => {
            await db('games').truncate();
        });

        it('should hit endpoint', async () => {
            const res = await request(server).get('/games');
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        });

        it('should return all games in db', async () => {
            const games = [
                { id: 1, title: 'Pacman', genre: 'Arcade', releaseYear: 1980 },
                { id: 2, title: 'Halo', genre: 'FPS', releaseYear: 2001 },
                { id: 3, title: 'Final Fantasy VII', genre: 'RPG', releaseYear: 1998 },
            ];

            await db('games').insert(games);

            const res = await request(server).get('/games');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(games);
        });
    });

    describe('POST /games', () => {

    });
});
