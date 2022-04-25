require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require('socket.io');
const io = new Server(server);

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

let sortedData;

const randomSortedMovieData = async () => {
    // fetching data from api
    const movieData = await getData();

    // randomize order in movieData array
    const sortedMovies = movieData.results.sort(() => .5 - Math.random());
    sortedData = sortedMovies;
    return sortedData;
}

app.get('/', (req, res) => {
    res.render('username');
});

app.get('/chat', (req, res) => {
    const nickname = req.query.nickname
    // console.log(nickname)
    res.render('chat', {
        nickname
    });
});

io.on('connection', (socket) => {
    // console.log(socket.nickname, 'lol')
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