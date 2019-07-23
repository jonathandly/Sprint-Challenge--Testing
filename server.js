const express = require('express');
const Games = require('./data/gamesModel');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ games: 'working' });
});

server.get('/games', (req, res) => {
    Games.findAll()
        .then(game => {
            res.status(200).json(game);
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
});

server.post('/games', async (req, res) => {
    const { title, genre, releaseYear } = req.body;

    try {
        if(title, genre, releaseYear) {
            Games.insert(req.body);
            res.status(201).json(req.body);
        } else {
            res.status(422).json({ message: 'Required fields missing' });
        }
    } catch(err) {
        res.status(500).json({ message: err });
    }
});

module.exports = server;
