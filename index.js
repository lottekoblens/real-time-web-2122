require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require('socket.io');
const io = new Server(server);
const fetch = require('node-fetch');


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('username');
});

app.get('/game', async (req, res) => {
    // API parameters
    const endpoint = 'https://api.themoviedb.org/3/movie/top_rated?',
        key = process.env.KEY,
        language = 'en-US',
        pageOne = '1',
        pageTwo = '2',
        region = 'GB';
    const urlOne = `${endpoint}api_key=${key}&language=${language}&page=${pageOne}&region=${region}`;
    const urlTwo = `${endpoint}api_key=${key}&language=${language}&page=${pageTwo}&region=${region}`;

    let data = [];

    // fetch
    await fetch(urlOne)
        .then((res) => res.json())
        .then((dataPage) => {
            dataOne = dataPage.results
            data.push(dataOne)
            console.log(dataOne)
        })
        .catch(err => {
            console.log(err)
        })
    await fetch(urlTwo)
        .then((res) => res.json())
        .then((dataPage) => {
            dataTwo = dataPage.results
            data.push(dataTwo)
            console.log(dataTwo)
        })
        .catch(err => {
            console.log(err)
        })

    console.log(data)

    // get nickname of user
    const nickname = req.query.nickname
    res.render('game', {
        nickname
    });
});

io.on('connection', (socket) => {
    io.emit('connected', 'a user has connected');

    socket.on('disconnect', () => {
        io.emit('disconnected', 'a user has disconnected');
    });

    socket.on('send-nickname', (nickname) => {
        socket.nickname = nickname;
        io.emit('send-nickname', {
            nickname: socket.nickname
        });
    });

    socket.on('chat-message', (msg) => {
        io.emit('chat-message', msg);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
});