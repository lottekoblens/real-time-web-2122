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

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('username');
});

let users = [];
let game = 0;


const getData = async () => {
    const endpoint = 'https://api.themoviedb.org/3/movie/top_rated?',
        key = process.env.API_KEY,
        language = 'en-US',
        pageOne = '1',
        pageTwo = '2',
        pageThree = '3',
        pageFour = '4',
        region = 'NL';
    const urlOne = `${endpoint}api_key=${key}&language=${language}&page=${pageOne}&region=${region}`;
    const urlTwo = `${endpoint}api_key=${key}&language=${language}&page=${pageTwo}&region=${region}`;
    const urlThree = `${endpoint}api_key=${key}&language=${language}&page=${pageThree}&region=${region}`;
    const urlFour = `${endpoint}api_key=${key}&language=${language}&page=${pageFour}&region=${region}`;
    // need to use more urls to get more data, every url gets the data of a different page

    let data = [];

    // fetch
    await fetch(urlOne)
        .then((res) => res.json())
        // .then((data) => filterData(data))
        .then((dataPage) => {
            dataOne = dataPage.results
            const filteredDataOne = dataOne.filter(movie => movie.original_language === 'en')
            const newDataOne = filteredDataOne.map(movie => {
                return {
                    title: movie.original_title,
                    backdrop_path: movie.backdrop_path,
                    overview: movie.overview,
                }
            })
            data.push(newDataOne)
        })
        .catch(err => {
            console.log(err)
        })
    await fetch(urlTwo)
        .then((res) => res.json())
        .then((dataPage) => {
            dataTwo = dataPage.results
            const filteredDataTwo = dataTwo.filter(movie => movie.original_language === 'en')
            const newDataTwo = filteredDataTwo.map(movie => {
                return {
                    title: movie.original_title,
                    backdrop_path: movie.backdrop_path,
                    overview: movie.overview,
                }
            })
            data.push(newDataTwo)
        })
        .catch(err => {
            console.log(err)
        })
    await fetch(urlThree)
        .then((res) => res.json())
        .then((dataPage) => {
            dataThree = dataPage.results
            const filteredDataThree = dataThree.filter(movie => movie.original_language === 'en')
            const newDataThree = filteredDataThree.map(movie => {
                return {
                    title: movie.original_title,
                    backdrop_path: movie.backdrop_path,
                    overview: movie.overview,
                }
            })
            data.push(newDataThree)
        })
        .catch(err => {
            console.log(err)
        })
    await fetch(urlFour)
        .then((res) => res.json())
        .then((dataPage) => {
            dataFour = dataPage.results
            const filteredDataFour = dataFour.filter(movie => movie.original_language === 'en')
            const newDataFour = filteredDataFour.map(movie => {
                return {
                    title: movie.original_title,
                    backdrop_path: movie.backdrop_path,
                    overview: movie.overview,
                }
            })
            data.push(newDataFour)
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
}
getData()

app.get('/game', async (req, res) => {
    // get nickname of user
    const nickname = req.query.nickname
    res.render('game', {
        nickname,
        data: randomizedData
    });
});

io.on('connection', (socket) => {

    socket.on('userconnect', (nickname) => {
        io.emit('userconnect', {
            nickname
        });

        users.push({
            nickname: nickname,
            score: 0,
            id: socket.id
        }); // add user to users array
        io.emit('scoreboard', (users)); // emit scoreboard when new user is connected
    })

    // if (!randomizedData[game]) {
    //     let movie = {
    //         img: '/public/images/theend.png',
    //         description: 'This is the end of the game!'
    //     }
    //     io.emit('movie', movie);
    // } else {
    //     let movie = {
    //         img: randomizedData[game].backdrop_path,
    //         description: randomizedData[game].overview
    //     }
    //     io.emit('movie', movie);
    // }

    if (!randomizedData[game]) { // when there is no data, there are no more movies, so that is the end of the game
        movie = {
            img: '/images/theend.png',
            description: 'This is the end of the game!'
        }
        game = 0
        io.emit('movie', movie);
    } else {
        imgSrc = randomizedData[game].backdrop_path; // when there is no image src, there should be an image which says no image available
        if (!imgSrc) {
            movie = {
                img: `/images/no-image.png`,
                description: randomizedData[game].overview
            }
            io.emit('movie', movie);
        } else {
            movie = {
                img: `https://image.tmdb.org/t/p/w500/${imgSrc}`,
                description: randomizedData[game].overview
            }
            io.emit('movie', movie);
        }

    }

    socket.on('disconnect', (nickname) => {

        socket.nickname = nickname
        delete users[socket.id];
        users.forEach(user => {
            if (user.id == socket.id) {
                nickname = user.nickname;
                users = users.filter(user => user.id != socket.id);
            }
        });
        io.emit('disconnected', {
            nickname
        })
        io.emit('scoreboard', (users));
    });

    socket.on('skip-movie', (msg) => {
        game = game + 1; // add one to game to go to next movie
        if (!randomizedData[game]) { // when there is no data, there are no more movies, so that is the end of the game
            movie = {
                img: '/images/theend.png',
                description: 'This is the end of the game!'
            }
            game = 0
        } else {
            imgSrc = randomizedData[game].backdrop_path; // when there is no image src, there should be an image which says no image available
            if (imgSrc == 'not found') {
                movie = {
                    img: `/images/no-image.png`,
                    description: randomizedData[game].overview
                }
            } else {
                movie = {
                    img: `https://image.tmdb.org/t/p/w500/${imgSrc}`,
                    description: randomizedData[game].overview
                }
            }
        }
        io.emit('skip-movie', msg)
        io.emit('movie', movie);
    })

    socket.on('chat-message', (msg) => {
        io.emit('chat-message', msg);
        if (msg.msg.toLowerCase().includes(randomizedData[game].title.toLowerCase())) {
            const rightUser = msg.nickname;
            msg.nickname = ""
            msg.msg = `Yeahhhhh ${rightUser} guessed it right!`;
            io.emit('chat-message', msg);
            game = game + 1
            if (!randomizedData[game]) { // when there is no data, there are no more movies, so that is the end of the game
                movie = {
                    img: '/images/theend.png',
                    description: 'This is the end of the game!'
                }
                game = 0
            } else {
                imgSrc = randomizedData[game].backdrop_path; // when there is no image src, there should be an image which says no image available
                if (imgSrc == 'not found') {
                    movie = {
                        img: `/images/no-image.png`,
                        description: randomizedData[game].overview
                    }
                } else {
                    movie = {
                        img: `https://image.tmdb.org/t/p/w500/${imgSrc}`,
                        description: randomizedData[game].overview
                    }
                }
            }
            users.forEach(user => {
                if (user.id == socket.id) {
                    user.score = user.score + 5;
                }
            });

            io.emit('scoreboard', (users));
            io.emit('movie', movie)
        }
    });
});


server.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
});