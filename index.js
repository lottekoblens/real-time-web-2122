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


let randomizedData;
let filteredData;

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
        pageThree = '3',
        region = 'NL';
    const urlOne = `${endpoint}api_key=${key}&language=${language}&page=${pageOne}&region=${region}`;
    const urlTwo = `${endpoint}api_key=${key}&language=${language}&page=${pageTwo}&region=${region}`;
    const urlThree = `${endpoint}api_key=${key}&language=${language}&page=${pageThree}&region=${region}`;

    let data = [];
    let user = [];
    let game = 0;

    // fetch
    await fetch(urlOne)
        .then((res) => res.json())
        .then((dataPage) => {
            dataOne = dataPage.results
            const filteredDataOne = dataOne.filter(movie => movie.original_language === 'en')
            data.push(filteredDataOne)
        })
        .catch(err => {
            console.log(err)
        })
    await fetch(urlTwo)
        .then((res) => res.json())
        .then((dataPage) => {
            dataTwo = dataPage.results
            const filteredDataTwo = dataTwo.filter(movie => movie.original_language === 'en')
            data.push(filteredDataTwo)
        })
        .catch(err => {
            console.log(err)
        })
    await fetch(urlThree)
        .then((res) => res.json())
        .then((dataPage) => {
            dataThree = dataPage.results
            const filteredDataThree = dataThree.filter(movie => movie.original_language === 'en')
            data.push(filteredDataThree)
        })
        .catch(err => {
            console.log(err)
        })

    const randomizeData = () => {
        let randomizedMovies = data[Math.floor(Math.random() * data.length)]; // source https://stackoverflow.com/questions/37167264/javascript-output-random-object-from-array-of-objects
        randomizedData = randomizedMovies
        return randomizedData
    }
    randomizedData = randomizeData()
    console.log(randomizedData)

    io.on('connection', (socket) => {

        socket.on('connected', () => {
            io.emit('connected', nickname);

            user.push({
                nickname: nickname,
                id: socket.id,
                score: 0
            })
            console.log(user)
        })

        let movie = {
            img: randomizedData[game].backdrop_path,
            description: randomizedData[game].overview
        }

        io.emit('movie', movie);

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
            if (msg.msg.toLowerCase().includes(randomizedData[game].original_title.toLowerCase())) {
                const rightUser = msg.nickname;
                msg.nickname = "Computer"
                msg.msg = `Yeahhhhh ${rightUser} guessed it right!`;
                io.emit('chat-message', msg);
                game = game + 1
                console.log(game)
                movie = {
                    img: randomizedData[game].backdrop_path,
                    description: randomizedData[game].overview
                }
                io.emit('movie', movie)
            }
        });
    });


    // get nickname of user
    const nickname = req.query.nickname
    res.render('game', {
        nickname
    });
});


server.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
});