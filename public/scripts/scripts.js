const socket = io();
const chatForm = document.getElementById('chat');
const nicknameForm = document.getElementById('nickname');
const input = document.getElementById('input');
const nicknameInput = document.getElementById('nickname-input');

if (window.location.pathname === '/chat') {

    const username = new URLSearchParams(window.location.search).get('nickname')

    chatForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (input.value) {
            socket.emit('chat-message', {
                msg: input.value,
                nickname: username
            });
            input.value = '';
        }
    });

    console.log(username);


    socket.on('chat-message', (msg) => {
        const item = document.createElement('li');
        console.log(msg);
        item.textContent = `${msg.nickname}: ${msg.msg}`;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('connected', (msg) => {
        const item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

    socket.on('disconnected', (msg) => {
        const item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });

}

const getData = () => {
    // API parameters to send with fetch
    const endpoint = 'https://api.themoviedb.org/3/movie/top_rated?',
        key = process.env.KEY,
        language = 'en-US',
        page = '1',
        region = 'GB';
    const url = `${endpoint}api_key=${key}&language=${language}&page=${page}&region=${region}`;
}

// https://api.themoviedb.org/3/movie/top_rated?api_key=14b27019244559940e47860f2ebee592&language=en-US&page=1&region=GB